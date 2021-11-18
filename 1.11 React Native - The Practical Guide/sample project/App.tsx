import React from 'react';
import { Provider } from 'react-redux';
import { ScrollView } from 'react-native';
import { createStore } from 'redux';

import reducers from './src/Redux/Reducers';

import Navigator from './src/Components/General/Navigator';
import styles from './styles';

const store = createStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow: 1}} style={styles.container}>
        <Navigator />
      </ScrollView>
    </Provider>
  );
}

