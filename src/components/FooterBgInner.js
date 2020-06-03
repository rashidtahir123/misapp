import React, { Component } from 'react';
import {
ImageBackground
} from 'react-native';

export default class FooterBgInner extends Component<{}> {
	render(){
		return(
      <ImageBackground style={{width:'100%',height:55}}  source={require("../images/footer-inner.png")}>
      </ImageBackground>
			)
	}
}
