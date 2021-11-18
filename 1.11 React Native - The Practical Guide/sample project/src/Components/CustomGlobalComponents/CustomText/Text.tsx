import React from 'react';
import { Text } from 'react-native';

type ButtonProps = {
  style?: object,
  children: string | object
}

const CustomText = (props: ButtonProps) => {
  return (
    <Text style={{...props.style}}>{props.children}</Text>
  )
}

export default CustomText;