/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import { GestEduApp } from './src/GestEduApp';
import { Alert } from 'react-native';



messaging().onMessage(async (remoteMessage) => {
  console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  const { title, body } = remoteMessage.notification;
  Alert.alert(title, body);
});

// Manejar mensajes cuando la app está en segundo plano o cerrada
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});



AppRegistry.registerComponent(appName, () => GestEduApp);
