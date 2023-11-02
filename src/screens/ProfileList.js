import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { globalStyles } from '../styles.js/AppStyles';
import SingleProfileSearch from '../components/SingleProfileSearch';
import Colors from '../styles.js/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import getLocale from '../constants/localization';

const ProfileList = ({ navigation, route }) => {
  const { login, users, language, darkMode } = route.params;
  const currentStyle = darkMode ? darkModeStyles : styles;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: getLocale(language, 'search'),
    });
  }, []);
  return (
    <View style={{ ...globalStyles.container, ...currentStyle.container }}>
      <LinearGradient
        style={{ ...globalStyles.headerContainer, ...currentStyle.gradient }}
        colors={darkMode ? [Colors.darkGradientPrimary[0], Colors.darkGradientPrimary[1]] : [Colors.gradientPrimary[0], Colors.gradientPrimary[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={currentStyle.headerTextContainer}>
          <Text style={currentStyle.headerText}>{getLocale(language, 'searchResult', [login])}</Text>
        </View>
        <Image style={currentStyle.wave} source={darkMode ? require('../../assets/wave-darkmode.png') : require('../../assets/wave.png')} />
      </LinearGradient>
      <View>
        <Text style={currentStyle.subTitle}>{getLocale(language, 'foundProfiles', [users?.length || 0])}</Text>
      </View>
      <View style={currentStyle.flatList}>
        <FlatList data={users} renderItem={({ item }) => <SingleProfileSearch user={item} language={language} darkMode={darkMode} />} keyExtractor={(item) => item.id} />
      </View>
    </View>
  );
};

export default ProfileList;

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
    backgroundColor: Colors.white,
  },
  gradient: {
    paddingTop: 150,
  },
  flatList: {
    flex: 1,
  },
  wave: {
    width: '100%',
    height: 30,
    resizeMode: 'stretch',
  },
  headerTextContainer: {
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  headerText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    color: Colors.black,
    fontSize: 16,
    padding: 20,
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    marginTop: -100,
    backgroundColor: Colors.darkBackground,
  },
  gradient: {
    paddingTop: 100,
  },
  flatList: {
    flex: 1,
  },
  wave: {
    width: '100%',
    height: 30,
    resizeMode: 'stretch',
  },
  headerTextContainer: {
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  headerText: {
    color: Colors.white,
    fontSize: 20,
  },
  subTitle: {
    color: Colors.white,
    fontSize: 16,
    padding: 20,
  },
});
