import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import {Content} from '../../../domain/entities/careersListResponse';
import CareersScreen from '../../components/screens/CareersScreen';

type EnrolledCareersForExamScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'AvailableSubjectsForExamScreen'
>;

const EnrolledCareersForExamScreen = () => {
  const navigation = useNavigation<EnrolledCareersForExamScreenNavigationProp>();

  const handlePressItem = (item: Content) => {
    navigation.navigate('AvailableSubjectsForExamScreen', {career: item});
  };

  return (
    <CareersScreen
      endpoint="estudiantes/carreras-inscripto"
      headerText="Carreras Activas"
      iconName="file-text-outline"
      onPress={handlePressItem}
      showHeader={true}
    />
  );
};

export default EnrolledCareersForExamScreen;
