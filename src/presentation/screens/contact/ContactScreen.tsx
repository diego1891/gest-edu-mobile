import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, Layout, Icon } from '@ui-kitten/components';
import Mailer from 'react-native-mail';
import { GEST_EDU_MAIL } from '@env';

export const ContactScreen = () => {
  const handleMailPress = () => {
    Mailer.mail({
      subject: 'Contactar con GestEdu',
      recipients: [GEST_EDU_MAIL],
      body: '',
      isHTML: true,
    }, (error, event) => {
      if (error) {
        Alert.alert('Error', 'No se puede enviar el correo. Verifica tu configuración.');
      }
    });
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.header}>
        Escribinos!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleMailPress}>
        <Icon name="email-outline" style={styles.icon} fill="#802C2C" />
        <Text style={styles.buttonText}>Enviar correo a GestEdu</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#802C2C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ContactScreen;
