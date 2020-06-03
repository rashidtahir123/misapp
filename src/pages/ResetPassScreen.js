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
    backgroundColor:'rgba(0, 0,0,0.2)',
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

});

class ResetPassScreen extends Component<{}> {
  constructor(props) {
   super(props);
   this.state = {
      email:'',
      error_password:'',
      response_msg:'',
      connection:true,
   }
 }

  goBack() {
      Actions.pop();
  }



  onSubmit = async (values) => {

      var data = { password:this.state.password,empId:this.props.empid}



      NetInfo.fetch().then(state => {
      if(state.isConnected ==true){
         fetch(global.serverURL+'front/Authentication/changePassword', {
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
              if(responseData.status ==1){
                  this.setState({response_msg:'Problem in reseting password.Try again'});
              }
              else{
                this.setState({response_msg:'Password has been reset successfully.'});
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



	render() {
    const { handleSubmit, createUser} = this.props;
		return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ImageBackground source={homeBg} style={styles.backgroundImage}>
			<View style={styles.container}>
      <View style={{height:210,alignSelf: "center",justifyContent: 'center',alignItems: 'center'}}>
       <Logo />
          {this.state.response_msg?<Text style={{color:'red',fontWeight:'bold'}}>{this.state.response_msg}</Text>:null}
        <TextInput style={styles.inputBox}
            name="password"
            secureTextEntry={true}
            placeholder="Enter New password"
            onChangeText={(text) => this.setState({password: text,error_password:''})}
            />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

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
)(ResetPassScreen);
