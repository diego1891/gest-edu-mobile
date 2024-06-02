import Icon from "@react-native-vector-icons/material-icons";

interface MyIconProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export const MyIcon: React.FC<MyIconProps> = ({ name, size = 24, color = '#000', onPress }) => {
  return <Icon name={name} size={size} color={color} onPress={onPress} />;
};
