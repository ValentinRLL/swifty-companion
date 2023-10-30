import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getFriendList } from '../api/storage';
import SingleProfileSearch from '../components/SingleProfileSearch';
import api from '../api/api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const FriendList = () => {
  const [friends, setFriends] = useState();
  useFocusEffect(
    useCallback(() => {
      getFriendListFromStorage();
      console.log('rerender');
    }, [])
  );
  const getFriendListFromStorage = async () => {
    const uids = await getFriendList();
    const result = await api.fetch('users', uids);
    setFriends(result);
  };
  const displayFriends = () => {
    if (friends) {
      if (friends.length > 0) {
        return <FlatList data={friends} renderItem={({ item }) => <SingleProfileSearch user={item} />} keyExtractor={(item) => item.id} />;
      } else {
        return <Text>Vous n'avez pas d'amis</Text>;
      }
    } else {
      return <Loading />;
    }
  };
  return (
    <Header>
      <View style={{ flex: 1 }}>{displayFriends()}</View>
    </Header>
  );
};

export default FriendList;

const styles = StyleSheet.create({});
