import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(

            <Text style={styles.logoText}>MIS SMART SERVICES</Text>
  		
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',

  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(0, 0, 0, 1)',
    top:10,
  }
});
