import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Text, Layout, Spinner, Icon} from '@ui-kitten/components';
import {gestEduApi} from '../../../config/api/GestEduApi';
import {
  ExamResponse,
  Content as ExamContent,
} from '../../../domain/entities/examResponse';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {CreateInscripcionExamenDTO} from '../../../domain/entities/InscripcionExamenDto';
import axios from 'axios';
import CustomAlert from '../../components/cards/CustomAlert';

type ExamsScreenRouteProp = RouteProp<RootStackParams, 'ExamsScreen'>;

const ExamsScreen = () => {
  const route = useRoute<ExamsScreenRouteProp>();
  const [exams, setExams] = useState<ExamContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    icon: '',
  });

  const handleLogoPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SideMenuNavigator'}],
      }),
    );
  };

  const handleOnClose = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SideMenuNavigator'}],
      }),
    );
    setIsAlertVisible(false);
  };

  const handleInscription = async (id: number) => {
    try {
      const inscripcionExamenDto: CreateInscripcionExamenDTO = {
        examenId: id,
      };
      console.log(inscripcionExamenDto);

      const response = await gestEduApi.post(
        `/examenes/inscribirse`,
        inscripcionExamenDto,
      );
      setAlertData({
        title: 'Inscripción exitosa',
        message: 'Se ha inscripto correctamente al examen',
        icon: 'checkmark-outline',
      });
      setIsAlertVisible(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || 'No se pudo inscribir al examen'; //COMO AGARRAR MSJ DE ERROR DE LA API IMPORTANTE
        setAlertData({
          title: 'Error',
          message: errorMessage,
          icon: 'alert-triangle-outline',
        });
        setIsAlertVisible(true);
      } else {
        setAlertData({
          title: 'Error',
          message: 'No se pudo inscribir al examen',
          icon: 'alert-triangle-outline',
        });
        setIsAlertVisible(true);
      }
    }
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await gestEduApi.get<ExamResponse>(
          `/asignaturas/${route.params.subject.id}/examenesVigentes`,
        );
        setExams(response.data.content);
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [route.params.subject.id]);

  const renderExamItem = ({item}: {item: ExamContent}) => (
    <View style={styles.examItem}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="calendar-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>
            {new Date(item.fecha).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="book-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Asignatura:</Text>
          <Text style={styles.value}>{item.asignatura.nombre}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="person-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Docentes:</Text>
          <View style={styles.docentesContainer}>
            {item.docentes.map(docente => (
              <Text key={docente.id} style={styles.docenteText}>
                {docente.nombre} {docente.apellido}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          handleInscription(item.id);
        }}>
        <Icon name="plus-circle-outline" style={styles.icon} fill="#802C2C" />
      </TouchableOpacity>
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
          <Text style={styles.headerText}>Exámenes Disponibles</Text>
        </View>
        <FlatList
          data={exams}
          renderItem={renderExamItem}
          keyExtractor={item => item.id.toString()}
        />
        <CustomAlert
        isVisible={isAlertVisible}
        onClose={handleOnClose }
        title={alertData.title}
        message={alertData.message}
        iconName={alertData.icon}
      />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#802C2C',
    padding: 10,
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
  examItem: {
    backgroundColor: '#fff',
    padding: 25,
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
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginLeft: 16,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 7,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#802C2C',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 2,
  },
  docentesContainer: {
    flex: 2,
  },
  docenteText: {
    fontSize: 16,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ExamsScreen;
