import {useNavigation} from '@react-navigation/native';
import {Text, Layout, Button, Icon} from '@ui-kitten/components';
import React from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {logout} = useAuthStore();

  const onLogout = async () => {
    const resp = await logout();
    if (resp) {
      navigation.navigate('LoginScreen');
    } else {
      Alert.alert('Error', 'No se pudo cerrar sesión', [{text: 'Ok'}]);
    }
  };

  const goToInstructions = () => {
    navigation.navigate('Instruction');
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo/gestEdu2.png')} style={styles.logo} />
        <Text category="s1" style={styles.subtitle}>Administrador de gestión educativa</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.instructionButton} onPress={goToInstructions}>
          Ver Instructivos
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 110,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  instructionButton: {
    marginTop: 20,
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
  },
});

export default HomeScreen;
