import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
  TextInput,

} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { Container, Header,Content, Left, Body, Right, Icon, Button, Title,Picker,Card,CardItem,List, ListItem,Tabs,Tab,TabHeading } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {connect} from "react-redux";

import {compose} from "redux";
import { Field, reduxForm ,change } from 'redux-form';
//import Homemenu from '../components/Homemenu';
import Loader from "../components/Loader";
import {logoutUser} from "../actions/auth.actions";
import Chat from '../components/Chat';
import NetInfo from "@react-native-community/netinfo";

class ViewImage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      connection:true,


    }
  }

	render() {
    const {getUser: {userDetails}} = this.props;
  const { handleSubmit,onSubmit} = this.props;
		return(
      <Container>
      <Image onPress={() => this.viewImage(this.state.ticketData.attachments)}  style={{width:'100%',height:300}} source={{uri:global.serverURL+"uploads/"+this.props.imgsrc}} />

        </Container>
			)
	}
}


const styles = StyleSheet.create({
  detailHeading:{
    fontWeight:'bold',
    fontSize:14,
    marginBottom:10,
    marginTop:10,
  },
  detailText:{
    paddingBottom:10,
    borderWidth:1,
    padding:10,
    borderRadius:5,
    borderColor:'grey'
  },
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
          textAreaContainer: {
            borderColor:'black',
            borderWidth: 1,
            padding: 5
          },
          textArea: {
            height: 80,
            justifyContent: "flex-start",
            borderColor:'grey',
            borderWidth: 1,
            padding: 5,
            borderRadius:5,
          },
          button: {
            width:200,
            backgroundColor:'#00acac',
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
});
mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser

})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  reduxForm({
    form: "ViewImage"
  })
)(ViewImage);
