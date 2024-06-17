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
import EnrolledCoursesScreen from '../screens/course/EnrolledCoursesScreen';
import EnrolledCareersForCertificateScreen from '../screens/careers/EnrolledCareersForCertificateScreen';
import ContactScreen from '../screens/contact/ContactScreen';

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
    { label: 'Carreras Inscriptas', screen: 'EnrolledCareersForCertificateScreen' },
    { label: 'Generar Escolaridad', screen: 'EnrolledCareersForEscolaridadScreen'}

  ],
  },
  {label: 'Asignaturas', children: [ 
    { label: 'Inscribirse a Curso', screen: 'EnrolledCareersForCourse' },
    { label: 'Mis Cursos Activos', screen: 'EnrolledCourses'}
  ],
  },

  {
    label: 'Examenes',
    children: [
      { label: 'Inscribirse a Examen', screen: 'EnrolledCareersForExam' },
       { label: 'Darse de Baja de Examen', screen: 'EnrolledExams' },
    ],
  },
  {label: 'Tramites', children: [ 
    { label: 'Solicitar Titulo', screen: 'TitleRequest'},
    { label: 'Ver estado de mis tramites', screen: 'StudentProcedureList'}
  ],
  },
  {label: 'Notificaciones', screen: 'notifications'},
  {label: 'Contacto', screen: 'Contact'}


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
      <Drawer.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
    </Drawer.Navigator>
  );
};
