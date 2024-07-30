import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import CHeader from '../common/CHeader';
import {Field, Formik} from 'formik';
import {forgotPasswordSchema} from '../../utils/validation';
import CustomeInput from '../common/CInput';
import CButton from '../common/CButton';
import {sucessToast} from '../common/CToast';
import auth from '@react-native-firebase/auth';

export default function ForgotPassword({navigation}) {
  const formikRef = useRef(null);

  const onSubmitForm = async val => {
    await auth()
      .sendPasswordResetEmail(val.email)
      .then(
        () => sucessToast('Sucess', 'Link sent sucessfully'),
        navigation.navigate('Login'),
      )
      .catch(err => console.log(err));
  };

  const onPressLogin = () => navigation.navigate('Login');

  return (
    <View style={styles.main}>
      <CHeader title={'Forgot Password'} isBack />
      <View style={styles.innerview}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values, {resetForm}) => {
            onSubmitForm(values);
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

              <CButton
                title={'Send Link'}
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
    marginHorizontalL: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#BC9F8B',
    width: '60%',
    marginVertical: 10,
  },
});
