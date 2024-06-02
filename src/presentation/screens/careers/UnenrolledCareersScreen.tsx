import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useNavigation } from "@react-navigation/native";
import { Content } from "../../../domain/entities/careersListResponse";
import CareersScreen from "../../components/screens/CareersScreen";


type UnenrolledCareersScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'CareerDetail'
>;

const UnenrolledCareersScreen = () => {
  const navigation = useNavigation<UnenrolledCareersScreenNavigationProp>();

  const handlePressItem = (item: Content) => {
    navigation.navigate('CareerDetail', {career: item});
  };

  return (
    <CareersScreen
      endpoint="/estudiantes/carreras-no-inscripto"
      headerText="Selecciona la carrera"
      iconName="plus-circle-outline"
      onPress={handlePressItem}
      showHeader={true}
    />
  );
};

export default UnenrolledCareersScreen;
