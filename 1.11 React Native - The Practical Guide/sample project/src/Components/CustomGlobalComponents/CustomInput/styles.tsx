import { StyleSheet } from "react-native";

import {DEFAULT_COMPONENT_BACKGROUND_COLOR} from '../../../Configs/Constants/config';

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    borderWidth: 1,
    width: '70%',
    height:50,
    paddingHorizontal: 10,
    marginHorizontal: '15%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: DEFAULT_COMPONENT_BACKGROUND_COLOR
  }
});


export default styles;