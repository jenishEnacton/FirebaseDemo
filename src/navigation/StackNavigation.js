import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../component/auth/Login';
import SignUp from '../component/auth/SignUp';
import Home from '../component/screens/Home';
import Splash from '../component/screens/Splash';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../component/common/CToast';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import ForgotPassword from '../component/auth/ForgotPassword';
import PhoneNumber from '../component/auth/PhoneNumber';
import ImagePick from '../component/screens/ImagePick';
import PdfGenrate from '../component/screens/PdfGenrate';

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();

  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('810d77d6-26f6-49df-af8e-e1c2fb7f67c3');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="ImagePick" component={ImagePick} />
        <Stack.Screen name="PdfGenrate" component={PdfGenrate} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
