import { StyleSheet } from "react-native";

import { DEFAULT_COMPONENT_BACKGROUND_COLOR, 
  DEFAULT_BUTTON_WIDTH, 
  DEFAULT_BUTTON_FONT_COLOR } from '../../../config';


const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    width: DEFAULT_BUTTON_WIDTH,
    backgroundColor: DEFAULT_COMPONENT_BACKGROUND_COLOR
  },
  buttonText: {
    color: DEFAULT_BUTTON_FONT_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  }
});


export default styles;