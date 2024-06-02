import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from './StackNavigator';
import { StorageAdapter } from '../../config/adapters/storage';
import { useNavigation } from '@react-navigation/native';

type DrawerItemType = {
  label: string;
  screen?: keyof RootStackParams;
  children?: DrawerItemType[];
};

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  drawerItems: DrawerItemType[];
  setDrawerItems: React.Dispatch<React.SetStateAction<DrawerItemType[]>>;
}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleLogout = async () => {
    await StorageAdapter.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const handleItemPress = (item: DrawerItemType) => {
    if (item.children) {
      props.setDrawerItems(item.children);
    } else if (item.screen) {
      props.navigation.navigate(item.screen);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo/gestEdu2.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        {props.drawerItems.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            onPress={() => handleItemPress(item)}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <Button style={styles.logoutButton} onPress={handleLogout}>
          Cerrar sesión
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#802C2C',
    marginBottom: 20,
  },
  logo: {
    width: 112,
    height: 100,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#802C2C',
  },
  drawerLabel: {
    color: '#802C2C',
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#802C2C',
    borderColor: '#802C2C',
  },
});

export default CustomDrawerContent;
