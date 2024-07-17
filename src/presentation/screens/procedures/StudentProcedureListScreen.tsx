import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {Text, Layout, Spinner, Icon} from '@ui-kitten/components';
import {gestEduApi} from '../../../config/api/GestEduApi';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {Tramite} from '../../../domain/entities/procedureResponse';
import { MyIcon } from '../../components/ui/MyIcon';
import CustomAlert from '../../components/cards/CustomAlert';

type StudentProcedureListScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'StudentProcedureList'
>;


const StudentProcedureListScreen = () => {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<StudentProcedureListScreenNavigationProp>();
  const nav = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    icon: '',
  });

  const handleLogoPress = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      }),
    );
  };

  const handleOnClose = () => { 
    
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      })
    );
    setIsAlertVisible(false);

   };


  useEffect(() => {
    const fetchTramites = async () => {
      try {
        const response = await gestEduApi.get('/tramites/tramites-estudiante');
        setTramites(response.data);
      } catch (error) {
        console.error('Error fetching tramites:', error);
        setAlertData({
          title: 'Error',
          message: 'Ocurrió un error al obtener los trámites.',
          icon: "alert-triangle-outline" ,
        });
        setIsAlertVisible(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTramites();
  }, []);

  const renderTramiteItem = ({item}: {item: Tramite}) => (
    <View style={styles.tramiteItem}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="clipboard-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Tipo: {item.tipo}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="book-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Carrera: {item.nombreCarrera}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>
            Fecha de Creación:{' '}
            {new Date(item.fechaCreacion).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="clock-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Estado: {item.estado}</Text>
        </View>
      </View>
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
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MyIcon name="corner-down-left-outline" color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={handleLogoPress}>
          <Image
            source={require('../../../assets/logo/gestEdu1.png')}
            style={styles.logo2}
          />
        </TouchableOpacity>
      </View>
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Trámites del Estudiante</Text>
        </View>
        <FlatList
          data={tramites}
          renderItem={renderTramiteItem}
          keyExtractor={item => item.id.toString()}
        />
        <CustomAlert
        isVisible={isAlertVisible}
        onClose={handleOnClose }
        title={alertData.title}
        message={alertData.message}
        iconName={alertData.icon}
      />
      </Layout>
    </>
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
  tramiteItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
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
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo2: {
    width: 210,
    height: 40,
  },
});

export default StudentProcedureListScreen;
