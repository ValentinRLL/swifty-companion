import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { globalStyles } from '../styles.js/AppStyles';
import SingleProfileSearch from '../components/SingleProfileSearch';
import Colors from '../styles.js/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileList = ({ route }) => {
  const login = route.params.login;
  const users = route.params.users;

  return (
    <View style={{ ...globalStyles.container, ...styles.container }}>
      <LinearGradient
        style={{ ...globalStyles.headerContainer, ...styles.gradient }}
        colors={[Colors.gradientPrimary[0], Colors.gradientPrimary[1]]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Résultats de recherche pour {login} :</Text>
        </View>
        <Image style={styles.wave} source={require('../../assets/wave.png')} />
      </LinearGradient>
      <View>
        <Text style={styles.subTitle}>Profils trouvés ({users?.length || 0})</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList data={users} renderItem={({ item }) => <SingleProfileSearch user={item} />} keyExtractor={(item) => item.id} />
      </View>
    </View>
  );
};

export default ProfileList;

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
  },
  gradient: {
    paddingTop: 100,
  },
  flatList: {
    // backgroundColor: 'salmon',
    flex: 1,
  },
  wave: {
    // marginTop: 50,
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
    // color: Colors.white,
    fontSize: 16,
    padding: 20,
  },
});
