import React, { Component } from 'react';
import {
ImageBackground
} from 'react-native';

export default class HeaderBg extends Component<{}> {
	render(){
		return(
      <ImageBackground style={{width:'100%',height:100}}  source={require("../images/content-header.png")}>
      </ImageBackground>
			)
	}
}
