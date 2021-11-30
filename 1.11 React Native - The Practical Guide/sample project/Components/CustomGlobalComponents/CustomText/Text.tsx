import React from 'react';
import { Text } from 'react-native';

import {  } from '../../../config';


type ButtonProps = {
  style?: object,
  children: string
}

const CustomText = (props: ButtonProps) => {
  return (
    <Text style={{...props.style}}>{props.children}</Text>
  )
}

export default CustomText;