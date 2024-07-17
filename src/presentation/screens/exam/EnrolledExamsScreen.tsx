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
import {CommonActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';

const EnrolledExamsScreen = () => {
  const [exams, setExams] = useState<ExamContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  const handleLogoPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SideMenuNavigator'}],
      }),
    );
  };

  const handleUnsubscribe = async (id: number) => {
    try {
      const url = `/examenes/${id}/baja`;      
      const response = await gestEduApi.delete(url);
     
      Alert.alert(
        'Desinscripción exitosa',
        'Se ha desinscrito correctamente del examen',
        [
          {
            text: 'OK',
            onPress: () => {
              handleLogoPress();
            },
          },
        ],
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'No se pudo desinscribir del examen';
        Alert.alert('Error', errorMessage, [
          { text: 'OK' },
        ]);
      } else {
        Alert.alert('Error', 'No se pudo desinscribir del examen', [
          { text: 'OK' },
        ]);
      }
    }
  };

  useEffect(() => {
    const fetchEnrolledExams = async () => {
      try {
        const response = await gestEduApi.get<ExamResponse>(
          `/estudiantes/inscripto`,
        );
        setExams(response.data.content);
      } catch (error) {
        console.error('Error fetching enrolled exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledExams();
  }, []);

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
          handleUnsubscribe(item.id);
        }}>
        <Icon name="minus-circle-outline" style={styles.icon} fill="#802C2C" />
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
          <Text style={styles.headerText}>Exámenes Inscritos</Text>
        </View>
        {exams.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No hay exámenes en los que estés inscripto</Text>
          </View>
        ) : (
          <FlatList
            data={exams}
            renderItem={renderExamItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
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
  examItem: {
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default EnrolledExamsScreen;