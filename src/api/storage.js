import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken ? JSON.parse(accessToken) : null;
  } catch (error) {
    throw error;
  }
};

export const setAccessToken = async (token) => {
  try {
    AsyncStorage.setItem('accessToken', JSON.stringify(token));
  } catch (error) {
    throw error;
  }
};

export const getFriendList = async () => {
  try {
    const friendList = await AsyncStorage.getItem('friendList');
    return friendList ? JSON.parse(friendList) : null;
  } catch (error) {
    throw error;
  }
};

export const addFriendInList = async (newFriend) => {
  try {
    const friendList = await getFriendList();
    if (!friendList) {
      await AsyncStorage.setItem('friendList', JSON.stringify([newFriend]));
    } else {
      await AsyncStorage.setItem('friendList', JSON.stringify([...friendList, newFriend]));
    }
  } catch (error) {
    throw error;
  }
};

export const deleteFriendFromList = async (friendToDelete) => {
  try {
    const friendList = await getFriendList();
    if (friendList) {
      const newFriendList = friendList.filter((friend) => friend !== friendToDelete);
      await AsyncStorage.setItem('friendList', JSON.stringify(newFriendList));
    }
  } catch (error) {
    throw error;
  }
};

export const userIsFriend = async (friendToCheck) => {
  try {
    const friendList = await getFriendList();
    if (friendList) {
      const isFriend = friendList.includes(friendToCheck);
      return isFriend;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserDarkMode = async () => {
  try {
    const darkMode = await AsyncStorage.getItem('darkMode');
    return darkMode ? JSON.parse(darkMode) : false;
  } catch (error) {
    throw error;
  }
};

export const setUserDarkMode = async (darkMode) => {
  try {
    await AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
  } catch (error) {
    throw error;
  }
};

export const getUserLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem('language');
    return language ? JSON.parse(language) : 'fr';
  } catch (error) {
    throw error;
  }
};

export const setUserLanguage = async (language) => {
  try {
    await AsyncStorage.setItem('language', JSON.stringify(language));
  } catch (error) {
    throw error;
  }
};
