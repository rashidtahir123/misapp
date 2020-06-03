import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert


} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { Container, Header,Content, Left, Body, Right, Icon, Button, Title,Picker,Card,CardItem,List, ListItem,Tabs,Tab,TabHeading } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {connect} from "react-redux";
//import Homemenu from '../components/Homemenu';
import NetInfo from "@react-native-community/netinfo";

import {logoutUser} from "../actions/auth.actions";


class Profile extends Component<{}> {

  constructor(props) {
    super(props);
  }

	render() {
    const {getUser: {userDetails}} = this.props;

		return(
          <Container>
          <CardItem  style={styles.ticketListing}>
            <Body>
              <Grid>
                <Col style={{ height: 300}} onPress={() => this.assigneddetail(item.TicketID)}>
                    <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Name:</Text> {userDetails.EmployeeName}</Text>
                    <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Email:</Text> {userDetails.EmployeeEmail}</Text>
                    <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Department:</Text> {userDetails.DepartmentName}</Text>
                    <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Position:</Text> {userDetails.PositionName}</Text>

                </Col>
              </Grid>
            </Body>
          </CardItem>
          </Container>
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
    flex:1,
    top:0


  },
  ticketListing :{
      borderWidth:1,
      borderColor:'green',
      borderRadius:5,
      marginBottom:8,
      height:200,
      margin:10,

  },
  textStyle: {
      color: "#000",
      fontSize: 18
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



    },iconLeft: {
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
