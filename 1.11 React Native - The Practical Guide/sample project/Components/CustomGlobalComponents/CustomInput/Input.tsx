import React from 'react';

import { TextInput } from 'react-native-paper';
import { DEFAULT_OPTIONAL_COLOR, DEFAULT_FONT_COLOR } from '../../../config';
import styles from './styles';

type customProps = {
  style?: object,
  placeholder: string,
  secureTextEntry?: boolean,
  right?: string,
  left?: string,
  value: any,
  changeValue: Function
}

const CustomInput = (props: customProps) => {
  return (
    <TextInput {...props} 
      // onPressIn={() => {}}
      // onPressOut={()=>{}}
      value={props.value}
      onChangeText={(value) => props.changeValue(value)}
      style={{...styles.inputContainer, ...props.style}} 
      placeholder={props.placeholder} 
      right={props.right ? <TextInput.Icon name={props.right} /> : <></>}
      left={props.left ? <TextInput.Icon name={props.left} color={DEFAULT_FONT_COLOR}  /> : <></>}
      activeUnderlineColor={DEFAULT_OPTIONAL_COLOR}
      selectionColor={DEFAULT_FONT_COLOR}
      />
  )
}

export default CustomInput;