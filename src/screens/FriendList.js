import { FlatList, RefreshControl, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFriendList } from '../api/storage';
import SingleProfileSearch from '../components/SingleProfileSearch';
import api from '../api/api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getLocale from '../constants/localization';
import Colors from '../styles/Colors';

const FriendList = ({ navigation, route }) => {
  const [friends, setFriends] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const { language, darkMode } = route.params;
  const currentStyle = darkMode ? darkModeStyles : styles;

  useEffect(() => {
    getFriendListFromStorage();

    navigation.setOptions({
      headerTitle: getLocale(language, 'friendList'),
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'transparent' : Colors.gradientPrimary[0],
      },
    });
  }, []);

  const getFriendListFromStorage = async () => {
    const uids = await getFriendList();
    if (!uids || !uids.length) {
      setFriends([]);
      return;
    }
    const result = await api.fetch('users', uids);
    setFriends(result);
  };

  const DisplayFriends = () => {
    if (!friends) {
      return <Loading />;
    }

    if (friends.length <= 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: darkMode ? Colors.white : Colors.black }}>{getLocale(language, 'noFriend')}</Text>
        </View>
      );
    }

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
  };

  return (
    <Header>
      <View style={currentStyle.container}>
        <DisplayFriends />
      </View>
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
