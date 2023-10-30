import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../styles.js/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../styles.js/AppStyles';

const Header = ({ content, children }) => {
  return (
    <View style={{ ...globalStyles.container, ...styles.container }}>
      <LinearGradient
        style={{ ...globalStyles.headerContainer, ...styles.gradient }}
        colors={[Colors.gradientPrimary[0], Colors.gradientPrimary[1]]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        {content}
      </LinearGradient>
      {children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
  },
  gradient: {
    paddingTop: 100,
  },
});
