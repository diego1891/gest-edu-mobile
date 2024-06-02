import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Layout, Button, Icon, Spinner } from '@ui-kitten/components';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { gestEduApi } from '../../../config/api/GestEduApi';

type CareerDetailRouteProp = RouteProp<RootStackParams, 'CareerDetail'>;
type CareerDetailNavigationProp = StackNavigationProp<
  RootStackParams,
  'CareerDetail'
>;

export const CareerDetailScreen = () => {
  const route = useRoute<CareerDetailRouteProp>();
  const navigation = useNavigation<CareerDetailNavigationProp>();
  const { career } = route.params;
  const [loading, setLoading] = useState(false);

  const handleInscription = async () => {
    setLoading(true);
    try {
      const response = await gestEduApi.post('/tramites/nuevo-tramite', null, {
        params: {
          carreraId: career.id,
          tipoTramite: 'INSCRIPCION_A_CARRERA',
        },
      });
      if (response.status === 200) {
        Alert.alert('Inscripción exitosa');
      } else {
        Alert.alert('Error', 'No se pudo completar la inscripción.');
      }
    } catch (error) {
      console.error('Error durante la inscripción:', error);
      Alert.alert('Error', 'Ocurrió un error durante la inscripción.');
    } finally {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      });
    }
  };

  return (
    <Layout style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.idText}>#{career.id}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close-outline" style={styles.closeIcon} fill="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{career.nombre}</Text>
        <Text style={styles.description}>{career.descripcion}</Text>
        <Text style={styles.details}>
          Cantidad de créditos: <Text style={styles.bold}>{career.creditos}</Text>
        </Text>
        <Text style={styles.details}>
          Duración de la carrera (años):{' '}
          <Text style={styles.bold}>
            {career.duracionAnios} {career.duracionAnios === 1 ? 'Año' : 'Años'}
          </Text>
        </Text>
        {loading ? (
          <View style={styles.spinnerContainer}>
            <Spinner size="small" />
          </View>
        ) : (
          <Button style={styles.button} onPress={handleInscription}>
            Inscribirse
          </Button>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  idText: {
    fontSize: 18,
    color: '#802C2C',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
    marginTop: 16,
    alignSelf: 'center',
  },
  spinnerContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default CareerDetailScreen;
