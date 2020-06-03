import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,

} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";

import Logo from '../components/Logo';
import Form from '../components/Form';
import InputText from "../components/InputText";
import {createNewUser} from "../actions/auth.actions";
import Loader from "../components/Loader";
import {ErrorUtils} from "../utils/auth.utils";
import NetInfo from "@react-native-community/netinfo";
import {Actions} from 'react-native-router-flux';
import homeBg from '../images/bg.png';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

import CodeInput from 'react-native-confirmation-code-input';

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',

  },

  backgroundImage: {
   flex: 1,
   position: 'absolute',
   resizeMode: 'cover',
   width: viewportWidth,
   height: viewportHeight,
   backgroundColor: 'transparent',
   justifyContent: 'center',
   alignItems: 'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#000000',
  	fontSize:16,
  	fontWeight:'bold'
  },
  button: {
    width:300,
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
  errorText:{
    color:'red'
  },
  signupTextCont: {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },

  errorText: {
      color: "#ffffff",
      fontSize:14,
      paddingHorizontal:16,
      paddingBottom: 8
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
    height: Platform.OS === 'ios' ? 40 :40,
  } , backgroundImage: {
     flex: 1,
     position: 'absolute',
     resizeMode: 'cover',
     width: viewportWidth,
     height: viewportHeight,
     backgroundColor: 'transparent',
     justifyContent: 'center',
     alignItems: 'center'
    },
    inputBox: {
      width:300,
      borderColor: '#d3d3d3',
      borderWidth: 1,
      borderRadius: 15,
      color: '#000',
      paddingHorizontal:16,
      fontSize:16,
      color:'#000000',
      marginVertical: 10
    },
});

class ResetPassCode extends Component<{}> {
  constructor(props) {
   super(props);
   this.state = {
      email:'',
      error_email:'',
      response_msg :'',
      connection:true,
   }
 }

  goBack() {
      Actions.pop();
  }



  onSubmit = async (values) => {
      Alert.alert(this.state.email)

      var data = { email:this.state.email}



      NetInfo.fetch().then(state => {
      if(state.isConnected ==true){
         fetch(global.serverURL+'front/Authentication/forgot', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
                'mode':'cors',
              },
            body:JSON.stringify(data),
          })
         .then((response) => response.json())
            .then((responseData) => {
             console.log(responseData);
              if(responseData.success ==1){
                Alert.alert(responseData.ResetCode);
              }
              if(responseData.success ==2){
              Alert.alert(responseData.ResetCode);
              }
              if(responseData.success ==3){
                Alert.alert(responseData.ResetCode);
              }
              //this.setState({response_msg:responseData});
         }).catch((error) => {
           this.setState({connection:false});
      });
    }else{
        this.setState({connection:false});
    }
  });

  }
 _onFinishCheckingCode = async (value,code) => {

      var data = { empid:this.props.empid,code:code}

      await fetch(global.serverURL+'front/Authentication/verifyCode', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
                'mode':'cors',
              },
            body:JSON.stringify(data),
          })
         .then((response) => response.json())
            .then((responseData) => {
             console.log(responseData);
              if(responseData.Valid ==1){
                Actions.resetpassscreen({ empid: responseData.empId });
                //this.setState({response_msg:'Code is ok'});
              }
              if(responseData.Valid ==2){
                this.setState({response_msg:'Code is expire'});
              //Alert.alert('Valid is two');
              }
              if(responseData.Valid ==3){
              //Alert.alert('Valid is three');
                this.setState({response_msg:'Invalide Code'});
              }
              //this.setState({response_msg:responseData});
         }).catch((error) => {
             console.log("Error");
         });

 }

	render() {
    const { handleSubmit, createUser} = this.props;
		return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ImageBackground source={homeBg} style={styles.backgroundImage}>
			<View style={styles.container}>
      <View style={{height:210,alignSelf: "center",justifyContent: 'center',alignItems: 'center'}}>
       <Logo />
      <Text style={{color:'green',fontWeight:'bold'}}>Email has been sent with verification code.</Text>
      {this.state.response_msg?<Text style={{color:'red',fontWeight:'bold'}}>{this.state.response_msg}</Text>:null}
      <CodeInput
            ref="codeInputRef2"
            secureTextEntry
            compareWithCode='AsDW2'
            activeColor='rgba(49, 180, 4, 1)'
            inactiveColor='rgba(49, 180, 4, 1.3)'
            autoFocus={false}
            ignoreCase={true}
            inputPosition='center'
            size={50}
            onFulfill={(isValid, code) => this._onFinishCheckingCode(isValid, code)}
            containerStyle={{ marginTop: 30 }}
            codeInputStyle={{ borderWidth: 1.5 }}
        />




				</View>
			</View>
      </ImageBackground>
      </KeyboardAvoidingView>
			)
	}
}

const validate = (values) => {
    const errors = {};

    if(!values.email) {
        errors.email = "Email is required"
    }

    return errors;
};

mapStateToProps = (state) => ({
    createUser: state.authReducer.createUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "resetcode",
    validate
  })
)(ResetPassCode);
