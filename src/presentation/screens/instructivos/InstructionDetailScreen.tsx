import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useRoute, RouteProp, useNavigation, CommonActions} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {guides} from '../../../domain/entities/guides';
import { MyIcon } from '../../components/ui/MyIcon';

type InstructionDetailScreenRouteProp = RouteProp<
  RootStackParams,
  'InstructionDetail'
>;

const InstructionDetailScreen = () => {
  const route = useRoute<InstructionDetailScreenRouteProp>();
  const guideId = route.params?.guideId;
  const guide = guides.find(g => g.id === guideId);
  const nav = useNavigation();

  const handleLogoPress = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      }),
    );
  };

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
      <ScrollView style={styles.container}>
        {guide?.steps.map(step => (
          <View key={step.id} style={styles.step}>
            {/* <Image source={step.image} style={styles.stepImage} /> */}
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#802C2C',
    padding: 16,
  },
  step: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  stepImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
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

export default InstructionDetailScreen;
