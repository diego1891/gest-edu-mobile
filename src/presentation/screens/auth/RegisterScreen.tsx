import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  Layout,
  Input,
  Button,
  Text,
  useTheme,
  Datepicker,
} from '@ui-kitten/components';
import {MyIcon} from '../../components/ui/MyIcon';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {StorageAdapter} from '../../../config/adapters/storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {register} = useAuthStore();
  const theme = useTheme();
  const [ci, setCi] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNac, setFechaNac] = useState(new Date());
  const [domicilio, setDomicilio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    const user = {
      ci,
      nombre,
      apellido,
      email,
      password,
      telefono,
      domicilio,
      fechaNac,
    };

    const resp = await register(user);
    if (resp) {
      const token = await StorageAdapter.getItem('token');
      console.log('Token en registro: ' + token);

      if (token == null) {
        navigation.navigate('LoginScreen');
      }
      navigation.navigate('SideMenuNavigator');
    } else {
      console.log('Error en el registro');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid={true}
      extraHeight={Platform.OS === 'ios' ? 0 : 100}
      extraScrollHeight={Platform.OS === 'ios' ? 0 : 100}>
      <Layout style={styles.outerContainer}>
        <Layout style={styles.container}>
          <Text category="h1" style={styles.title}>
            ¡Regístrate!
          </Text>

          <Input
            style={styles.input}
            placeholder="Cédula de identidad"
            value={ci}
            onChangeText={setCi}
            keyboardType="numeric"
            accessoryLeft={<MyIcon name="credit-card-outline" />}
          />

          <Input
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
            accessoryLeft={props => <MyIcon {...props} name="person-outline" />}
          />

          <Input
            style={styles.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
            accessoryLeft={props => <MyIcon {...props} name="person-outline" />}
          />

          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            accessoryLeft={props => <MyIcon {...props} name="email-outline" />}
          />

          <Datepicker
            style={styles.input}
            placeholder="Fecha de nacimiento"
            date={fechaNac}
            onSelect={setFechaNac}
            min={new Date(1900, 0, 1)} // Permitir seleccionar fechas desde el 1 de enero de 1900
            max={new Date()} // Permitir seleccionar fechas hasta la fecha actual
            accessoryLeft={props => (
              <MyIcon {...props} name="calendar-outline" />
            )}
          />

          <Input
            style={styles.input}
            placeholder="Dirección"
            value={domicilio}
            onChangeText={setDomicilio}
            accessoryLeft={props => <MyIcon {...props} name="pin-outline" />}
          />

          <Input
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            keyboardType="numeric"
            onChangeText={setTelefono}
            accessoryLeft={props => (
              <MyIcon {...props} name="smartphone-outline" />
            )}
          />

          <View style={styles.passwordContainer}>
            <Input
              style={styles.inputPassword}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              accessoryLeft={props => <MyIcon {...props} name="lock-outline" />}
              accessoryRight={props => (
                <MyIcon
                  {...props}
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            />
          </View>

          <View style={styles.passwordContainer}>
            <Input
              style={styles.inputPassword}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              accessoryLeft={props => <MyIcon {...props} name="lock-outline" />}
              accessoryRight={props => (
                <MyIcon
                  {...props}
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button style={styles.registerButton} onPress={handleRegister}>
              Registrarse
            </Button>
            <Button
              style={styles.cancelButton}
              appearance="outline"
              status="danger"
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              Cancelar
            </Button>
          </View>
        </Layout>
      </Layout>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#802C2C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    width: 500,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#000000',
  },
  input: {
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputPassword: {
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#802C2C',
  },
});

export default RegisterScreen;
