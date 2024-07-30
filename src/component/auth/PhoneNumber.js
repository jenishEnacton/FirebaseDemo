import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CHeader from '../common/CHeader';
import {Field, Formik} from 'formik';
import {mobileNumberSchema} from '../../utils/validation';
import CustomeInput from '../common/CInput';
import CButton from '../common/CButton';
import auth from '@react-native-firebase/auth';
import {setAsyncData} from '../../utils/asyncData';
import {sucessToast, errorToast} from '../common/CToast';
import {CLoader} from '../common/CLoader';
import OTPTextView from 'react-native-otp-textinput';

export default function PhoneNumber({navigation}) {
  const formikRef = useRef(null);
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const onSubmitNumber = async val => {
    try {
      setIsLoading(true);
      await auth()
        .signInWithPhoneNumber(`+91 ${val.phoneNumber}`)
        .then(
          value => setConfirm(value),
          sucessToast('Sucess', 'OTP sent Sucessfully'),
        )
        .catch(err => {
          console.log(err), setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onSubmitOtp = async () => {
    try {
      setIsLoading(true);
      if (confirm) {
        const res = await confirm.confirm(otp);
        await setAsyncData('PHONETOKEN', res.user.uid);
        sucessToast('Success', 'Phone number verified successfully');
        navigation.navigate('Home');
      } else {
        errorToast('Error', 'Invalid OTP');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      errorToast('Error', 'Invalid OTP, please try again');
    }
  };

  return (
    <View style={styles.main}>
      <CHeader title={'Phone Number'} isBack />
      <View style={styles.innerview}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            phoneNumber: '',
          }}
          validationSchema={mobileNumberSchema}
          onSubmit={values => {
            onSubmitNumber(values);
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomeInput}
                name="phoneNumber"
                placeholder="Phone Number"
                keyboardType="numeric"
              />
              <CButton
                title={'Send OTP'}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
        {confirm && (
          <View>
            <OTPTextView
              inputCount={6}
              autoFocus={true}
              textInputStyle={styles.otpinputview}
              tintColor={'#6482AD'}
              offTintColor={'#000'}
              handleTextChange={text => setOtp(text)}
            />
            <CButton title={'Verify OTP'} onPress={onSubmitOtp} />
          </View>
        )}
      </View>
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
  },
  otpinputview: {
    width: 50,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 20,
  },
});
