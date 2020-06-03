import React, {Component} from 'react';
import {StyleSheet,Text, View,StatusBar} from 'react-native';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
global.serverURL ='https://alrayamis.com/';
global.RecordToshow =10; 
import Main from "./src/Main";
import persist from "./src/config/store";
import { YellowBox } from 'react-native';
const persistStore = persist();
YellowBox.ignoreWarnings(['Remote debugger']);
console.disableYellowBox = true;
export default function App() {

    return (

      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
            <Main />
        </PersistGate>
      </Provider>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
