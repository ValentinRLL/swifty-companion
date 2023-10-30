import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

const CustomTextInput = ({ style, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.textInput}>
      <TextInput style={{ ...style }} placeholder={placeholder} value={value} onChangeText={onChangeText} />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
  },
});
