import React, {useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useRoute, useNavigation, CommonActions} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import SubjectsListScreen from '../../components/screens/SubjectsListScreen';
import {Subject} from '../../../domain/entities/subjectsResponse';

type PendingSubjectsToGraduateRouteProp = RouteProp<
  RootStackParams,
  'PendingSubjectsToGraduate'
>;

export const PendingSubjectsToGraduateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<PendingSubjectsToGraduateRouteProp>();
  const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);

  useEffect(() => {
    if (route.params?.career?.id) {
      setSelectedCareerId(route.params.career.id);
    }
  }, [route.params]);

  const handlePressItem = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SideMenuNavigator'}],
      }),
    );
  };

  const endpoint = selectedCareerId
    ? `/estudiantes/${selectedCareerId}/asignaturas-pendientes`
    : '';

  return (
    <SubjectsListScreen
      endpoint={endpoint}
      headerText="Asignaturas Pendientes para Graduación"
      iconName="home-outline"
      onPress={handlePressItem}
    />
  );
};
