import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Text, Layout, Icon, Spinner } from '@ui-kitten/components';
import { gestEduApi } from '../../../config/api/GestEduApi';
import { useNavigation } from '@react-navigation/native';
import { CompleteCourseResponse } from '../../../domain/entities/completeCourseResponse';

const EnrolledCoursesScreen = () => {
  const [courses, setCourses] = useState<CompleteCourseResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await gestEduApi.get<CompleteCourseResponse[]>(
          '/inscripcionCurso/cursos-inscripto',
        );
        setCourses(response.data);
      } catch (error) {
        Alert.alert('Error', error + ' Ocurrió un error al obtener los cursos.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleUnsubscribe = async (id: string) => {
    try {
      const response = await gestEduApi.delete(`/inscripcionCurso/${id}/eliminar`);
      if (response.status === 200) {
        Alert.alert('Baja exitosa', 'Se ha dado de baja del curso correctamente.');
        setCourses(courses.filter(course => course.cursoId !== id));
      } else {
        Alert.alert('Error', 'No se pudo dar de baja del curso.');
      }
    } catch (error) {
      console.error('Error durante la baja:', error);
      Alert.alert('Error', 'Ocurrió un error durante la baja.');
    }
  };

  const confirmUnsubscribe = (id: string) => {
    Alert.alert(
      'Confirmar baja',
      '¿Está seguro que desea darse de baja del curso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí', onPress: () => handleUnsubscribe(id) },
      ],
      { cancelable: false }
    );
  };

  const renderCourseItem = ({ item }: { item: CompleteCourseResponse }) => (
    <View style={styles.courseItem}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="book-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Asignatura: </Text>
          <Text style={styles.value}>{item.asignaturaNombre}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Inicio: </Text>
          <Text style={styles.value}>{new Date(item.fechaInicio).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Fin: </Text>
          <Text style={styles.value}>{new Date(item.fechaFin).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="person-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Docente: </Text>
          <Text style={styles.value}>{item.docenteNombre} {item.docenteApellido}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="info-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Estado: </Text>
          <Text style={styles.value}>{item.estado}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="clock-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.label}>Horarios:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.horarios.length === 0 ? (
              <Text style={styles.value}>No hay horarios ingresados</Text>
            ) : (
              item.horarios.map((horario, index) => (
                <Text key={index} style={styles.horarioText}>
                  {horario.dia}: {new Date(`1970-01-01T${horario.horaInicio}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(`1970-01-01T${horario.horaFin}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
      </View>
      {item.estado !== 'FINALIZADO' && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => confirmUnsubscribe(item.cursoId)}>
          <Icon name="minus-circle-outline" style={styles.icon} fill="#802C2C" />
        </TouchableOpacity>
      )}
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
        <Text style={styles.headerText}>Cursos Inscritos</Text>
      </View>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.cursoId.toString()}
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
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  horarios: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 7,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  horarioText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 5,
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 16,
    alignItems: 'center',
  },
});

export default EnrolledCoursesScreen;
