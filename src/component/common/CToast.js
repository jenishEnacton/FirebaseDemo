// ToastService.js
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#34A853'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

export const sucessToast = (text1, text2) => {
  Toast.show({
    type: 'success',
    text1: text1,
    text2: text2,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export const errorToast = (text1, text2) => {
  Toast.show({
    type: 'error',
    text1: text1,
    text2: text2,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};
