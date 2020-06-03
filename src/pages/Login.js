import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import { Field, reduxForm } from 'redux-form';

import InputText from "../components/InputText";
import {loginUser} from "../actions/auth.actions";
import Logo from '../components/Logo';
//import Form from '../components/Form';
import Loader from "../components/Loader";
import {Actions} from 'react-native-router-flux';
import homeBg from '../images/bg.png';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class Login extends Component<{}> {
  _isMounted = false;

  constructor(props) {
   super(props);
    this.state = {
      LoginStatus:'',
    }
  }
	resetpass() {
		Actions.resetpass()
	}

  loginUser = async (values) => {

          const response =  await this.props.dispatch(loginUser(values));
          if(response.status){//.status !=null
            //alert(response.status);return false;
            this.setState({EmployeeIDState:response.status})
          }else{
            this.setState({LoginStatus:1})
          }

  }

  onSubmit = (values) => {
      this.loginUser(values);
  }

  renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>

              <InputText
                  onChangeText={onChange}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                  label={label}
                  {...restInput} />
            {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
  }

	render() {
    const { handleSubmit, loginUser} = this.props;

		return(

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <ImageBackground source={homeBg} style={styles.backgroundImage}>

			     <View style={styles.container} >

           {(loginUser && loginUser.isLoading) && <Loader />}


           <View style={{height:210,alignSelf: "center",justifyContent: 'center',alignItems: 'center'}}>
            <Logo />
              <Field style={{alignItems:'center'}}
                  name="email"
                  value =""
                  placeholder="Email"
                  component={this.renderTextInput} />
              <Field
                  name="password"
                  placeholder="Password"
                  value =""
                  secureTextEntry={true}
                  component={this.renderTextInput} />
                  <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                  {this.state.LoginStatus?<Text style={{fontSize:16,color:'red',fontWeight:'bold'}}>Invalid login information.Try again.</Text>:null}
                  <View style={{marginTop:20,textAlign:'center',justifyContent:'center'}}>

                  <TouchableOpacity onPress={this.resetpass}><Text style={styles.signupButton}>Reset Password</Text></TouchableOpacity>
                  </View>

        </View>



			</View>

      </ImageBackground>
  </KeyboardAvoidingView>
			)
	}
}

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
  	color:'green',
  	fontSize:18,
  	fontWeight:'bold',

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
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(0, 0, 0, 1)',
    top:10,
    textAlign:'center',
    justifyContent:'center',
  }
});

const validate = (values) => {
    const errors = {};
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(!values.name) {
        errors.name = "Name is required"
    }
    if(!values.email) {
        errors.email = "Email is required"
    }
    //if(!values.email !== /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/){
    if(reg.test(values.email) === false)
    {
      errors.email = "Valid email is required";
    }
    if(!values.password) {
        errors.password = "Name is required"
    }
    return errors;
};

mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
});
//initialValues: { email: 'rashid.ahmed@alraya.com.sa',password:'1234' }
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "login",
    validate
  })
)(Login);
