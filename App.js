import { NavigationContainer } from '@react-navigation/native';
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
      <Stack.Screen name='ProfileList' component={ProfileList} />
      <Stack.Screen name='FriendList' component={FriendList} />
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
    </NavigationContainer>
  );
}
