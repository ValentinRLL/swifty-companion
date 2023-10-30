import { Image, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

const Avatar = ({ image, size, online }) => {
  const avatarSize = size && size > 0 ? size : 100;
  const status = {
    online: require('../../assets/frames/online.png'),
    offline: require('../../assets/frames/offline.png'),
  };
  // const status = [
  //   require('../../assets/frames/online.png'),
  //   require('../../assets/frames/offline.png'),
  //   require('../../assets/frames/away.png'),
  //   require('../../assets/frames/busy.png'),
  // ];
  return (
    <ImageBackground style={{ ...styles.frame, width: avatarSize, height: avatarSize }} source={status[online ? 'online' : 'offline']}>
      <Image style={{ ...styles.image, width: avatarSize * 0.85, height: avatarSize * 0.85 }} source={{ uri: image }} />
    </ImageBackground>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  frame: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 6,
    width: 85,
    height: 85,
  },
});
