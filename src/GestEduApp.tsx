import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { SideMenuNavigator } from './presentation/navigation/SideMenuNavigator';
import axios from 'axios';
import { gestEduApi } from './config/api/GestEduApi';

export const GestEduApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
            {/* <SideMenuNavigator /> */}
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
