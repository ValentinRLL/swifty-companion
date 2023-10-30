import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../styles.js/AppStyles';
import CustomTextInput from '../components/CustomTextInput';
import Colors from '../styles.js/Colors';
import CustomButton from '../components/CustomButton';
import api from '../api/api';

const Search = ({ navigation }) => {
  const [login, setLogin] = useState('valecart');

  const handleSearch = async () => {
    if (login.length >= 3) {
      console.log('fetching user', login, '...');
      const result = await api.fetch('users', login.toLowerCase());
      // console.log('result', result);
      navigation.navigate('ProfileList', { users: result, login });
    } else {
      Alert.alert('Erreur', 'Login doit contenir au moins 3 caractères', [{ text: 'OK' }]);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollView} keyboardDismissMode='on-drag'>
      <View style={{ ...globalStyles.container, ...styles.searchContainer }}>
        <View>
          <Image style={styles.logo} source={require('../../assets/42logo.png')} />
        </View>

        <CustomTextInput style={{ ...globalStyles.textInput, ...globalStyles.mv10 }} placeholder='Rechercher un login' value={login} onChangeText={(text) => setLogin(text)} />

        {/* <Button title='Search' onPress={handleSearch} /> */}
        <CustomButton title='Search' onPress={handleSearch} plainColor={true} block={true} />
        <CustomButton title='Friends' onPress={() => navigation.navigate('FriendList')} plainColor={true} block={true} color={Colors.success} />
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.bgBlue,
  },
  searchContainer: {
    marginTop: 100,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
