import React, { Component } from 'react';
import {
ImageBackground
} from 'react-native';

export default class HeaderBgInner extends Component<{}> {
	render(){
		return(
      <ImageBackground style={{width:'100%',height:50}}  source={require("../images/content-header-inner.png")}>
      </ImageBackground>
			)
	}
}
