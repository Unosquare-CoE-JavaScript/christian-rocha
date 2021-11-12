import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { CustomButton, CustomImage, CustomInput, CustomText } from './Components/CustomGlobalComponents';

import styles from './styles';

export default function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const printUsernameValue = () => {
    console.log('username ' + username.toLocaleLowerCase());
    console.log('password ' + password.toLocaleLowerCase());
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView style={styles.container }>
        <CustomText style={styles.customTextMargin}>Welcome to the testing App.</CustomText>
        <CustomImage source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}/>
        <CustomInput placeholder='User' left='account-circle' value={username} changeValue={setUsername} />
        <CustomInput placeholder='Password' secureTextEntry={true} left='lock' value={password} changeValue={setPassword} />
        <CustomButton
          onClick={printUsernameValue} 
          title={'testing'}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

