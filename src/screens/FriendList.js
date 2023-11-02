import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFriendList } from '../api/storage';
import SingleProfileSearch from '../components/SingleProfileSearch';
import api from '../api/api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getLocale from '../constants/localization';
import Colors from '../styles.js/Colors';

const FriendList = ({ navigation, route }) => {
  const [friends, setFriends] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const { language, darkMode } = route.params;
  const currentStyle = darkMode ? darkModeStyles : styles;

  useEffect(() => {
    getFriendListFromStorage();
    navigation.setOptions({
      headerTitle: getLocale(language, 'friendList'),
    });
  }, []);

  const getFriendListFromStorage = async () => {
    const uids = await getFriendList();
    const result = await api.fetch('users', uids);
    setFriends(result);
  };

  const displayFriends = () => {
    if (friends) {
      if (friends.length > 0) {
        return (
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={async () => {
                  setRefreshing(true);
                  await getFriendListFromStorage();
                  setRefreshing(false);
                }}
                refreshing={refreshing}
              />
            }
            data={friends}
            renderItem={({ item }) => <SingleProfileSearch user={item} language={language} darkMode={darkMode} />}
            keyExtractor={(item) => item.id}
          />
        );
      } else {
        return <Text>{getLocale(language, 'noFriend')}</Text>;
      }
    } else {
      return <Loading />;
    }
  };
  return (
    <Header>
      <View style={currentStyle.container}>{displayFriends()}</View>
    </Header>
  );
};

export default FriendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
});
