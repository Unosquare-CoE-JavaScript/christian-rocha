import React from 'react';
import { Pressable , Text } from 'react-native';

import { DEFAULT_COMPONENT_BACKGROUND_COLOR, 
         DEFAULT_BUTTON_RIPPLE_COLOR, 
         DEFAULT_BUTTON_WIDTH, 
         DEFAULT_BUTTON_FONT_COLOR } from '../../../config';

import styles from './styles';

type ButtonProps = {
  onClick: Function,
  title: string,
  style?: object,
  color?: string,
  backgroundOnClick? : string,
  textStyle?: object
}

const CustomButton = (props: ButtonProps) => {
  const rippleColor = props.backgroundOnClick || DEFAULT_BUTTON_RIPPLE_COLOR;

  return (
    <Pressable style={{...styles.button, ...props.style}}
    onPress={() => props.onClick()}
    android_ripple={{color: rippleColor}}>
      <Text style={{...styles.buttonText, ...props.textStyle}}>{props.title}</Text>
    </Pressable >
  )
}

export default CustomButton;