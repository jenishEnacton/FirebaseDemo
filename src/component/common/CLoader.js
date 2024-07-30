// Library Imports
import {ActivityIndicator, View, StyleSheet} from 'react-native';

// Common loader component
export const CLoader = () => {
  return (
    <View style={localStyle.main}>
      <ActivityIndicator size={'large'} color={'#B43F3F'} />
    </View>
  );
};

const localStyle = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
