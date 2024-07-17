import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import {Content} from '../../../domain/entities/careersListResponse';
import CareersScreen from '../../components/screens/CareersScreen';

type EnrolledCareersScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'Escolaridad'
>;

const EnrolledCareersForEscolaridadScreen = () => {
  const navigation = useNavigation<EnrolledCareersScreenNavigationProp>();

  const handlePressItem = (item: Content) => {
    navigation.navigate('Escolaridad', {career: item});
  };

  return (
    <CareersScreen
      endpoint="estudiantes/carreras-inscripto"
      headerText="Carreras Inscritas"
      iconName="file-text-outline"
      onPress={handlePressItem}
      showHeader={true}
    />
  );
};

export default EnrolledCareersForEscolaridadScreen;
