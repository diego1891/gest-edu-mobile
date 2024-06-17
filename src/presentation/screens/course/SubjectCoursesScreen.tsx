import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text, Layout, Spinner, Icon } from '@ui-kitten/components';
import { gestEduApi } from '../../../config/api/GestEduApi';
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { CourseResponse } from '../../../domain/entities/CourseResponse';
import axios from 'axios';

type SubjectCourseScreenRouteProp = RouteProp<RootStackParams, 'SubjectCourseScreen'>;

const SubjectCourseScreen = () => {
  const route = useRoute<SubjectCourseScreenRouteProp>();
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState();
  const navigation = useNavigation();

  const handleLogoPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SideMenuNavigator'}],
      }),
    );
  };


  const handleInscription = async (id: number) => {
    try {
      const inscripcionCursoDto = {
        cursoId: route.params.subject.id,
      };
      console.log(inscripcionCursoDto);
      

      const response = await gestEduApi.post(
        `/inscripcionCurso`,
        inscripcionCursoDto,
      );

      Alert.alert(
        'Inscripción exitosa',
        'Se ha inscripto correctamente al curso',
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
        const errorMessage = error.response.data.message || 'No se pudo inscribir al curso';
        Alert.alert('Error', errorMessage, [
          { text: 'OK', onPress: () => { handleLogoPress(); }, }
        ]);
      } else {
        Alert.alert('Error', 'No se pudo inscribir al curso', [
          { text: 'OK' },
        ]);
      }
    }
  };

  useEffect(() => {
    console.log("ROUTE PARAM: " + route.params.subject.id);
    
    const fetchCourses = async () => {
      try {
        const response = await gestEduApi.get<CourseResponse[]>(
          `/inscripcionCurso/${route.params.subject.id}/cursos-disponibles`,
        );
        
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [route.params.subject.id]);

  const renderCourseItem = ({ item }: { item: CourseResponse }) => (
    <View style={styles.courseItem}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="calendar-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Inicio: {new Date(item.fechaInicio).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Fin: {new Date(item.fechaFin).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="clock-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Días previos de inscripción: {item.diasPrevInsc}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="info-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Estado: {item.estado}</Text>
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
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cursos Disponibles</Text>
      </View>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id.toString()}
      />
    </Layout>
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
  courseItem: {
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
  value: {
    fontSize: 16,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubjectCourseScreen;
