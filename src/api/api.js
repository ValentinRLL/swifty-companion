import { UID, SECRET } from '@env';
import { deleteAccessToken, getAccessToken, setAccessToken } from './storage';
// import { getAccessToken, setAccessToken } from './storage';

const API = 'https://api.intra.42.fr/v2';

const credentials = {
  client_id: UID,
  client_secret: SECRET,
};

class Api {
  async getAccessToken() {
    try {
      let currentAccessToken = await getAccessToken();

      const now = new Date().getTime() / 1000;
      const tokenExpiration = currentAccessToken?.created_at + currentAccessToken?.expires_in;

      if (
        currentAccessToken === undefined ||
        currentAccessToken === null ||
        currentAccessToken?.created_at === undefined ||
        currentAccessToken?.created_at === null ||
        currentAccessToken?.expires_in === undefined ||
        currentAccessToken?.expires_in === null ||
        tokenExpiration - now < 0
      ) {
        const newAccessToken = await this.generateAccessToken();
        await setAccessToken(newAccessToken);
        currentAccessToken = newAccessToken;
      }

      return currentAccessToken?.access_token;
    } catch (error) {
      console.error('error fetching access token: ', error);
      throw error;
    }
  }

  async generateAccessToken() {
    const params = {
      grant_type: 'client_credentials',
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`${API}/oauth/token/?` + new URLSearchParams(params), options);
      if (!response.ok) {
        throw new Error(`Network response error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating access token:', error);
    }
  }

  async fetch(type, user) {
    try {
      // await deleteAccessToken();
      const accessToken = await this.getAccessToken();

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      };

      const params = {
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
      };

      let allResults = [];
      let lastResult = [];
      let page = 1;
      let timeSpend = [0, 0];
      const types = ['projects_users', 'cursus_users', 'users'];
      const perPage = 100;
      if (!types.includes(type)) {
        throw new Error('Wrong type');
      }
      do {
        const dateBefore = new Date();
        let timeSpendIndex = 0;

        lastResult = await (async () => {
          console.log('1');
          let response = null;
          if (type === 'users') {
            if (Array.isArray(user)) {
              response = await fetch(`${API}/${type}?` + new URLSearchParams(params) + `&filter[id]=${user.join(',')}&page=${page}&per_page=${perPage}`, options);
            } else {
              response = await fetch(`${API}/${type}?` + new URLSearchParams(params) + `&filter[login]=${user}&page=${page}&per_page=${perPage}`, options);
            }
          } else {
            response = await fetch(`${API}/${type}?` + new URLSearchParams(params) + `&filter[user_id]=${user}&page=${page}&per_page=${perPage}`, options);
          }
          console.log('2');
          if (!response.ok) throw new Error(`Network response error ${response.status}: ${response.statusText}`);
          console.log('3');

          timeSpendIndex = response.headers.get('x-secondly-ratelimit-remaining') % 2;
          console.log('4');

          const data = await response.json();
          console.log('5');
          return data;
        })();
        page++;
        allResults = [...allResults, ...lastResult];

        const dateAfter = new Date();

        timeSpend[timeSpendIndex] = dateAfter - dateBefore;

        const timeLeft = 1500 - (timeSpend[0] + timeSpend[1]);
        if (timeSpend[0] !== 0 && timeSpend[1] !== 0 && timeLeft > 0) {
          timeSpend[0] = 0;
          timeSpend[1] = 0;
          await new Promise((resolve) => setTimeout(resolve, timeLeft));
        }
      } while (lastResult?.length === perPage);

      return allResults;
    } catch (error) {
      console.error('There was a problem with the projects fetch operation:', error);
      throw error;
    }
  }
}

export default new Api();
