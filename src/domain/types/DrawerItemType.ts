import { RootStackParams } from "../../presentation/navigation/StackNavigator";

export type DrawerItemType = {
    label: string;
    screen?: keyof RootStackParams;
    children?: DrawerItemType[];
  };