import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {Guide, guides} from '../../../domain/entities/guides';

type InstructionsScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'InstructionDetail'
>;

const InstructionsScreen = () => {
  const navigation = useNavigation<InstructionsScreenNavigationProp>();
  const nav = useNavigation();

  const handleLogoPress = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SideMenuNavigator'}],
      }),
    );
  };

  const renderItem = ({item}: {item: Guide}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('InstructionDetail', {guideId: item.id})
      }>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={handleLogoPress}>
          <Image
            source={require('../../../assets/logo/gestEdu1.png')}
            style={styles.logo2}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={guides}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#802C2C',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    color: '#f0f0f0',
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

export default InstructionsScreen;
