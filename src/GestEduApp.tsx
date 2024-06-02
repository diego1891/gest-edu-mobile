import 'react-native-gesture-handler';


import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {useColorScheme} from 'react-native';
import {AuthProvider} from './presentation/providers/AuthProvider';
import { SideMenuNavigator } from './presentation/navigation/SideMenuNavigator';

export const GestEduApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {/* <AuthProvider> */}
            <StackNavigator />
            {/* <SideMenuNavigator/> */}
          {/* </AuthProvider> */}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
