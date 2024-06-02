import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Layout, Text, Button, Input, useTheme } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';
import { useNavigation } from '@react-navigation/native';
import { StorageAdapter } from '../../../config/adapters/storage';
import { User } from '../../../domain/entities/user';
import { gestEduApi } from '../../../config/api/GestEduApi';


const defaultAvatar = require('../../../assets/logo/defaultUserImage.png'); // Ruta de la imagen predeterminada

export const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [profile, setProfile] = useState<User>({
    ci: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    domicilio: '',
    fechaNac: new Date(),
    avatarUrl: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<User>(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = await StorageAdapter.getItem('profile');

        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setProfile({
            ...parsedProfile,
            fechaNac: new Date(parsedProfile.fechaNac),
            avatarUrl: parsedProfile.avatarUrl || defaultAvatar
          });
        } else {
          const response = await gestEduApi.get('/usuario/perfil');
          const fetchedProfile: User = response.data;

          fetchedProfile.fechaNac = new Date(fetchedProfile.fechaNac);
          fetchedProfile.avatarUrl = fetchedProfile.avatarUrl || defaultAvatar;

          setProfile(fetchedProfile);
          await StorageAdapter.setItem('profile', JSON.stringify(fetchedProfile));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        Alert.alert('Error', 'Error fetching profile data.');
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile(profile);
  };

  const handleApplyChanges = async () => {
    try {

      const updatedTempProfile = {
        ...tempProfile,
        fechaNac: tempProfile.fechaNac instanceof Date ? tempProfile.fechaNac.toISOString() : tempProfile.fechaNac
      };

      const response = await gestEduApi.put('/usuario/perfil', updatedTempProfile);
      const updatedProfile: User = response.data;

     
      updatedProfile.fechaNac = new Date(updatedProfile.fechaNac);
      updatedProfile.avatarUrl = updatedProfile.avatarUrl || defaultAvatar;

      setProfile(updatedProfile);
      await StorageAdapter.setItem('profile', JSON.stringify(updatedProfile));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Error updating profile data.');
    }
  };

  return (
    <Layout style={styles.outerContainer}>
      <Layout style={styles.container}>
        <View style={styles.profileHeader}>
          <Image 
            source={typeof profile.avatarUrl === 'string' ? { uri: profile.avatarUrl } : profile.avatarUrl} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>{profile.nombre} {profile.apellido}</Text>
        </View>

        <Text style={styles.sectionTitle}>Datos Personales:</Text>

        <View style={styles.infoRow}>
          <MyIcon name="person-outline" />
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>{profile.nombre}</Text>
        </View>

        <View style={styles.infoRow}>
          <MyIcon name="person-outline" />
          <Text style={styles.infoLabel}>Apellido</Text>
          <Text style={styles.infoValue}>{profile.apellido}</Text>
        </View>

        <View style={styles.infoRow}>
          <MyIcon name="credit-card-outline" />
          <Text style={styles.infoLabel}>Cédula de identidad</Text>
          <Text style={styles.infoValue}>{profile.ci}</Text>
        </View>

        <View style={styles.infoRow}>
          <MyIcon name="email-outline" />
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profile.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <MyIcon name="calendar-outline" />
          <Text style={styles.infoLabel}>Fecha de nacimiento</Text>
          <Text style={styles.infoValue}>{new Date(profile.fechaNac).toLocaleDateString()}</Text>
        </View>

        <View style={styles.infoRow}>
          <MyIcon name="phone-outline" />
          <Text style={styles.infoLabel}>Teléfono</Text>
          {isEditing ? (
            <Input
              value={tempProfile.telefono}
              onChangeText={(telefono) => setTempProfile({ ...tempProfile, telefono })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.infoValue}>{profile.telefono}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <MyIcon name="pin-outline" />
          <Text style={styles.infoLabel}>Domicilio</Text>
          {isEditing ? (
            <Input
              value={tempProfile.domicilio}
              onChangeText={(domicilio) => setTempProfile({ ...tempProfile, domicilio })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.infoValue}>{profile.domicilio}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <Button style={styles.editButton} onPress={handleApplyChanges}>
                Aplicar cambios
              </Button>
              <Button
                style={styles.backButton}
                appearance="outline"
                status="danger"
                onPress={handleCancel}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button style={styles.editButton} onPress={handleEdit}>
              Editar datos
            </Button>
          )}
        </View>
      </Layout>
    </Layout>
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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#800000',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    flex: 2,
  },
  input: {
    flex: 2,
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  backButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#800000',
  },
  buttonText: {
    color: '#fff',
  },
});

export default ProfileScreen;
