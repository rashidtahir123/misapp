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
import {SingleImage} from 'react-native-zoom-lightbox';
class AssignedDetail extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      connection:true,
        ticketData: [],
        currentStatus:'',
        selected: "In Progress",
        resolution:'',
        ticketid:'',
        status:'',
        response_msg:'',
        selectedStatus:'',
        Loading:true,

    }
  }
  componentDidMount() {

    NetInfo.fetch().then(state => {
    if(state.isConnected ==true){
      fetch(global.serverURL+'front/api/getServiceDetail?ticketid='+this.props.ticketID)
       .then(response => response.json())
       .then(responseJson => {
         console.log(responseJson);
         this.setState({ ticketData: responseJson,Loading:false});
         this.setState({selectedStatus:this.state.ticketData.Status,resolution:this.state.ticketData.TicketResolution,ticketid:this.state.ticketData.TicketID,status:this.state.ticketData.Status})
      })
      .catch(error => {
        this.setState({connection:false,Loading:false});
   });
 }else{
     this.setState({connection:false,Loading:false});
 }
});

   }

   onValueChange(value: string) {
   this.setState({
     selectedd: value,
     selectedStatus:value,
   });
 }
 onSubmit = (values) => {

   const {getUser: {userDetails}} = this.props;

   var data = { resolution:this.state.resolution,
                misStatus: this.state.selectedStatus,
                EmployeeID: userDetails.EmployeeID,
                ticketid: this.state.ticketid,
              }
              NetInfo.fetch().then(state => {
              if(state.isConnected ==true){
              fetch(global.serverURL+'front/api/updateStatus', {
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

                     this.setState({status:this.state.selectedStatus,selectedStatus:this.state.selectedStatus});
                     this.setState({response_msg:1});
                }).catch((error) => {
                  this.setState({connection:false});
             });
           }else{
               this.setState({connection:false});
           }
          });

 }
	render() {
    const {getUser: {userDetails}} = this.props;
  const { handleSubmit,onSubmit} = this.props;
  if(this.state.ticketData.attachments){
    var imageUrl = global.serverURL+"uploads/"+this.state.ticketData.attachments
  }else{
    var imageUrl="";
  }
		return(
      <Container>
      {this.state.Loading === true ? <Loader /> : null}
          <Tabs  tabBarUnderlineStyle={ {backgroundColor: '' }}>
          <Tab heading="DETAIL"
              activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
              textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
              tabStyle={{ backgroundColor: '#126938' }}
              activeTabStyle={{ backgroundColor: '#09473A' }}
          >
                <ScrollView style={{padding:15,paddingBottom:30}}>

                      <Text style={styles.detailHeading}>Request Date:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.CreatedDate}</Text>
                      <Text style={styles.detailHeading} >Request By:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.EmployeeName}</Text>
                      <Text style={styles.detailHeading}>Request Department:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.DepartmentName}</Text>
                      <Text style={styles.detailHeading}>Request Type:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.RequestName}</Text>
                      <Text style={styles.detailHeading}>Request Status:</Text>
                      <Text style={styles.detailText}>{this.state.status}</Text>
                      <Text style={styles.detailHeading}>Category:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.CategoryName}</Text>
                      <Text style={styles.detailHeading}>Sub Category:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.SubCategoryName}</Text>
                      <Text style={styles.detailHeading}>Service:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.ServiceName}</Text>
                      <Text style={styles.detailHeading} >Location:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.SiteName}</Text>
                      <Text style={styles.detailHeading}>Subject:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.TicketSubject}</Text>
                      <Text style={styles.detailHeading}>Detail:</Text>
                      <Text style={styles.detailText}>{this.state.ticketData.TicketBody}</Text>
                      <Text style={styles.detailHeading} >Attachment:</Text>
                      {this.state.attachments?(<SingleImage uri={imageUrl} style={{marginBottom:20,width:'100%',height:100}} />):(<Text>No Attachment</Text>)}



            </ScrollView>
            </Tab>
            <Tab heading="MIS"
                activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
                tabStyle={{ backgroundColor: '#126938' }}
                activeTabStyle={{ backgroundColor: '#09473A' }}
            >
                    <View style={{padding:15}}>
                      <Text  style={[styles.detailHeading, {height:25}]}>Assigned Date:</Text>
                      <Text style={[styles.detailText, {height:40}]}>{this.state.ticketData.AssigneDate}</Text>
                      <Text style={[styles.detailHeading, {height:25}]}>Assigned To:</Text>
                      <Text style={[styles.detailText, {height:40}]}>{this.state.ticketData.Members}</Text>
                      <Text style={[styles.detailHeading, {height:25}]}>Resolution:</Text>

                        <TextInput
                           style={styles.textArea}
                           underlineColorAndroid="transparent"
                           placeholder="Resolution"
                           numberOfLines={10}
                           multiline={true}
                           onChangeText={(text) => this.setState({resolution: text})}
                           value={this.state.resolution} />

                      <Text style={styles.detailHeading}>Change Status:</Text>
                      <Text style={styles.detailText}>

                        <Picker
                          note
                          mode="dropdown"
                          style={{ width: 370,height:30 }}
                          selectedValue={this.state.selectedStatus}
                          onValueChange={this.onValueChange.bind(this)}
                        >
                          <Picker.Item label="In Progress" value="In Progress" />
                          <Picker.Item label="Completed" value="Completed" />
                          <Picker.Item label="Cancelled" value="Cancelled" />
                        </Picker>
                      </Text>

                      <TouchableOpacity style={styles.button} onPress={this.onSubmit.bind(this)}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                      </TouchableOpacity>
                      {this.state.response_msg?<Text style={{color:'green'}}>Status has been updated to {this.state.status}</Text>:null}
                  </View>
            </Tab>
            <Tab heading="CHAT"
                activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
                tabStyle={{ backgroundColor: '#126938' }}
                activeTabStyle={{ backgroundColor: '#09473A' }}
            >
               <Chat ticketid={this.props.ticketID} empId={userDetails.EmployeeID} />
            </Tab>
          </Tabs>
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
      borderWidth:0,
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
    form: "UpdateStatus"
  })
)(AssignedDetail);
