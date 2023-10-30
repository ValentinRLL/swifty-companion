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

export const deleteAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    throw error;
  }
};

export const getFriendList = async () => {
  try {
    const friendList = await AsyncStorage.getItem('friendList');
    // return array of ids or null
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
    // friendList is an array of numbers
    const friendList = await getFriendList();
    console.log('friends', friendList);
    if (friendList) {
      const newFriendList = friendList.filter((friend) => friend !== friendToDelete);
      console.log('newFriendList', newFriendList);
      await AsyncStorage.setItem('friendList', JSON.stringify(newFriendList));
    }
  } catch (error) {
    throw error;
  }
};

export const userIsFriend = async (friendToCheck) => {
  try {
    const friendList = await getFriendList();
    // friendList is an array of numbers
    if (friendList) {
      const isFriend = friendList.includes(friendToCheck);
      return isFriend;
    }
  } catch (error) {
    throw error;
  }
};
