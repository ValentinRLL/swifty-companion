import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles/Colors';
import Avatar from './Avatar';
import { capitalize, getRole } from '../helpers/functions';
import { useNavigation } from '@react-navigation/native';

const SingleProfileSearch = ({ user, language, darkMode }) => {
  const navigation = useNavigation();
  const currentStyle = darkMode ? darkModeStyles : styles;
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.clicked : Colors.transparent,
        },
        currentStyle.profileContainer,
      ]}
      onPress={() => navigation.navigate('Profile', { user, language, darkMode })}
    >
      <View>
        <Avatar image={user.image.versions.small} size={125} online={user.location} />
      </View>
      <View style={currentStyle.loginContainer}>
        <Text style={currentStyle.login}>{capitalize(user.login)}</Text>
        <Text style={currentStyle.displayname}>
          {getRole(user, language)[0]} {user.displayname}
        </Text>
        {user.location && <Text style={currentStyle.location}>📍 {user.location}</Text>}
      </View>
      <View style={currentStyle.arrowForward}>
        <MaterialIcons name='arrow-forward-ios' size={24} color={darkMode ? Colors.white : Colors.black} />
      </View>
    </Pressable>
  );
};

export default SingleProfileSearch;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginContainer: {
    marginLeft: 20,
  },
  arrowForward: {
    marginLeft: 'auto',
  },
  login: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  displayname: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  location: {
    fontSize: 16,
  },
});

const darkModeStyles = StyleSheet.create({
  profileContainer: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginContainer: {
    marginLeft: 20,
  },
  arrowForward: {
    marginLeft: 'auto',
  },
  login: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
  },
  displayname: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.white,
  },
  location: {
    fontSize: 16,
    color: Colors.white,
  },
});
