import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CButton(props) {
  let {title, onPress, extrasty, disabled} = props;
  return (
    <TouchableOpacity
      style={[styles.container, extrasty]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.btntitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17153B',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
  btntitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
