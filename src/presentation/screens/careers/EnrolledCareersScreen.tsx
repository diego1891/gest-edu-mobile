import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import {Content} from '../../../domain/entities/careersListResponse';
import CareersScreen from '../../components/screens/CareersScreen';

type EnrolledCareersScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'PendingSubjectsToGraduate'
>;

const EnrolledCareersScreen = () => {
  const navigation = useNavigation<EnrolledCareersScreenNavigationProp>();

  const handlePressItem = (item: Content) => {
    navigation.navigate('PendingSubjectsToGraduate', {career: item});
  };

  return (
    <CareersScreen
      endpoint="estudiantes/carreras-inscripto"
      headerText="Carreras Inscritas"
      iconName="search-outline"
      onPress={handlePressItem}
      showHeader={false}
    />
  );
};

export default EnrolledCareersScreen;
