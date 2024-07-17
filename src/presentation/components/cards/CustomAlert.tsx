import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, Card, Icon } from '@ui-kitten/components';

const CustomAlert = ({ isVisible, onClose, title, message, iconName }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <Card style={styles.card}>
        {iconName && (
          <Icon
            name={iconName}
            style={styles.icon}
            fill='#802C2C'
          />
        )}
        <Text category="h5" style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Button style={styles.button} onPress={onClose}>
          OK
        </Button>
      </Card>
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#666',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
    width: 100,
  },
});

export default CustomAlert;
