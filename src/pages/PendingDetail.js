import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  ScrollView,
  FlatList,
  TextInput,

} from 'react-native';
import {compose} from "redux";
import { Field, reduxForm ,change } from 'redux-form';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Loader from "../components/Loader";
import { Container, Header,Content, Left, Body, Right, Icon, Button, Title,Picker,Card,CardItem,List, ListItem,Tabs,Tab,TabHeading } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {connect} from "react-redux";
//import Homemenu from '../components/Homemenu';

import {logoutUser} from "../actions/auth.actions";
import {SingleImage} from 'react-native-zoom-lightbox';
import {loginUser} from "../actions/auth.actions";
import Chat from '../components/Chat';
import NetInfo from "@react-native-community/netinfo";

class PendingDetail extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      connection:true,
        ticketData: [],
        approvalData:[],
        comments:'',
        btntype:'',
        TicketEmployeeID:'',
        CreatorID:'',
        TeManagerID:'',
        ManagerPositionID:'',
        status:'',
        approvalStatus:'',
        DateTitle:'',
        rejComments:'',
        dateApproval:'',
        Loading:true,
    }
  }

  async getPendingDetail(){
      NetInfo.fetch().then(state => {
          if(state.isConnected ==true){
             fetch(global.serverURL+'front/api/getPendingDetail?ticketid='+this.props.ticketID)
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              this.setState({ ticketData: responseJson,Loading:false});
              this.setState({ status:this.state.ticketData.Status});
           })
           .catch(error => {
             this.setState({connection:false,Loading:false});
             });
          }else{
              this.setState({connection:false,Loading:false});
          }
     });
  }
  async getApprovalDetail(){
    NetInfo.fetch().then(state => {
    if(state.isConnected ==true)
    {
        fetch(global.serverURL+'front/api/approvalDetail?ticketid='+this.props.ticketID)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState({approvalData: responseJson});

          this.setState({
                         TicketEmployeeID: this.state.approvalData.TicketEmployeeID,
                         CreatorID: this.state.approvalData.CreatorID,
                         ManagerEmployeeID: this.state.approvalData.ManagerEmployeeID,
                         ManagerPositionID: this.state.approvalData.ManagerPositionID,
                         approvalStatus:this.state.approvalData.approvalStatus,
                         rejComments:this.state.approvalData.approveComments,
                         dateApproval:this.state.approvalData.UpdatedDate
                       });
                       if(this.state.approvalData.approvalStatus =='Rejected'){
                            this.setState({DateTitle:'Rejected Date'});
                       }else{
                         this.setState({DateTitle:'Approval Date'});
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
  componentDidMount() {
      this.getPendingDetail();
      this.getApprovalDetail();
   }
   onSubmitApprove = async (values) => {
     this.setState({Loading:true});
     const {getUser: {userDetails}} = this.props;
       var data = {
                    rejectComment:this.state.rejComments,
                    btntype: 'approve',
                    ticketemployeeid: this.state.TicketEmployeeID,
                    reqid: this.state.ticketData.RequestID,
                    depid: this.state.ticketData.DepartmentID,
                    posid: this.state.ticketData.PositionID,
                    manposid: this.state.ManagerPositionID,
                    creatorid: this.state.CreatorID,
                    ticketid: this.state.ticketData.TicketID,
                    managerEmpId:this.state.ManagerEmployeeID
                }


        NetInfo.fetch().then(state => {
        if(state.isConnected ==true)
        {
                  fetch(global.serverURL+'front/api/approve', {
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
               this.setState({Loading:false});
               if(responseData.status ==1){
                    this.setState({approvalStatus:'Approved',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
               }else if(responseData.status ==-1){
                  this.setState({approvalStatus:'Approved',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
               }else if(responseData.status ==0){
                  this.setState({approvalStatus:'Approval in process',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
               }else if(responseData.status ==-2){
                  this.setState({approvalStatus:'Rejected'});
                  this.setState({approvalStatus:'Rejected',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
                }else{
                   this.setState({approvalStatus:'Approval in process',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
                }
              // this.setState({response_msg:responseData});
          }).catch((error) => {
            this.setState({connection:false,Loading:false});
          });
     }else{
         this.setState({connection:false});
     }
   });


   }
   onSubmitReject = (values) => {
     this.setState({Loading:true});
     const {getUser: {userDetails}} = this.props;
       var data = {
                    rejectComment:this.state.rejComments,
                    btntype: 'reject',
                    ticketemployeeid: this.state.TicketEmployeeID,
                    reqid: this.state.ticketData.RequestID,
                    depid: this.state.ticketData.DepartmentID,
                    posid: this.state.ticketData.PositionID,
                    manposid: this.state.ManagerPositionID,
                    creatorid: this.state.CreatorID,
                    ticketid: this.state.ticketData.TicketID,
                    managerEmpId:this.state.ManagerEmployeeID
                }

                NetInfo.fetch().then(state => {
                if(state.isConnected ==true){
                  fetch(global.serverURL+'front/api/approve', {
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
                this.setState({Loading:false});

              if(responseData.status ==1){
              //  var asignDte = responseData.AssigneDate
                //this.setState({ticketData.AssigneDate:asignDte,ticketData.Members:responseData.Members})
                   this.setState({approvalStatus:'Approved',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
              }else if(responseData.status ==-1){
                //this.setState({ticketData.AssigneDate:responseData.AssigneDate,ticketData.Members:responseData.Members})
                 this.setState({approvalStatus:'Approved',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
              }else if(responseData.status ==0){
                 this.setState({approvalStatus:'Approval in process',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
              }else if(responseData.status ==-2){
                 this.setState({approvalStatus:'Rejected'});
                 this.setState({approvalStatus:'Rejected',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
               }else{
                  this.setState({approvalStatus:'Approval in process',DateTitle:responseData.dateTitle,dateApproval:responseData.dateStr});
               }
              // this.setState({response_msg:responseData});
          }).catch((error) => {
            this.setState({connection:false,Loading:false});
       });
     }else{
         this.setState({connection:false,Loading:false});
     }
   });


   }

	render() {
   const {getUser: {userDetails}} = this.props;
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
                 <ScrollView>
            <CardItem >
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
                  <Text style={styles.detailText}>{this.state.status}</Text>

                  <Text style={styles.detailHeading} >Category:</Text>
                  <Text style={styles.detailText}>{this.state.ticketData.CategoryName}</Text>

                  <Text style={styles.detailHeading} >Sub Category:</Text>
                  <Text style={styles.detailText}>{this.state.ticketData.SubCategoryName}</Text>

                  <Text style={styles.detailHeading} >Service:</Text>
                  <Text style={styles.detailText}>{this.state.ticketData.ServiceName}</Text>

                  <Text style={styles.detailHeading} >Location:</Text>
                  <Text style={styles.detailText}>{this.state.ticketData.SiteName}</Text>
                  
                  <Text style={styles.detailHeading} >Subject:</Text>
                  <Text style={styles.detailText}>{this.state.ticketData.TicketSubject}</Text>

                  <Text style={styles.detailHeading} >Detail:</Text>
                  <Text style={styles.detailText}>{this.state.ticketData.TicketBody}</Text>

                  <Text style={styles.detailHeading} >Attachment:</Text>
                {this.state.attachments?(<SingleImage uri={imageUrl} style={{marginBottom:20,width:'100%',height:100}} />):(<Text>No Attachment</Text>)}

                  </Col>
                </Grid>
              </Body>
            </CardItem>
              </ScrollView>
            </Tab>
            <Tab heading="APPROVAL"
                activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
                tabStyle={{ backgroundColor: '#126938' }}
                activeTabStyle={{ backgroundColor: '#09473A' }}
            >
                      <ScrollView style={{flex:1,marginLeft:10,marginRight:10}}>
                            <Text style={[styles.detailHeading, {height:25}]} >Approval Status:</Text>
                            <Text  style={[styles.detailText, {height:40}]}>{this.state.approvalStatus?this.state.approvalStatus:null}</Text>
                            <Text style={[styles.detailHeading, {height:25}]} >{this.state.DateTitle}:</Text>
                            <Text style={[styles.detailText, {height:40}]}>{this.state.dateApproval?this.state.dateApproval:'0000:00:00'}</Text>
                            <Text style={[styles.detailHeading, {height:25}]} >{this.state.approvalData.approvebyTitle?this.state.approvalData.approvebyTitle:(<Text>Approval Need</Text>)}:</Text>
                            <Text style={[styles.detailText, {height:40}]}>{this.state.approvalData.managerName?this.state.approvalData.managerName:null}</Text>
                            <Text style={[styles.detailHeading, {height:25}]} >Rejection Reason:</Text>

                            <TextInput style={styles.inputBox}
                                    name="rejComments"
                                    multiline={true}
                                    numberOfLines={5}
                                    placeholder="Comments"
                                    value={this.state.rejComments}
                                    onChangeText={(text) => this.setState({rejComments: text})}
                           />
                            <Grid>
                               <Col>
                               <TouchableOpacity style={styles.button}  onPress={this.onSubmitApprove.bind(this)}>
                                  <Text style={styles.buttonText}>Approve</Text>
                                </TouchableOpacity>
                                </Col>
                               <Col>
                                     <TouchableOpacity style={styles.buttonRed}  onPress={this.onSubmitReject.bind(this)} >
                                       <Text style={styles.buttonText}>Reject</Text>
                                     </TouchableOpacity>
                                </Col>

                           </Grid>





                    </ScrollView>
            </Tab>
            <Tab heading="MIS"
                activeTextStyle={{ color: '#FFF', fontWeight: 'bold' }}
                textStyle={{ color: '#ffffff', fontSize: 14,fontWeight:'bold' }}
                tabStyle={{ backgroundColor: '#126938' }}
                activeTabStyle={{ backgroundColor: '#09473A' }}
            >
            <CardItem  >
              <Body>
                <Grid>
                  <Col >
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
  container1:{
    flex:1
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 14,
    width:170,
  },
  list1:{
    paddingHorizontal: 17,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    width: 360,
    padding: 15,
    borderRadius: 0,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:10,
    padding:5,
  },
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
    button: {
        width:150,
        backgroundColor:'#00acac',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        textAlign:'center',justifyContent:'center'

      },
      buttonRed: {
        width:150,
        backgroundColor:'red',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        textAlign:'center',justifyContent:'center'



        },
      buttonText: {
        fontSize:15,
        fontWeight:'bold',
        color:'#ffffff',

        textAlign:'center',
        justifyContent:'center',


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



    },  inputBox: {
        width:"auto",
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 15,
        color: '#000',
        paddingHorizontal:16,
        fontSize:16,

        color:'#000000',
        marginVertical: 10,

      },iconLeft: {
        width: 25,
            height: 25,
            position: 'absolute',
            left: 30,
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
    form: "pendingDetail"
  })
)(PendingDetail);
