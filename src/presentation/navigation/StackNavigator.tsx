import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { SideMenuNavigator } from './SideMenuNavigator';
import { Content } from '../../domain/entities/careersListResponse';
import { CareerDetailScreen } from '../screens/careers/CareerDetailScreen';
import EnrolledCareersScreen from '../screens/careers/EnrolledCareersScreen';
import { AvailableSubjectsForExamScreen } from '../screens/exam/AvailableSubjectsForExamScreen';
import ExamsScreen from '../screens/exam/ExamsScreen';
import { Subject } from '../../domain/entities/subjectsResponse';
import EnrolledCareersForExamScreen from '../screens/exam/EnrolledCareersForExamScreen';
import UnenrolledCareersScreen from '../screens/careers/UnenrolledCareersScreen';
import { PendingSubjectsToGraduateScreen } from '../screens/subjects/PendingSubjectsToGraduateScreen';
import EnrolledExamsScreen from '../screens/exam/EnrolledExamsScreen';
import InstructionDetailScreen from '../screens/instructivos/InstructionDetailScreen';
import InstructionsScreen from '../screens/instructivos/InstructionsScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SideMenuNavigator: undefined;
  CareersScreen: undefined;
  CareerDetail: { career: Content };
  EnrolledCareers: undefined;
  UnenrolledCareers: undefined;
  AvailableSubjectsForExamScreen: { career: Content };
  ExamsScreen: { subject: Subject};
  AvailableSubjectsForCourseScreen: { career: Content };
  EnrolledCareersForExam: undefined;
  PendingSubjectsToGraduate: { career: Content };
  EnrolledExams: undefined;
  InstructionDetail: { guideId: string };
  Instruction: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SideMenuNavigator" component={SideMenuNavigator} />
      <Stack.Screen name="UnenrolledCareers" component={UnenrolledCareersScreen} />
      <Stack.Screen name="CareerDetail" component={CareerDetailScreen} />
      <Stack.Screen name="PendingSubjectsToGraduate" component={PendingSubjectsToGraduateScreen} />
      <Stack.Screen name="EnrolledCareers" component={EnrolledCareersScreen} />
      <Stack.Screen name="EnrolledCareersForExam" component={EnrolledCareersForExamScreen} />
      <Stack.Screen name="AvailableSubjectsForExamScreen" component={AvailableSubjectsForExamScreen} />
      <Stack.Screen name="ExamsScreen" component={ExamsScreen} />
      <Stack.Screen name="EnrolledExams" component={EnrolledExamsScreen} />
      <Stack.Screen name="InstructionDetail" component={InstructionDetailScreen} />
      <Stack.Screen name="Instruction" component={InstructionsScreen} />
    </Stack.Navigator>
  );
};
