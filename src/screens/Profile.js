import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
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

const Profile = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params);
  const [cursus, setCursus] = useState();
  const [projects, setProjects] = useState(null);
  const uid = route.params.id;
  const [selectedCursus, setSelectedCursus] = useState();
  const [isFriend, setIsFriend] = useState(false);

  const fetchProjects = async () => {
    const start = new Date();
    const cursusResult = await api.fetch('cursus_users', uid);
    const end = new Date();
    setCursus(cursusResult);
    setSelectedCursus(cursusResult[0]);
    const projectsResult = await api.fetch('projects_users', uid);
    const end2 = new Date();
    setProjects(projectsResult);
    console.log('cursus_users time', end - start);
    console.log('project_users time', end2 - end);
    // console.log('result', result);
    // console.log('cursus', cursus);
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
      // deleteFriend(uid);
      deleteFriendFromList(uid);
      setIsFriend(false);
      Alert.alert('Ami supprimé', `Vous avez supprimé ${user.login} de votre liste d'amis`, [{ text: 'OK' }]);
    } else {
      // addFriend(uid);
      addFriendInList(uid);
      setIsFriend(true);
      Alert.alert('Ami ajouté', `Vous avez ajouté ${user.login} à votre liste d'amis`, [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AntDesign name={isFriend ? 'deleteuser' : 'adduser'} size={24} color={isFriend ? Colors.danger : Colors.white} onPress={() => handleFriend()} />,
    });
  }, [navigation, isFriend]);
  // console.log(user);

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
      <View style={styles.avatarContainer}>
        <Avatar image={user.image.versions.medium} size={125} online={user.location} />
        <View>
          <View>
            <Text style={{ ...styles.headerText, ...styles.login }}>{capitalize(user.login)}</Text>
            <Text style={{ ...styles.headerText, ...styles.displayname }}>{user.displayname}</Text>
            <Text style={styles.headerText}>{getRole(user).join(' ')}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Header content={<HeaderContent />}>
      <View style={{ flex: 1 }}>
        <View>
          {/* <Text style={styles.cursusChoiceText}>Choix du cursus</Text> */}
          {/* <Text style={styles.cursusChoiceText}>Niveau {15.01}</Text> */}
          {cursus ? (
            <Fragment>
              <Text style={styles.cursusChoiceText}>
                {selectedCursus?.cursus?.name} niv. {selectedCursus?.level}
              </Text>
              <Picker style={styles.picker} selectedValue={selectedCursus?.cursus_id?.toString()} onValueChange={(itemValue, itemIndex) => setSelectedCursus(cursus[itemIndex])}>
                {cursus.map((c) => (
                  <Picker.Item key={c?.cursus_id?.toString()} label={c?.cursus?.name?.toString()} value={c?.cursus_id?.toString()} />
                ))}
              </Picker>
            </Fragment>
          ) : (
            <Loading />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.categoryTitle}>Projets</Text>
          {projects ? (
            <FlatList
              contentContainerStyle={styles.projects}
              data={projects.filter((p) => p.cursus_ids.includes(selectedCursus.cursus_id))}
              renderItem={({ item }) => (
                <View style={styles.project}>
                  <Text>{item.project.name}</Text>
                  <Text style={styles[getProjectStatus(item)]}>{item.final_mark || '-'}</Text>
                </View>
              )}
              keyExtractor={(item) => item.project.id}
            />
          ) : (
            <Loading />
          )}
          {/* <Text style={styles.categoryTitle}>Projets</Text>
          <Text>xxxxxxxx</Text>
          <Text style={styles.categoryTitle}>Skills</Text>
          <Text>xxxxxxxx</Text>
          <Text style={styles.categoryTitle}>Expertises</Text>
          <Text>xxxxxxxx</Text>
          <Text style={styles.categoryTitle}>Achievements</Text>
          <Text>xxxxxxxx</Text> */}
        </View>
      </View>
    </Header>
  );
};

export default Profile;

const styles = StyleSheet.create({
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
    fontSize: 24,
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
});
