import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Content} from '../../../domain/entities/careersListResponse';
import CareersScreen from '../../components/screens/CareersScreen';
import {useState} from 'react';
import { gestEduApi } from '../../../config/api/GestEduApi';
import { Alert } from 'react-native';
import axios from 'axios';

type TitleRequestRouteProp = RouteProp<RootStackParams, 'TitleRequest'>;

type TitleRequestScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'TitleRequest'
>;

const TitleRequestScreen = () => {
  const navigation = useNavigation<TitleRequestScreenNavigationProp>();
  const route = useRoute<TitleRequestRouteProp>();
  const [loading, setLoading] = useState(false);

  const handlePressItem = async (item: Content) => {
    setLoading(true);
    try {
      const response = await gestEduApi.post('/tramites/nuevo-tramite', null, {
        params: {
          carreraId: item.id,
          tipoTramite: 'SOLICITUD_DE_TITULO',
        },
      });
      if (response.status === 200) {
        Alert.alert('Solicitud exitosa');
      } else {
        Alert.alert('Error', 'No se pudo completar la inscripción.');
      }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.message || 'No se pudo inscribir al examen'; //COMO AGARRAR MSJ DE ERROR DE LA API IMPORTANTE
            Alert.alert('Error', errorMessage, [
              { text: 'OK'},
            ]);
        }
    } finally {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      });
    }
  };

  return (
    <CareersScreen
      endpoint="estudiantes/carreras-inscripto"
      headerText="Carreras Inscritas"
      iconName="award-outline"
      onPress={handlePressItem}
      showHeader={true}
    />
  );
};

export default TitleRequestScreen;
