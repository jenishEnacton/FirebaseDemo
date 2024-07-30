import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import images from '../../assets/images';
import {getAsyncData} from '../../utils/asyncData';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      getToken();
    }, 2000);
  }, []);

  const getToken = async () => {
    const token = await getAsyncData('LOGINTOKEN');
    const mobileToken = await getAsyncData('PHONETOKEN');

    if (token || mobileToken) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.main}>
      <Image source={images.splash} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
