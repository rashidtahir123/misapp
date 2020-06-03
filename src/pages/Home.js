import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { Container, Header, Left, Body, Right, Icon, Button, Title,Picker,Card,CardItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {connect} from "react-redux";
import Homemenu from '../components/Homemenu';
import { Actions } from 'react-native-router-flux'; // New code
import {logoutUser} from "../actions/auth.actions";
const  { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const  { Widtht } = Dimensions.get('window');
import { Badge } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";

import FooterBgInner from '../components/FooterBgInner';
const win = Dimensions.get('window');
const ratio = win.width/541;
class Home extends Component<{}> {



  constructor(props) {
    super(props);
    this.state = {
        notification:'',
    }
      _menu = null;

 }
 componentDidMount()
 {
   const {getUser: {userDetails}} = this.props;
         setInterval(this.getNotification, 5000);
         NetInfo.fetch().then(state => {
         if(state.isConnected ==true){
            fetch(global.serverURL+'front/api/getNotification?&empId='+userDetails.EmployeeID)

            .then(response => response.json())
            .then(responseJson => {
              this.offset = this.offset + 2;
              var count = Object.keys(responseJson).length;
              if(count >0){

                this.setState({ notificationManager:responseJson.ManagerNotification.pendingapproval,loading: false,});
                 this.setState({ notificationMis:responseJson.MisNotification.task,loading: false,});

              }else{
                this.setState({loading: false,});
              }
            })
            .catch(error => {
              this.setState({connection:false});
         });
       }else{
           this.setState({connection:false});
       }
     });

 }
 getNotification =()=>{

   const {getUser: {userDetails}} = this.props;

         NetInfo.fetch().then(state => {
         if(state.isConnected ==true){
            fetch(global.serverURL+'front/api/getNotification?&empId='+userDetails.EmployeeID)

            .then(response => response.json())
            .then(responseJson => {
              this.offset = this.offset + 2;
              var count = Object.keys(responseJson).length;
              if(count >0){

                this.setState({ notificationManager:responseJson.ManagerNotification.pendingapproval,loading: false,});
                 this.setState({ notificationMis:responseJson.MisNotification.task,loading: false,});

              }else{
                this.setState({loading: false,});
              }
            })
            .catch(error => {
              this.setState({connection:false});
         });
       }else{
           this.setState({connection:false});
       }
     });
 }

  logoutUser = () => {

      this.props.dispatch(logoutUser());
  }
  incident = () => {
  		Actions.incident();
  	}
  service = () => {
    	Actions.service();
   }
   maintenance = () => {
      Actions.maintenance();
	}
  assignedListing = () => {
     Actions.assignedlisting();
 }
 pendingListing = () => {
    Actions.pendinglisting();
}
setMenuRef = ref => {
  this._menu = ref;
};

hideMenu = () => {
  this._menu.hide();
};

showMenu = () => {
  this._menu.show();
};
renderMIS(){

  return(

      <Grid>
      <Row  style={{ height: 180*ratio}}>
          <Col>
              <View style={styles.columnviewCenter}>
                  <Image  source={require('../images/logo4.png')} />
              </View>
          </Col>
      </Row>

      <Row  style={{ height: 230*ratio,paddingTop:50}}>
      <Col>
          <View style={styles.columnviewCenter}>

              <TouchableHighlight onPress={this.incident}  >
                <View>

                    <Image  source={require('../images/incidentbtn.png')} />

                </View>
             </TouchableHighlight>

          </View>
      </Col>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight   onPress={this.service}  >
                <View>
                    <Image source={require('../images/servicebtn.png')} />

                </View>
              </TouchableHighlight>
          </View>
      </Col>
    </Row>
    <Row  style={{ height: 180,paddingTop:50}} >
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight  onPress={this.maintenance}  >
                <View>
                    <Image  source={require('../images/maintenancebtn.png')} />

                </View>
              </TouchableHighlight>
          </View>
      </Col>
      <Col>
          <View style={styles.columnviewCenter}>


              <TouchableHighlight  onPress={this.assignedListing}  >
                <View>
                    <Image source={require('../images/assignbtn.png')} />
                    <Badge status="primary" style={{scaleX: 0.7, scaleY: 0.7}} value={this.state.notificationMis?this.state.notificationMis:0} badgeStyle={{backgroundColor:'red'}} containerStyle={{  position: 'absolute', top: 15, left: 12 }} />
                </View>
              </TouchableHighlight>
          </View>

      </Col>
    </Row>
  </Grid>)

}
renderManager(){

  return(

    <Grid>
    <Row  style={{ height: 180*ratio}}>
        <Col>
            <View style={styles.columnviewCenter}>
                <Image  source={require('../images/logo4.png')} />
            </View>
        </Col>
    </Row>

      <Row  style={{ height: 230*ratio}}>
      <Col>
        <View style={styles.columnviewCenter}>
            <TouchableHighlight style={{paddingTop:15}} onPress={this.incident}  >
                <View>
                    <Image  source={require('../images/incidentbtn.png')} />
                </View>
             </TouchableHighlight>
       </View>
      </Col>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}}  onPress={this.service}  >
                <View>
                    <Image source={require('../images/servicebtn.png')} />

                </View>
              </TouchableHighlight>
          </View>
      </Col>
    </Row>
    <Row  style={{height: 230*ratio}}>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}} onPress={this.maintenance}  >
                <View>
                    <Image  source={require('../images/maintenancebtn.png')} />

                </View>
              </TouchableHighlight>
          </View>
      </Col>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}} onPress={this.pendingListing}>
                <View>
                    <Image   source={require('../images/pendingbtnmgr.png')} />
                    <Badge status="primary" style={{scaleX: 0.7, scaleY: 0.7}} value={this.state.notificationMis?this.state.notificationMis:0} badgeStyle={{backgroundColor:'red'}} containerStyle={{  position: 'absolute', top: 15, left: 17 }} />
                </View>
              </TouchableHighlight>
          </View>
        </Col>
    </Row>

  </Grid>)


}
renderMISManager(){

  return(
    <Grid>
      <Row  style={{ height: 230*ratio}}>
      <Col>
        <View style={styles.columnviewCenter}>
            <TouchableHighlight style={{paddingTop:15}} onPress={this.incident}  >
                <View>
                    <Image  source={require('../images/incidentbtn.png')} />
                </View>
             </TouchableHighlight>
       </View>
      </Col>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}}  onPress={this.service}  >
                <View>
                    <Image source={require('../images/servicebtn.png')} />

                </View>
              </TouchableHighlight>
          </View>
      </Col>
    </Row>
    <Row  style={{height: 230*ratio}}>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}} onPress={this.maintenance}  >
                <View>
                    <Image  source={require('../images/maintenancebtn.png')} />

                </View>
              </TouchableHighlight>
          </View>
      </Col>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}} onPress={this.assignedListing}>
                <View>
                    <Image   source={require('../images/assignbtn.png')} />
                    <Badge status="primary" style={{scaleX: 0.7, scaleY: 0.7}} value={this.state.notificationMis?this.state.notificationMis:0} badgeStyle={{backgroundColor:'red'}} containerStyle={{  position: 'absolute', top: 15, left: 17 }} />
                </View>
              </TouchableHighlight>
          </View>
        </Col>
    </Row>
    <Row  style={{height: 225*ratio}}>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}} onPress={this.pendingListing}  >
                <View>
                    <Image style={{width:500*ratio}}  source={require('../images/pendingbtn.png')} />
                    <Badge status="primary" style={{scaleX: 2, scaleY: 2}} value={this.state.notificationManager?this.state.notificationManager:0} badgeStyle={{backgroundColor:'red'}} containerStyle={{  position: 'absolute', top: 18, left: 29 }} />
                </View>
              </TouchableHighlight>
          </View>
      </Col>
    </Row>
  </Grid>)


}
renderEmployee()
{
  return(
      <Grid>
    <Row  style={{ height: 165}}>
      <Col>
            <View style={styles.columnviewCenter}>

                <TouchableHighlight style={{paddingTop:15}} onPress={this.incident}  >
                  <View >

                      <Image source={require('../images/incidentbtnhor.png')} />

                  </View>
               </TouchableHighlight>

            </View>
            </Col>
      </Row>
      <Row  style={{height: 165}}>
      <Col>
          <View style={styles.columnviewCenter}>
              <TouchableHighlight style={{paddingTop:15}}  onPress={this.service}  >
                <View>
                    <Image  source={require('../images/servicebtnhor.png')} />

                </View>
              </TouchableHighlight>
          </View>
      </Col>
    </Row>
    <Row  style={{ height: 165}}>
    <Col>
        <View style={styles.columnviewCenter}>
            <TouchableHighlight style={{paddingTop:15}}  onPress={this.maintenance}  >
              <View>
                  <Image  source={require('../images/maintenancebtnhor.png')} />
              </View>
            </TouchableHighlight>
        </View>
    </Col>
  </Row>
  </Grid>
  )
}

	render() {
    const {getUser: {userDetails}} = this.props;

		return(

        <View style={{flex:1}}>

                           <View style={{height:80*ratio,marginTop:Platform.OS === 'ios' ? 0 :22 }}>
                            <ImageBackground  source={require("../images/header.png")} style={{resizeMode: 'cover',width: win.width+5, height: 80*ratio}}>
                             </ImageBackground>
                             <Text transparent style={{position:'absolute',left:23,top:17,fontSize:22,color:'white'}}>MIS SMART SERVICES</Text>
                             <Button transparent style={{position:'absolute',right:20,top:8}} >
                                  <Homemenu logout={this.logoutUser} />
                             </Button>
                                                </View>



          <ScrollView>

            {userDetails && userDetails.isManager ==1 && userDetails.DepartmentID==7?this.renderMISManager():null}
            {userDetails && userDetails.isManager ==1 && userDetails.DepartmentID!=7?this.renderManager():null}
            {userDetails && userDetails.DepartmentID ==7 && userDetails.isManager ==2?this.renderMIS():null}
            {userDetails && userDetails.DepartmentID !=7 && userDetails.isManager ==2?this.renderEmployee():null}

        </ScrollView>
        <FooterBgInner />
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
    backgroundColor:'transparent',//cffedc

    justifyContent :'center',
    alignItems:'center',


  },
  columnviewCenter:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
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
         backgroundColor: 'transparent',
            backgroundColor:'red',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 30,

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
