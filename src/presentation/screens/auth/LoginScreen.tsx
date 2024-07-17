import React, {useEffect, useState} from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, Image, PermissionsAndroid, StyleSheet, View} from 'react-native';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {gestEduApi} from '../../../config/api/GestEduApi';
import messaging from '@react-native-firebase/messaging';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function firebaseNotification() {
    const requestPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getToken();
      } else {
        Alert.alert(
          'Permiso denegado',
          'No se han concedido permisos para las notificaciones.',
        );
      }
    };

    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        sendTokenToServer(token);
      } catch (error) {
        console.error('Error obteniendo el token de FCM:', error);
      }
    }; 

    const sendTokenToServer = async (token: string) => {
      console.log('TOKEN:: ' + token);
      try {
        await gestEduApi.post('/notificaciones/tokenFirebase', token, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
        console.log('Token enviado al servidor');
      } catch (error) {
        console.error('Error enviando el token al servidor:', error);
      }
    };

    requestPermission();

    const unsubscribe = messaging().onTokenRefresh(token => {
      console.log('FCM Token refrescado:', token);
      sendTokenToServer(token);
    });

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const notification = remoteMessage.notification;
      if (notification) {
        const {title, body} = notification;
        Alert.alert(title!, body);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeOnMessage();
    };
  }

  const onLogin = async () => {
    if (form.email === '' || form.password === '') {
      return;
    }
    setLoading(true);
    const resp = await login(form.email, form.password);
    if (resp) {
      setLoading(false);
      firebaseNotification();
      navigation.navigate('SideMenuNavigator');
    } else {
      setLoading(false);
      Alert.alert('Error', 'Usuario o contraseña incorrectos', [{text: 'Ok'}]);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [showValidationInput, setShowValidationInput] = useState(false);
  const [validationCode, setValidationCode] = useState('');

  const onValidateCertificate = async () => {
    try {
      const response = await gestEduApi.get(`/validar/${validationCode}`);
      if (response.status === 200) {
        Alert.alert('Validación exitosa', 'El certificado es válido.');
      } else {
        Alert.alert('Error', 'El certificado no es válido.');
      }
    } catch (error) {
      console.error('Error en la validación:', error);
      Alert.alert('Error', 'Ocurrió un error durante la validación.');
    } finally {
      setShowValidationInput(false);
    }
  };

  return (
    <Layout style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/logo/gestEdu.png')}
            style={styles.logo}
          />
        </View>
        {showValidationInput ? (
          <>
            <Text category="h1" style={styles.title}>
              Validar Certificado
            </Text>
            <Input
              accessoryLeft={
                <MyIcon name="checkmark-square-outline" color="#802C2C" />
              }
              placeholder="Código de validación"
              autoCapitalize="none"
              value={validationCode}
              onChangeText={setValidationCode}
              style={styles.input}
            />
            <Button
              style={styles.validationButton}
              disabled={loading}
              onPress={onValidateCertificate}>
              Validar
            </Button>
          </>
        ) : (
          <>
            <Text category="h1" style={styles.title}>
              Inicia sesión
            </Text>
            <Input
              accessoryLeft={<MyIcon name="email-outline" color="#802C2C" />}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={email => setForm({...form, email})}
              style={styles.input}
            />
            <Input
              accessoryLeft={<MyIcon name="lock-outline" color="#802C2C" />}
              accessoryRight={
                <MyIcon
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                  color="#802C2C"
                  onPress={togglePasswordVisibility}
                />
              }
              placeholder="Contraseña"
              autoCapitalize="none"
              secureTextEntry={!passwordVisible}
              value={form.password}
              onChangeText={password => setForm({...form, password})}
              style={styles.input}
            />
            <Button
              style={styles.loginButton}
              disabled={loading}
              onPress={onLogin}>
              Ingresar
            </Button>
            <Text
              style={styles.forgotPassword}
              status="danger"
              onPress={() => {}}>
              Olvidé mi contraseña
            </Text>
            <View style={styles.registerContainer}>
              <Text>No tienes una cuenta? </Text>
              <Text
                status="danger"
                category="s1"
                onPress={() => navigation.navigate('RegisterScreen')}>
                Regístrate
              </Text>
            </View>
            <Text
              style={styles.validateText}
              status="danger"
              onPress={() => setShowValidationInput(true)}>
              Validar certificado
            </Text>
          </>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#802C2C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 400,
    height: '75%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 140,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validateText: {
    textAlign: 'center',
    marginTop: 20,
  },
  validationButton: {
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
    marginTop: 10,
  },
});
