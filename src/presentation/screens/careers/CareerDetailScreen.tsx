import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Layout, Button, Icon, Spinner } from '@ui-kitten/components';
import { RouteProp, useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { gestEduApi } from '../../../config/api/GestEduApi';
import CustomAlert from '../../components/cards/CustomAlert';

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
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    icon: '',
  });

  const handleOnClose = () => { 
    
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      })
    );
    setIsAlertVisible(false);

   };

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
        setAlertData({
          title: 'Solicitud exitosa',
          message: 'Se ha enviado la solicitud de inscripción a la carrera.',
          icon: "checkmark-circle-2-outline",
        });
        setIsAlertVisible(true);
      } else {
        setAlertData({
          title: 'Error',
          message: 'No se pudo completar la inscripción.',
          icon: "alert-triangle-outline" ,
        });
        setIsAlertVisible(true);
      }
    } catch (error) {
      console.error('Error durante la inscripción:', error);
      setAlertData({
        title: 'Error',
        message: 'Ocurrió un error durante la inscripción.',
        icon: "alert-triangle-outline",
      });
      setIsAlertVisible(true);
    } finally {
      setLoading(false);
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
      <CustomAlert
        isVisible={isAlertVisible}
        onClose={handleOnClose }
        title={alertData.title}
        message={alertData.message}
        iconName={alertData.icon}

      />
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
