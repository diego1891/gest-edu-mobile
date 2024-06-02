import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { useEffect, PropsWithChildren } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({children}: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const {status} = useAuthStore();


    useEffect(() => {
        if(status != 'checking') {
            if(status == 'unauthenticated') {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}]
                })
            }
        }

    },[status])


  return (
    <>{children}</>
  )
}


