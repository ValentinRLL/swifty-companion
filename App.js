import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from './src/styles.js/Colors';
import Search from './src/screens/Search';
import FriendList from './src/screens/FriendList';
import Profile from './src/screens/Profile';

import ProfileList from './src/screens/ProfileList';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name='Search'
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ProfileList'
        component={ProfileList}
        options={{
          // headerShown: false,
          headerTitle: 'Recherche',
        }}
      />
      <Stack.Screen
        name='FriendList'
        component={FriendList}
        options={{
          headerTitle: `Liste d'amis`,
        }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style='auto' />
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
