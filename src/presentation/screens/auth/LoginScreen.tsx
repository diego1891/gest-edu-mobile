import React, { useState } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.email === '' || form.password === '') {
      return;
    }
    setLoading(true);
    const resp = await login(form.email, form.password);
    if (resp) {
      setLoading(false);
      navigation.navigate('SideMenuNavigator');
    } else {
      setLoading(false);
      Alert.alert('Error', 'Usuario o contraseña incorrectos', [{ text: 'Ok' }]);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    
    <Layout style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/gestEdu.png')} style={styles.logo} />
        </View>
        <Text category="h1" style={styles.title}>
          Inicia sesión
        </Text>
        <Input
          accessoryLeft={<MyIcon name="email-outline" color="#802C2C" />}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
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
          onChangeText={(password) => setForm({ ...form, password })}
          style={styles.input}
        />
        <Button
          style={styles.loginButton}
          disabled={loading}
          onPress={onLogin}
        >
          Ingresar
        </Button>
        <Text style={styles.forgotPassword} status="danger" onPress={() => {}}>
          Olvidé mi contraseña
        </Text>
        <View style={styles.registerContainer}>
          <Text>No tienes una cuenta? </Text>
          <Text
            status="danger"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            Regístrate
          </Text>
        </View>
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
});
