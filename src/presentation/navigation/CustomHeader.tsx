import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions, DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { MyIcon } from '../components/ui/MyIcon';
import { RootStackParams } from './StackNavigator';

const CustomHeader = () => {
  const navigation = useNavigation();
  const nav = useNavigation<NavigationProp<RootStackParams>>();

  const handleLogoPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SideMenuNavigator' }],
      })
    );
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <MyIcon name="menu-outline" color="#000"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
        <Image source={require('../../assets/logo/gestEdu1.png')} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    height: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuIcon: {
    marginRight: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 210,
    height: 40,
  },
});

export default CustomHeader;
