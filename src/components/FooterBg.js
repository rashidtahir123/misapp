import React, { Component } from 'react';
import {
ImageBackground
} from 'react-native';

export default class FooterBg extends Component<{}> {
	render(){
		return(
      <ImageBackground style={{width:'100%',height:100}}  source={require("../images/footer.png")}>
      </ImageBackground>
			)
	}
}
