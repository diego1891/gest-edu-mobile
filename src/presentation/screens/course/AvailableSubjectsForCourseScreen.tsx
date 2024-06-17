import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import SubjectsListScreen from '../../components/screens/SubjectsListScreen';
import { Subject } from '../../../domain/entities/subjectsResponse';
import { gestEduApi } from '../../../config/api/GestEduApi';
import { CourseResponse } from '../../../domain/entities/courseResponse';

type AvailableSubjectsForCourseScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'SubjectCourseScreen'
>;
type AvailableSubjectsForCourseScreenRouteProp = RouteProp<
  RootStackParams,
  'AvailableSubjectsForCourseScreen'
>;

export const AvailableSubjectsForCourseScreen = () => {
  const navigation = useNavigation<AvailableSubjectsForCourseScreenNavigationProp>();
  const route = useRoute<AvailableSubjectsForCourseScreenRouteProp>();
  const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);

  useEffect(() => {
    if (route.params?.career?.id) {
      setSelectedCareerId(route.params.career.id);
      //fetchSubjects();
    }

  }, [route.params]);

  
  const endpoint = selectedCareerId
    ? `/estudiantes/${selectedCareerId}/asignaturas-pendientes`
    : '';


 /* const fetchSubjects = async () => {
    try {
      const response = await gestEduApi.get<CourseResponse>(`/estudiantes/${selectedCareerId}/cursos-activos`);
      setSubjectId(response.data.asignaturaId);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
*/
  const handlePressItem = (item: Subject) => {
    navigation.navigate('SubjectCourseScreen',  { subject: item });
  };

  return (
    <SubjectsListScreen
      endpoint={endpoint}
      headerText="Asignaturas con cursos disponibles"
      iconName="file-text-outline"
      onPress={handlePressItem}
    />
  );
};
