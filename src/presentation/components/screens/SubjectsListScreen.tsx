import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Layout, Icon, Spinner} from '@ui-kitten/components';
import {gestEduApi} from '../../../config/api/GestEduApi';
import {
  SubjectsResponse,
  Subject,
} from '../../../domain/entities/subjectsResponse';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {MyIcon} from '../ui/MyIcon';

interface SubjectsListScreenProps {
  endpoint: string;
  headerText: string;
  iconName?: string;
  onPress: (item: Subject) => void;
}

const SubjectsListScreen: React.FC<SubjectsListScreenProps> = ({
  endpoint,
  headerText,
  iconName,
  onPress,
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  const handleLogoPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SideMenuNavigator'}],
      }),
    );
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await gestEduApi.get<SubjectsResponse>(endpoint);
        setSubjects(response.data.content);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [endpoint]);

  const renderSubjectItem = ({item}: {item: Subject}) => (
    <View style={styles.subjectItem}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="hash-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>ID: #{item.id}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="book-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>{item.nombre}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="clipboard-outline" style={styles.icon} fill="#802C2C" />
          <Text style={styles.value}>Créditos: {item.creditos}</Text>
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
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
        {subjects.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No hay datos disponibles</Text>
          </View>
        ) : (
          <FlatList
            data={subjects}
            renderItem={renderSubjectItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
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
  subjectItem: {
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SubjectsListScreen;
