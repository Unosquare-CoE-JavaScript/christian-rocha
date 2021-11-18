import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {defaultAction} from '../../../Redux/Actions/defaultAction';
import { CustomButton, CustomImage, CustomInput, CustomText } from '../../CustomGlobalComponents';

import axios from '../../../Configs/AxiosConfig';

import styles from './styles';

type LoginProps = {
  navigation?: any,
  username?: string,
  password?: string,
  dispatch: Function
}

const Login = (props: LoginProps) => {
  const { navigation, dispatch } = props;

  const defaultUsername = props.username || '';
  const defaultPassword = props.password || '';
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);

  /**
   * Change this function for the real functionality or replace it.
   */
  const doLogin = async () => {
    const payload = {
      username: username.toLocaleLowerCase(),
      password: password.toLocaleLowerCase()
    };
    dispatch(defaultAction(payload))
    const status = await axios.post('login', payload)
    console.log(status.data);
    //navigation.replace('Login')}
  }


  return (
    <View style={styles.container}>
      <CustomText style={styles.customTextMargin}>Welcome to the testing App.</CustomText>
      <CustomText style={styles.customTextMargin}>Username: {props.username}</CustomText>
      <CustomImage source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}/>
      <CustomInput placeholder='User' left='account-circle' value={username} changeValue={setUsername} />
      <CustomInput placeholder='Password' secureTextEntry={true} left='lock' value={password} changeValue={setPassword} />
      <CustomButton
        onClick={doLogin}
        title={'Login'}
      />
    </View>
  )
}


let mapStateToProps = (state: any) => {
  const {username, password } = state.defaultReducer;
  return {
    username, 
    password
  }
};

export default connect(mapStateToProps)(Login);