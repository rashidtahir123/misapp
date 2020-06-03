import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
  Image,
  Platform,
} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


import { Container, Header,Content, Left, Body, Right, Icon, Button, Title,Picker,Card,CardItem,List, ListItem,Tabs,Tab,TabHeading } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {connect} from "react-redux";
import Chat from '../components/Chat';
import {compose} from "redux";
import { Field, reduxForm ,change } from 'redux-form';
import {logoutUser} from "../actions/auth.actions";
import NetInfo from "@react-native-community/netinfo";
import Loader from "../components/Loader";
import {SingleImage} from 'react-native-zoom-lightbox';

class IncidentDetail extends Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
      connection:true,
        ticketData: [],
        Loading:true,
    }
  }


  async componentDidMount() {

    NetInfo.fetch().then(state => {
    if(state.isConnected ==true){

      fetch(global.serverURL+'front/api/getIncidentDetail?ticketid='+this.props.ticketID)
       .then(response => response.json())
       .then(responseJson => {

         this.setState({ ticketData: responseJson,Loading:false});
      })
      .catch(error => {
        this.setState({connection:false,Loading:false});
   });
 }else{
     this.setState({connection:false,Loading:false});
 }
});

   }

	render() {
    const {getUser: {userDetails}} = this.props;
    //<Icon name="icon_name" style={this.state.currentTab == 0 ? styles.activeTextStyle : styles.inactiveTextStyle} />
    if(this.state.ticketData.attachments){
      var imageUrl = global.serverURL+"uploads/"+this.state.ticketData.attachments
    }else{
      var imageUrl="";
    }


		return(
      <Container>
        {this.state.Loading === true ? <Loader /> : null}
          <Tabs tabContainerStyle={{ backgroundColor: "red" }} tabBarUnderlineStyle={ {backgroundColor:'' }}>
            <Tab heading="DETAIL"
                activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
                tabStyle={{ backgroundColor: '#126938' }}
                activeTabStyle={{ backgroundColor: '#09473A' }}
            >
               <ScrollView>
                  <CardItem  style={styles.ticketListing}>
                    <Body>
                      <Grid>
                        <Col >

                            <Text style={styles.detailHeading} >Request Date:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.CreatedDate}</Text>

                            <Text  style={styles.detailHeading}>Request By:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.EmployeeName}</Text>

                            <Text style={styles.detailHeading} >Request Department:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.DepartmentName}</Text>

                            <Text style={styles.detailHeading} >Request Type:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.RequestName}</Text>

                            <Text style={styles.detailHeading} >Request Status:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.Status}</Text>

                            <Text style={styles.detailHeading} >Category:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.CategoryName}</Text>

                            <Text style={styles.detailHeading} >Sub Category:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.SubCategoryName}</Text>

                            <Text style={styles.detailHeading} >Location:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.SiteName}</Text>
                            
                            <Text style={styles.detailHeading} >Service:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.ServiceName}</Text>

                            <Text style={styles.detailHeading} >Subject:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.TicketSubject}</Text>

                            <Text style={styles.detailHeading} >Detail:</Text>
                            <Text style={styles.detailText}>{this.state.ticketData.TicketBody}</Text>

                            <Text style={styles.detailHeading} >Attachment:</Text>
                            {this.state.ticketData.attachments?(<SingleImage uri={imageUrl} style={{marginBottom:20,width:'100%',height:100}} />):(<Text>No Attachment</Text>)}

                        </Col>
                      </Grid>
                    </Body>
                  </CardItem>
                </ScrollView>
            </Tab>
            <Tab heading="MIS"
                activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
                tabStyle={{ backgroundColor: '#126938' }}
                activeTabStyle={{ backgroundColor: '#09473A' }}>
            <CardItem  style={styles.ticketListing}>
              <Body>
                <Grid>
                  <Col>
                      <Text style={[styles.detailHeading, {height:25}]} >Assigned Date:</Text>
                      <Text style={[styles.detailText, {height:40}]}>{this.state.ticketData.AssigneDate}</Text>
                      <Text style={[styles.detailHeading, {height:25}]} >Assigned To:</Text>
                      <Text style={[styles.detailText, {height:40}]}>{this.state.ticketData.Members}</Text>
                      <Text style={[styles.detailHeading, {height:25}]} >Resolution:</Text>
                      <Text style={[styles.detailText, {height:40}]}>{this.state.ticketData.TicketResolution}</Text>
                    </Col>
                </Grid>
              </Body>
            </CardItem>
            </Tab>
            <Tab heading="CHAT"
                activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
                tabStyle={{ backgroundColor: '#126938' }}
                activeTabStyle={{ backgroundColor: '#09473A' }}>
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
    borderWidth:1,
    borderColor:'white',
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
  },
  iconLeft: {
    width: 25,
    height: 25,
    position: 'absolute',
    left: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent :'center',
    alignItems:'center',
    fontSize:17,
    paddingLeft:70,
  }
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
    form: "incidentDetail"
  })
)(IncidentDetail);
