import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Text, Layout, Spinner, Icon } from '@ui-kitten/components';
import { gestEduApi } from '../../../config/api/GestEduApi';
import axios from 'axios';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Notification {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  leido: boolean;
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  const handleLogoPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      }),
    );
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await gestEduApi.get<Notification[]>('/notificaciones');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        Alert.alert('Error', 'Ocurrió un error al obtener las notificaciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await gestEduApi.post(`/notificaciones/${id}/leida`);
      Alert.alert('Notificación marcada como leída');
      setNotifications(notifications.map(notif => notif.id === id ? { ...notif, leido: true } : notif));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      Alert.alert('Error', 'Ocurrió un error al marcar la notificación como leída.');
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <View style={[styles.notificationItem, item.leido && styles.read]}>
      {!item.leido && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => markAsRead(item.id)}>
          <Icon name="eye-outline" style={styles.icon} fill="#802C2C" />
        </TouchableOpacity>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.description}>{item.descripcion}</Text>
        <Text style={styles.date}>{new Date(item.fecha).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <Layout style={styles.loadingContainer}>
        <Spinner size="large" />
      </Layout>
    );
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={handleLogoPress}>
          <Image
            source={require('../../../assets/logo/gestEdu1.png')}
            style={styles.logo2}
          />
        </TouchableOpacity>
      </View>
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notificaciones</Text>
        </View>
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id.toString()}
        />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#802C2C',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  read: {
    opacity: 0.6,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  icon: {
    width: 28,
    height: 28,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo2: {
    width: 210,
    height: 40,
  },
});

export default NotificationsScreen;
