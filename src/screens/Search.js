import { Alert, Animated, Easing, Image, Modal, ScrollView, StyleSheet, Switch, Text, TouchableWithoutFeedback, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../styles/AppStyles';
import CustomTextInput from '../components/CustomTextInput';
import Colors from '../styles/Colors';
import CustomButton from '../components/CustomButton';
import api from '../api/api';
import { getUserDarkMode, getUserLanguage, setUserDarkMode, setUserLanguage } from '../api/storage';
import { Picker } from '@react-native-picker/picker';
import getLocale from '../constants/localization';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const Search = ({ navigation }) => {
  const [login, setLogin] = useState('');
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
    <View style={{ flex: 1, ...currentStyle.container }}>
      <View style={currentStyle.header}>
        <LinearGradient
          style={{ ...globalStyles.headerContainer, ...currentStyle.gradient }}
          colors={darkMode ? [Colors.darkGradientPrimary[0], Colors.darkGradientPrimary[1]] : [Colors.gradientPrimary[0], Colors.gradientPrimary[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={currentStyle.settingButton}>
            <MaterialIcons name='settings' size={36} color={darkMode ? Colors.white : Colors.primary} onPress={() => setSettingsModalVisible(true)} />
          </View>
          <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
            {count >= 5 ? (
              <Animated.Image style={{ ...currentStyle.logo, transform: [{ rotate: spin }] }} source={require('../../assets/msn-logo.png')} />
            ) : (
              <Image style={currentStyle.logo} source={darkMode ? require('../../assets/42logo-darkmode.png') : require('../../assets/42logo.png')} />
            )}
          </TouchableWithoutFeedback>
          <Image style={currentStyle.wave} source={darkMode ? require('../../assets/wave-darkmode.png') : require('../../assets/wave.png')} />
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={currentStyle.scrollView} keyboardDismissMode='on-drag'>
        <View style={{ ...globalStyles.container, ...currentStyle.searchContainer }}>
          <View style={currentStyle.titleContainer}>
            <Text style={currentStyle.title}>{getLocale(language, 'welcomeBack')}</Text>
          </View>
          <View style={currentStyle.titleContainer}>
            <Text style={currentStyle.subTitle}>{getLocale(language, 'searchLogin')}</Text>
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
            color={Colors.secondary}
          />
          <Modal animationType='slide' visible={settingsModalVisible} presentationStyle='pageSheet' onRequestClose={() => setSettingsModalVisible(false)}>
            <View style={currentStyle.scrollView}>
              <View style={{ ...currentStyle.titleContainer, marginLeft: 20 }}>
                <Text style={currentStyle.title}>{getLocale(language, 'settings')}</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <View style={currentStyle.setting}>
                  <Text style={{ ...currentStyle.settingTitle, marginBottom: 10 }}>{getLocale(language, 'darkmode')}</Text>
                  <Switch value={darkMode} onValueChange={(value) => handleDarkMode(value)} />
                </View>
                <View>
                  <Text style={currentStyle.settingTitle}>{getLocale(language, 'language')}</Text>
                  <Picker style={currentStyle.picker} selectedValue={language} onValueChange={(itemValue) => handleLanguage(itemValue)}>
                    {languages.map((lang) => (
                      <Picker.Item key={lang.code} label={lang.name} value={lang.code} color={Platform.OS === 'ios' && darkMode ? Colors.white : ''} />
                    ))}
                  </Picker>
                  <View style={{ paddingHorizontal: 20 }}>
                    <CustomButton title={getLocale(language, 'close')} onPress={() => setSettingsModalVisible(false)} plainColor={true} block={true} color={Colors.primary} />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 15,
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
  settingButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -40,
  },
  gradient: {
    paddingTop: 100,
  },
  wave: {
    width: '100%',
    height: 30,
    resizeMode: 'stretch',
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.black,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  container: {
    backgroundColor: Colors.white,
  },
});

const darkModeStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  searchContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 15,
  },
  picker: {
    marginVertical: -20,
    color: Colors.white,
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
  settingButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  gradient: {
    paddingTop: 100,
  },
  wave: {
    width: '100%',
    height: 30,
    resizeMode: 'stretch',
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  container: {
    backgroundColor: Colors.darkBackground,
  },
});
