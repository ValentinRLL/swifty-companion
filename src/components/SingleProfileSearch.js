import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles.js/Colors';
import Avatar from './Avatar';
import { capitalize, getRole } from '../helpers/functions';
import { useNavigation } from '@react-navigation/native';

const SingleProfileSearch = ({ user }) => {
  const navigation = useNavigation();
  return (
    // <View style={styles.profileContainer}>
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.clicked : Colors.transparent,
        },
        styles.profileContainer,
      ]}
      onPress={() => navigation.navigate('Profile', user)}
    >
      <View>
        <Avatar image={user.image.versions.small} size={125} online={user.location} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.login}>{capitalize(user.login)}</Text>
        <Text style={styles.displayname}>
          {getRole(user)[0]} {user.displayname}
        </Text>
      </View>
      <View style={styles.arrowForward}>
        <MaterialIcons name='arrow-forward-ios' size={24} color={Colors.black} />
      </View>
    </Pressable>
    // </View>
  );
};

export default SingleProfileSearch;

const styles = StyleSheet.create({
  profileContainer: {
    // backgroundColor: 'salmon',
    // height: 100,
    padding: 10,
    alignItems: 'center',
    // marginVertical: 10,
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
});
