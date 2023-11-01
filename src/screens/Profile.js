import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import Colors from '../styles.js/Colors';
import { capitalize, getRole } from '../helpers/functions';
import { Picker } from '@react-native-picker/picker';
import api from '../api/api';
import Loading from '../components/Loading';
import { AntDesign } from '@expo/vector-icons';
import { addFriendInList, deleteFriendFromList, userIsFriend } from '../api/storage';
import getLocale from '../constants/localization';

const Profile = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params.user);
  const [cursus, setCursus] = useState();
  const [projects, setProjects] = useState(null);
  const uid = route.params.user.id;
  const { language, darkMode } = route.params;
  const currentStyle = darkMode ? darkModeStyles : styles;
  const [selectedCursus, setSelectedCursus] = useState();
  const [isFriend, setIsFriend] = useState(false);

  const fetchProjects = async () => {
    const cursusResult = await api.fetch('cursus_users', uid);
    setCursus(cursusResult);
    setSelectedCursus(cursusResult[0]);
    const projectsResult = await api.fetch('projects_users', uid);
    setProjects(projectsResult);
  };

  const checkIfFriend = async () => {
    const result = await userIsFriend(uid);
    setIsFriend(result);
  };

  useEffect(() => {
    checkIfFriend();
    fetchProjects();
  }, []);

  const handleFriend = () => {
    if (isFriend) {
      deleteFriendFromList(uid);
      setIsFriend(false);
      Alert.alert(getLocale(language, 'friendRemovedTitle'), getLocale(language, 'friendRemoved', [user.login]), [{ text: 'OK' }]);
    } else {
      addFriendInList(uid);
      setIsFriend(true);
      Alert.alert(getLocale(language, 'friendAddedTitle'), getLocale(language, 'friendAdded', [user.login]), [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AntDesign name={isFriend ? 'deleteuser' : 'adduser'} size={24} color={isFriend ? Colors.danger : Colors.white} onPress={() => handleFriend()} />,
    });
  }, [navigation, isFriend]);

  const getProjectStatus = (project) => {
    if (project.status === 'finished') {
      if (project['validated?']) {
        return 'validated';
      } else {
        return 'notValidated';
      }
    } else {
      return 'inProgress';
    }
  };

  const HeaderContent = () => {
    return (
      <View style={currentStyle.avatarContainer}>
        <Avatar image={user.image.versions.medium} size={125} online={user.location} />
        <View>
          <View>
            <Text style={{ ...currentStyle.headerText, ...currentStyle.login }}>{capitalize(user.login)}</Text>
            <Text style={{ ...currentStyle.headerText, ...currentStyle.displayname }}>{user.displayname}</Text>
            <Text style={currentStyle.headerText}>{getRole(user, language).join(' ')}</Text>
            {user.location && <Text style={currentStyle.headerText}>📍 {user.location}</Text>}
          </View>
        </View>
      </View>
    );
  };

  return (
    <Header content={<HeaderContent />}>
      <View style={{ ...currentStyle.container, flex: 1 }}>
        <View>
          {cursus ? (
            <Fragment>
              <Text style={currentStyle.cursusChoiceText}>
                {selectedCursus?.cursus?.name} {getLocale(language, 'lvl')} {selectedCursus?.level}
              </Text>
              <Picker
                style={currentStyle.picker}
                selectedValue={selectedCursus?.cursus_id?.toString()}
                onValueChange={(itemValue, itemIndex) => setSelectedCursus(cursus[itemIndex])}
              >
                {cursus.map((c) => (
                  <Picker.Item key={c?.cursus_id?.toString()} label={c?.cursus?.name?.toString()} value={c?.cursus_id?.toString()} color={darkMode ? Colors.white : Colors.black} />
                ))}
              </Picker>
            </Fragment>
          ) : (
            <Loading />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={currentStyle.categoryTitle}>{getLocale(language, 'skills')}</Text>
          {selectedCursus ? (
            <FlatList
              contentContainerStyle={currentStyle.projects}
              data={selectedCursus.skills}
              renderItem={({ item }) => (
                <View style={currentStyle.project}>
                  <Text style={currentStyle.projectName}>{item.name}</Text>
                  <Text style={currentStyle.projectName}>{item.level.toFixed(2) || '-'}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Loading />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={currentStyle.categoryTitle}>{getLocale(language, 'projects')}</Text>
          {projects ? (
            <FlatList
              contentContainerStyle={currentStyle.projects}
              data={projects.filter((p) => p.cursus_ids.includes(selectedCursus.cursus_id))}
              renderItem={({ item }) => (
                <View style={currentStyle.project}>
                  <Text style={currentStyle.projectName}>{item.project.name}</Text>
                  <Text style={currentStyle[getProjectStatus(item)]}>{item.final_mark || '-'}</Text>
                </View>
              )}
              keyExtractor={(item) => item.project.id}
            />
          ) : (
            <Loading />
          )}
        </View>
      </View>
    </Header>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
  avatarContainer: {
    padding: 30,
    marginLeft: 10,
    marginTop: -25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
    color: Colors.white,
    fontSize: 18,
  },
  login: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  displayname: {
    fontSize: 22,
    fontStyle: 'italic',
  },
  picker: {
    marginVertical: -20,
  },
  cursusChoiceText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 9,
  },
  projects: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  project: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validated: {
    color: Colors.success,
    fontWeight: 'bold',
  },
  notValidated: {
    color: Colors.danger,
    fontWeight: 'bold',
  },
  inProgress: {
    color: Colors.warning,
    fontWeight: 'bold',
  },
  projectName: {},
});

const darkModeStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBackground,
  },
  avatarContainer: {
    padding: 30,
    marginLeft: 10,
    marginTop: -25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
    color: Colors.white,
    fontSize: 18,
  },
  login: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  displayname: {
    fontSize: 22,
    fontStyle: 'italic',
  },
  picker: {
    marginVertical: -20,
  },
  cursusChoiceText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    color: Colors.white,
  },
  categoryTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 9,
    color: Colors.white,
  },
  projects: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  project: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validated: {
    color: Colors.success,
    fontWeight: 'bold',
  },
  notValidated: {
    color: Colors.danger,
    fontWeight: 'bold',
  },
  inProgress: {
    color: Colors.warning,
    fontWeight: 'bold',
  },
  projectName: {
    color: Colors.white,
  },
});
