import React, {useState} from 'react';
import { Button, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {

    const [showText, setShowText] = useState(false);
    const [formText, setFormText] = useState('');
    const [formTextPassword, setFormTextPassword] = useState('');


    function onChangeText(ev: any) : void {
      setFormText(ev?.target?.value);
    }

    function handlePasswordChange(ev: any ) : void {
      setFormTextPassword(ev?.target?.value);
    }

    function goToLogin() : void {
      navigation.navigate('TabTwo', { name: 'Christian' })
    }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Login example</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Button
          onPress={()=> setShowText(!showText)}
          title={(showText ? 'Hide':'Show') + ' Form'}
          color="#841584" />
          <View style={showText ? styles.show : styles.hide}>
            <Text style={styles.title}>Sample App</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={formText}
              placeholder="Username"
            />
            <TextInput secureTextEntry={true} style={styles.input} value={formTextPassword} onChangeText={handlePasswordChange} />
            <View style={styles.loginInput}>
              <Button
                onPress={goToLogin}
                title= 'Login'
                color="#333" />
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  show: {
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  input: {
    flex:1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height:40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginInput: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default TabOneScreen;