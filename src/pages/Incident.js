import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  ImageBackground,

} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { Container, Header, Left, Body, Right, Icon, Button, Title,Picker } from 'native-base';

import {connect} from "react-redux";
//import Homemenu from '../components/Homemenu';
import { Actions } from 'react-native-router-flux';
import {logoutUser} from "../actions/auth.actions";
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderBg from '../components/HeaderBg';
import FooterBg from '../components/FooterBg';

class Incident extends Component<{}> {

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

  constructor(props) {
    super(props);
  }
  logoutUser = () => {

      this.props.dispatch(logoutUser());
  }
  incidentlisting = () => {
  		Actions.incidentlisting();
  	}
  addIncident = () => {
    		Actions.addIncident();
  }
	render() {
    const {getUser: {userDetails}} = this.props;

		return(

        <View style={{flex:1}}>
        <HeaderBg />
            <Grid>
              <Row  style={{ height: 160}} >
                  <Col style={styles.colmargin}>
                      <TouchableHighlight style={{paddingTop:40}}
                                  onPress={this.addIncident}  >
                          <View style={styles.columnviewCenter}>
                                <Image style={{width: '100%', height: 140}}  resizeMode="cover" source={require('../images/addincident.png')} />
                          </View>
                      </TouchableHighlight>
                  </Col>

              </Row>
              <Row  style={{ height: 160}} >

                  <Col style={styles.colmargin}>
                      <TouchableHighlight style={{paddingTop:40}}
                                  onPress={this.incidentlisting}  >
                          <View style={styles.columnviewCenter}>
                                <Image style={{width: '100%', height: 140}}  resizeMode="cover" source={require('../images/myincident.png')} />
                          </View>
                      </TouchableHighlight>
                  </Col>
              </Row>
            </Grid>
          <FooterBg />
	       </View>
       )
	}
}

mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
    dispatch
});
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',//cffedc

    justifyContent :'center',
    alignItems:'center',


  },  colmargin:{
      marginLeft:10,
      marginRight:10
    },
  textStyle: {
      color: "#000",
      fontSize: 18
  },
  columnviewCenter:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    header:{
        position:'absolute',
        top:0,
        backgroundColor:'green',
    },
    homebox:{
         width:300,
         backgroundColor:'red',
         borderRadius: 25,
         marginVertical: 10,
         paddingVertical: 30,
         fontSize:20,
         color:'white',
         fontWeight:'bold',
       },
    homeboxbtn:{
           width:300,
           backgroundColor:'red',
           borderRadius: 25,
           marginVertical: 10,
           paddingVertical: 30,

    },
    iconLeft: {
        width: 25,
            height: 25,
            position: 'absolute',
            left: 30,
       },buttonText: {
            color: 'white',
            fontWeight: 'bold',

            justifyContent :'center',
            alignItems:'center',
            fontSize:17,
            paddingLeft:70,

          },
});

export default connect(mapStateToProps, mapDispatchToProps)(Incident);
