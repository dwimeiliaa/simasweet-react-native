/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import {
  List
} from "./components/ListGraphQL";
import {
  Notif
} from "./components/Notif";


class App extends Component {
  state = {
	  refresh: true
  }
  constructor(){
	super()
  	this.state={
	  refresh: true,
          time: Date.now()
  	}
  }
  render(){	
  return (
    <View
	  style={{backgroundColor: "#fff"}}
	  onPress={()=>{
		  this.render()
	  }}
	  >
	<Notif style={{justifyContent: 'center',
                alignItems: 'center',
	} }/>
      <List/>
    </View>
  );
  }
};
export default App;
