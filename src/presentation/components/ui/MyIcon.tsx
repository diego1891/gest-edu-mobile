import { Icon, useTheme } from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
  onPress?: () => void;
}

export const MyIcon = ({name, color, white = false, onPress }: Props) => {

  const theme = useTheme();

  if(white) {
    color = theme['color-info-100']
  }else if (!color){
    color = theme ['text-basic-color']
  }else{
    color = theme[color]
  }

  return (
    <View>
      <Icon style={styles.icon} fill='#802C2C' name={name} onPress={onPress ? () => onPress() : undefined}/>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 32,
  }
})