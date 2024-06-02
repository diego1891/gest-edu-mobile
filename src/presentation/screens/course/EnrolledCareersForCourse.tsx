import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import {Content} from '../../../domain/entities/careersListResponse';
import CareersScreen from '../../components/screens/CareersScreen';

type EnrolledCareersForCourseScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'AvailableSubjectsForCourseScreen'
>;

const EnrolledCareersForExamScreen = () => {
  const navigation = useNavigation<EnrolledCareersForCourseScreenNavigationProp>();

  const handlePressItem = (item: Content) => {
    navigation.navigate('AvailableSubjectsForCourseScreen', {career: item});
  };

  return (
    <CareersScreen
      endpoint="estudiantes/carreras-inscripto"
      headerText="Carreras Activas"
      iconName="file-text-outline"
      onPress={handlePressItem}
    />
  );
};

export default EnrolledCareersForExamScreen;
