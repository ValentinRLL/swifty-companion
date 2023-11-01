import { Alert, Animated, Easing, Image, Modal, ScrollView, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../styles.js/AppStyles';
import CustomTextInput from '../components/CustomTextInput';
import Colors from '../styles.js/Colors';
import CustomButton from '../components/CustomButton';
import api from '../api/api';
import { getUserDarkMode, getUserLanguage, setUserDarkMode, setUserLanguage } from '../api/storage';
import { Picker } from '@react-native-picker/picker';
import getLocale from '../constants/localization';

const Search = ({ navigation }) => {
  const [login, setLogin] = useState('valecart');
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [count, setCount] = useState(0);
  const currentStyle = darkMode ? darkModeStyles : styles;
  const languages = [
    {
      name: 'Français',
      code: 'fr',
    },
    {
      name: 'English',
      code: 'en',
    },
  ];

  useEffect(() => {
    initialValues();
  }, []);

  const initialValues = async () => {
    const userDarkMode = await getUserDarkMode();
    const userLanguage = await getUserLanguage();
    setDarkMode(userDarkMode);
    setLanguage(userLanguage);
    console.log('userDarkMode', userDarkMode);
    console.log('userLanguage', userLanguage);
  };

  const handleLanguage = (language) => {
    setLanguage(language);
    setUserLanguage(language);
  };

  const handleDarkMode = (darkMode) => {
    setDarkMode(darkMode);
    setUserDarkMode(darkMode);
  };

  const handleSearch = async () => {
    if (login.length >= 3) {
      console.log('fetching user', login, '...');
      let result = null;
      try {
        result = await api.fetch('users', login.toLowerCase());
      } catch (err) {
        Alert.alert(getLocale(language, 'error'), getLocale(language, 'apiError'), [{ text: 'OK' }]);
      }
      navigation.navigate('ProfileList', { users: result, login, language, darkMode });
    } else {
      Alert.alert(getLocale(language, 'error'), getLocale(language, 'loginError'), [{ text: 'OK' }]);
    }
  };

  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScrollView contentContainerStyle={currentStyle.scrollView} keyboardDismissMode='on-drag'>
      <View style={{ ...globalStyles.container, ...currentStyle.searchContainer }}>
        <View>
          <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
            {count >= 5 ? (
              <Animated.Image style={{ ...currentStyle.logo, transform: [{ rotate: spin }] }} source={require('../../assets/msn-logo.png')} />
            ) : (
              <Image style={currentStyle.logo} source={darkMode ? require('../../assets/42logo-darkmode.png') : require('../../assets/42logo.png')} />
            )}
          </TouchableWithoutFeedback>
        </View>

        <CustomTextInput
          style={{ ...globalStyles.textInput, ...globalStyles.mv10 }}
          placeholder={getLocale(language, 'searchLogin')}
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <CustomButton title={getLocale(language, 'search')} onPress={handleSearch} plainColor={true} block={true} />
        <CustomButton
          title={getLocale(language, 'friends')}
          onPress={() => navigation.navigate('FriendList', { language, darkMode })}
          plainColor={true}
          block={true}
          color={Colors.success}
        />
        <CustomButton title={getLocale(language, 'settings')} onPress={() => setSettingsModalVisible(true)} plainColor={true} block={true} color={Colors.warning} />
        <Modal animationType='slide' visible={settingsModalVisible} presentationStyle='pageSheet'>
          <View style={currentStyle.scrollView}>
            <CustomButton title={getLocale(language, 'close')} onPress={() => setSettingsModalVisible(false)} plainColor={true} block={true} color={Colors.warning} />
            <View style={{ marginTop: 20 }}>
              <View style={currentStyle.setting}>
                <Text style={{ ...currentStyle.settingTitle, marginBottom: 10 }}>{getLocale(language, 'darkmode')}</Text>
                <Switch value={darkMode} onValueChange={(value) => handleDarkMode(value)} />
              </View>
              <View>
                <Text style={currentStyle.settingTitle}>{getLocale(language, 'language')}</Text>
                <Picker style={currentStyle.picker} selectedValue={language} onValueChange={(itemValue) => handleLanguage(itemValue)}>
                  {languages.map((lang) => (
                    <Picker.Item key={lang.code} label={lang.name} value={lang.code} color={darkMode ? 'white' : ''} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </Modal>
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
  picker: {
    marginVertical: -20,
  },
  setting: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  settingTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

const darkModeStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
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
  picker: {
    marginVertical: -20,
  },
  setting: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  settingTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white,
  },
});
