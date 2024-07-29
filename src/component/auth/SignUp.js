import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import CHeader from '../common/CHeader';
import {Field, Formik} from 'formik';
import {signUpValidationSchema} from '../../utils/validation';
import CustomeInput from '../common/CInput';
import CButton from '../common/CButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {errorToast, sucessToast} from '../common/CToast';

export default function SignUp({navigation}) {
  const formikRef = useRef(null);

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  const onSubmitForm = async values => {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      const uid = user.uid;
      await firestore().collection('Users').doc(uid).set({
        email: values.email,
        name: values.fullName,
        phoneNum: values.phoneNumber,
        uid: uid,
      });
      sucessToast('Sucess', 'User account created & signed in!');
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        errorToast('Error!', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        errorToast('Error!', 'That email address is invalid!');
      } else {
        errorToast('Error!', 'Something went wrong. Please try again.');
      }
      console.log(error);
    }
  };

  return (
    <View style={styles.main}>
      <CHeader title={'SignUp'} isBack />
      <View style={styles.innerview}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={onSubmitForm}>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomeInput}
                name="fullName"
                placeholder="Full Name"
              />
              <Field
                component={CustomeInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={CustomeInput}
                name="phoneNumber"
                placeholder="Phone Number"
                keyboardType="numeric"
              />
              <Field
                component={CustomeInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <Field
                component={CustomeInput}
                name="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry
              />
              <CButton
                title={'Sign In'}
                onPress={handleSubmit}
                disabled={!isValid}
              />
              <View style={styles.divider} />
              <TouchableOpacity onPress={onPressLogin}>
                <Text style={styles.signuptext}>{'Login'}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
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
  },
  signuptext: {
    color: '#000',
    fontSize: 17,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#BC9F8B',
    width: '60%',
    marginVertical: 10,
  },
});
