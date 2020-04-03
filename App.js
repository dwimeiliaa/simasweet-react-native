/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
  List
} from "./components/ListGraphQL";

const App: () => React$Node = () => {
  return (
    <View style={{backgroundColor: "#fff"}}>
      <List/>
    </View>
  );
};

export default App;
