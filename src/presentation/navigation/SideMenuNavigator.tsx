import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';
import CustomHeader from './CustomHeader';

import EnrolledCareers from '../screens/careers/EnrolledCareersScreen';
import UnenrolledCareersScreen from '../screens/careers/UnenrolledCareersScreen';
import EnrolledCareersForExamScreen from '../screens/exam/EnrolledCareersForExamScreen';
import { DrawerItemType } from '../../domain/types/DrawerItemType';

const Drawer = createDrawerNavigator();

const initialDrawerItems: DrawerItemType[] = [
  {
    label: 'Inicio',
    screen: 'HomeScreen',
  },
  { label: 'Perfil', screen: 'ProfileScreen' },

  {label: 'Carreras', children: [ 
    { label: 'Inscribirse a Carrera', screen: 'UnenrolledCareers' },
    { label: 'Asignaturas Pendientes Graduación', screen: 'EnrolledCareers'},
  ],
  },

  {
    label: 'Examenes',
    children: [
      { label: 'Inscribirse a Examen', screen: 'EnrolledCareersForExam' },
       { label: 'Darse de Baja de Examen', screen: 'EnrolledExams' },
    ],
  },

  // { label: 'Inscribirse a Carrera', screen: 'UnenrolledCareers' },
  // { label: 'Inscribirse a Curso', screen: 'EnrolledCareers' },
];

export const SideMenuNavigator = () => {
  const [drawerItems, setDrawerItems] = useState(initialDrawerItems);

  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          drawerItems={drawerItems}
          setDrawerItems={setDrawerItems}
        />
      )}
      screenOptions={{
        header: () => <CustomHeader />,
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="UnenrolledCareersScreen" component={UnenrolledCareersScreen} />
      <Drawer.Screen name="EnrolledCareers" component={EnrolledCareers} />
      <Drawer.Screen name="EnrolledCareersForExamScreen" component={EnrolledCareersForExamScreen} />
    </Drawer.Navigator>
  );
};
