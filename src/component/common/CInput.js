import {StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';

export default function CustomeInput(props) {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          props.multiline && {height: props.numberOfLines * 40},
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    fontSize: 20,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});
