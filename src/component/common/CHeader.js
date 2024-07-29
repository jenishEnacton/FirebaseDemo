import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

export default function CHeader(props) {
  const {title, isBack} = props;
  const navigation = useNavigation();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.view}>
      {isBack && (
        <AntDesign
          name="arrowleft"
          size={30}
          color={'#000'}
          style={styles.arrow}
          onPress={onPressGoBack}
        />
      )}
      <Text style={isBack ? styles.title : styles.withoutgoback}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f0f0f0',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  arrow: {
    marginHorizontal: 20,
  },
  withoutgoback: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 30,
  },
});
