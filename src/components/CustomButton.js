import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import Colors from '../styles.js/Colors';

const CustomButton = ({ title, onPress, plainColor, block, color }) => {
  return (
    <View style={[plainColor ? styles.plainColor : {}, block ? styles.block : {}, color ? { backgroundColor: color, borderColor: color } : {}]}>
      <Button title={title} onPress={onPress} color={plainColor ? Colors.white : null} />
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  plainColor: {
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.primary,
    borderRadius: 7,
    marginVertical: 10,
    padding: 15,
    borderRadius: 50,
  },
  block: {
    width: '100%',
  },
});
