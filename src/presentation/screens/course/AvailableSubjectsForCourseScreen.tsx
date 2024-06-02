import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import SubjectsListScreen from '../../components/screens/SubjectsListScreen';
import { Subject } from '../../../domain/entities/subjectsResponse';

type AvailableSubjectsForExamScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'ExamsScreen'
>;
type AvailableSubjectsForExamScreenRouteProp = RouteProp<
  RootStackParams,
  'AvailableSubjectsForExamScreen'
>;

export const AvailableSubjectsForExamScreen = () => {
  const navigation = useNavigation<AvailableSubjectsForExamScreenNavigationProp>();
  const route = useRoute<AvailableSubjectsForExamScreenRouteProp>();
  const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);

  useEffect(() => {
    if (route.params?.career?.id) {
      setSelectedCareerId(route.params.career.id);
    }
  }, [route.params]);

  const handlePressItem = (item: Subject) => {
    //navigation.navigate('ExamsScreen',  { subject: item });
  };

  const endpoint = selectedCareerId
    ? `/estudiantes/${selectedCareerId}/asignaturas-a-examen`
    : '';

  return (
    <SubjectsListScreen
      endpoint={endpoint}
      headerText="Asignaturas Disponibles para Examen"
      iconName="file-text-outline"
      onPress={handlePressItem}
    />
  );
};
