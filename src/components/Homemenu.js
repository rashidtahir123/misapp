import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image,
   Alert,
} from 'react-native';

import {connect} from "react-redux";
import {logoutUser} from "../actions/auth.actions";
//import Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';

export default class Homemenu extends Component<{}> {
  constructor(props) {
    super(props);
  }
_menu = null;

 setMenuRef = ref => {
   this._menu = ref;
 };

 hideMenu = () => {
   this._menu.hide();
 };

 showMenu = () => {
   this._menu.show();
 };
  profile = () => {
   Actions.profile();
 };
	render(){
		return(
      <Menu  ref={this.setMenuRef} button={<Text style={{width:30}} onPress={this.showMenu}><Icon  style={{color:'#ffffff'}} name="menu" /></Text>}>
                <MenuItem onPress={this.profile.bind(this)}>View Profile</MenuItem>
                <MenuItem onPress={this.props.logout.bind(this)}>Logout</MenuItem>
       </Menu>
			)
	}
}
