import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CHeader from '../common/CHeader';
import CButton from '../common/CButton';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {errorToast, sucessToast} from '../common/CToast';

export default function ImagePick() {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      // selectionLimit: 0,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const uploadImage = async () => {
    if (imageUri) {
      const uniqueName = `images/${Date.now()}.jpg`;
      const reference = storage().ref(uniqueName);
      await reference.putFile(imageUri);
      const url = await reference.getDownloadURL();
      sucessToast('sucess', 'Image uploaded successfully:', url);
    } else {
      errorToast('Error!', 'Please select an image');
    }
  };

  return (
    <View style={styles.main}>
      <CHeader title={'Image Picker'} isBack />
      <View style={styles.innerview}>
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
        <CButton
          title={'Choose Image'}
          extrasty={styles.btn}
          onPress={selectImage}
        />
        {imageUri && (
          <CButton
            title={'Uplode Image'}
            extrasty={styles.btn}
            onPress={uploadImage}
          />
        )}
        <CButton title={'Choose Date'} />
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
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '50%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});
