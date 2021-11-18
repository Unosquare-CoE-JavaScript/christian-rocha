import React from 'react';
import { Image } from 'react-native';


import styles from './styles';

type customProps = {
  style?: object,
  source: object
}

const CustomImage = (props: customProps) => {

  return (
    <Image
          {...props}
          style={{...styles.tinyLogo, ...props.style}}
        />
  )
}

export default CustomImage;