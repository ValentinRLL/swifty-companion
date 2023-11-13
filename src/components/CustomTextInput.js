import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';

const CustomTextInput = ({ style, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.textInput}>
      <TextInput placeholderTextColor={Colors.inputColor} style={{ ...style }} placeholder={placeholder} value={value} onChangeText={onChangeText} />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
  },
});
