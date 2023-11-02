import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 50,
    padding: 15,
    paddingLeft: 20,
    fontSize: 20,
    color: Colors.black,
  },
  mv10: {
    marginVertical: 10,
  },
});
