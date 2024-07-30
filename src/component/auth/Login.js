import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import CHeader from '../common/CHeader';
import {Field, Formik} from 'formik';
import {loginValidationSchema} from '../../utils/validation';
import CustomeInput from '../common/CInput';
import CButton from '../common/CButton';
import auth from '@react-native-firebase/auth';
import {setAsyncData} from '../../utils/asyncData';
import {errorToast} from '../common/CToast';

export default function Login({navigation}) {
  const formikRef = useRef(null);
  const onPressSignUp = () => navigation.navigate('SignUp');

  const onSubmitForm = async values => {
    await auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(val => {
        const uid = val.user.uid;
        setAsyncData('LOGINTOKEN', uid);
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          errorToast('Error!', 'Invalid Email or Password');
        }
        console.log(error);
      });
  };
  const onPressForgotPass = () => {
    navigation.navigate('ForgotPassword');
  };
  const onPressLoginNumber = () => navigation.navigate('PhoneNumber');

  return (
    <View style={styles.main}>
      <CHeader title={'Login'} />
      <View style={styles.innerview}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, {resetForm}) => {
            await onSubmitForm(values);
            resetForm();
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomeInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />

              <Field
                component={CustomeInput}
                name="password"
                placeholder="Password"
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.btnsty}
                onPress={onPressForgotPass}>
                <Text style={[styles.signuptext, {fontSize: 13}]}>
                  {'Forgot Password'}
                </Text>
              </TouchableOpacity>
              <CButton
                title={'Login'}
                onPress={handleSubmit}
                disabled={!isValid}
              />
              <View style={styles.divider} />

              <TouchableOpacity onPress={onPressSignUp}>
                <Text style={styles.signuptext}>{'Sign Up'}</Text>
              </TouchableOpacity>
              <Text style={{marginVertical: 5}}>or</Text>
              <TouchableOpacity onPress={onPressLoginNumber}>
                <Text style={styles.signuptext}>{'Using Number'}</Text>
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
  btnsty: {
    alignSelf: 'flex-end',
    marginRight: 25,
  },
});
