import {Clipboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {clearAsyncData, getAsyncData} from '../../utils/asyncData';
import CButton from '../common/CButton';
import auth from '@react-native-firebase/auth';
import CHeader from '../common/CHeader';
import firestore from '@react-native-firebase/firestore';
import {CLoader} from '../common/CLoader';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {sucessToast} from '../common/CToast';

export default function Home({navigation}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generalLink, setGeneralLink] = useState(null);

  const buildLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: 'https://github.com/',
      domainUriPrefix: 'https://rnfiretestdemo.page.link/jdF1',
    });
    setGeneralLink(link);
  };

  const openLink = () => {
    Clipboard.setString(generalLink);
  };

  useEffect(() => {
    getLoginToken();
  }, []);

  const onPressEmailSent = async () => {
    await auth()
      .sendPasswordResetEmail('vodite7756@orsbap.com')
      .then(() => sucessToast('Sucess', 'Email sent Sucessfully'))
      .catch(err => console.log(err));
  };

  const getLoginToken = async () => {
    setIsLoading(true);
    const res = await getAsyncData('LOGINTOKEN');
    const user = await firestore().collection('Users').doc(res).get();
    setData(user._data);
    setIsLoading(false);
  };

  const onPressLogOut = async () => {
    await auth()
      .signOut()
      .then(
        () => navigation.navigate('Login'),
        await clearAsyncData('LOGINTOKEN'),
      )
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.main}>
      <CHeader title={'Home'} />
      <View style={styles.innerview}>
        <Text style={styles.text}>Welcome, {data?.name}</Text>
        <Text style={styles.text}> {data?.email}</Text>
        <Text style={styles.text}> {data?.phoneNum}</Text>
        <Text style={[styles.text, {marginHorizontal: 30}]}>{generalLink}</Text>
      </View>
      <CButton
        title={'Email Verification'}
        extrasty={styles.mailverifyButton}
        onPress={onPressEmailSent}
      />
      <View style={styles.linkbtnview}>
        <CButton
          title={'Generate Link'}
          extrasty={styles.linkbtn}
          onPress={buildLink}
        />
        <CButton
          title={'Open Link'}
          extrasty={styles.linkbtn}
          onPress={openLink}
        />
      </View>
      <CButton
        title={'Log Out'}
        onPress={onPressLogOut}
        extrasty={styles.btn}
      />
      {isLoading && <CLoader />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  tokenres: {
    fontSize: 20,
    color: '#000',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  btn: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: 35,
    marginBottom: 20,
  },
  linkbtnview: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  linkbtn: {
    width: '40%',
  },
  mailverifyButton: {
    width: '50%',
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: '#6482AD',
  },
});
