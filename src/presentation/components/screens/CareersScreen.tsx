import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Layout, Icon, Spinner } from '@ui-kitten/components';
import { gestEduApi } from '../../../config/api/GestEduApi';
import { Content } from '../../../domain/entities/careersListResponse';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { MyIcon } from '../ui/MyIcon';

type EnrolledCareersScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'CareerDetail'
>;

interface CareersListScreenProps {
  endpoint: string;
  headerText: string;
  iconName: string;
  onPress: (item: Content) => void;
  showHeader: boolean;
}

const CareersScreen: React.FC<CareersListScreenProps> = ({
  endpoint,
  headerText,
  iconName,
  onPress,
  showHeader,
}) => {
  const [careers, setCareers] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<EnrolledCareersScreenNavigationProp>();
  const nav = useNavigation();

  const handleLogoPress = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      }),
    );
  };

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await gestEduApi.get(endpoint);
        setCareers(response.data.content);
      } catch (error) {
        console.error('Error fetching careers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [endpoint]);

  const renderCareerItem = ({ item }: { item: Content }) => (
    <View style={styles.careerItem}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="book-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>{item.nombre}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="clipboard-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Créditos: {item.creditos}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="clock-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Duración: {item.duracionAnios} {item.duracionAnios === 1 ? 'Año' : 'Años'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={() => onPress(item)}>
        <Icon name={iconName} style={styles.icon} fill="#802C2C" />
      </TouchableOpacity>
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
      {showHeader && (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MyIcon name="corner-down-left-outline" color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
            <Image source={require('../../../assets/logo/gestEdu1.png')} style={styles.logo2} />
          </TouchableOpacity>
        </View>
      )}

      <Layout style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
        <FlatList
          data={careers}
          renderItem={renderCareerItem}
          keyExtractor={item => item.id.toString()}
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
  careerItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  idText: {
    flex: 0.5,
  },
  titleText: {
    flex: 2,
  },
  creditsText: {
    flex: 1,
  },
  headerIcon: {
    flex: 0.5,
  },
});

export default CareersScreen;
