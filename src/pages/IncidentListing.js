import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  FlatList,
  ActivityIndicator,
  ImageBackground,
ScrollView ,

} from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import { Font } from 'expo';
import { Container, Header,Content, Left, Body, Right, Icon, Button, Title,Picker,Card,CardItem,List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {connect,useSelector} from "react-redux";
//import Homemenu from '../components/Homemenu';
import { Actions } from 'react-native-router-flux';
import {logoutUser} from "../actions/auth.actions";
import {getIncident} from "../actions/getincident.actions";
import HeaderBgInner from '../components/HeaderBgInner';
import FooterBgInner from '../components/FooterBgInner';
import { SearchBar } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";
import SearchBox from 'react-native-search-box';

class IncidentListing extends Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
           loading: true,
           ticketID:'',
           serverData: [],
           fetching_from_server: false,
           search: '',
           connection:true,
           nextIndex:1,
           totalRecord:'',
           showingRec:0,
         };
         this.offset = 0;



  }

  async componentDidMount() {
  /*  await Font.loadAsync({
      'Arial': require('./../fonts/Arial.ttf')
    });*/
    this.loadListing();

   }
   loadListing = async () =>{
     const {getUser: {userDetails}} = this.props;
     NetInfo.fetch().then(state => {
       if(state.isConnected ==true){
         this.offset = 0;
         this.setState({serverData: [],canceliconss:2})
         fetch(global.serverURL+'front/api/getIncidentApi?search=2&offset=' + this.offset+'&empid='+userDetails.EmployeeID, {
             headers: {
             'Cache-Control': 'no-cache'
           }
           })
           .then(response => response.json())
          .then(responseJson => {

            this.offset = this.offset + global.RecordToshow;
            this.setState({
              serverData: [...this.state.serverData, ...responseJson],
              loading: false,
              showingRec:global.RecordToshow
           });
          })
          .catch(error => {
            this.setState({connection:false});
          });

          fetch(global.serverURL+'front/api/getTotalRecord?type=4&empid='+userDetails.EmployeeID, {
              headers: {
              'Cache-Control': 'no-cache'
            }
            })
           .then(response => response.json())
           .then(responseJson => {
             this.setState({totalRecord: responseJson});
           })
           .catch(error => {
             this.setState({connection:false});
           });



       }else{
           this.setState({connection:false});
       }
     });
   }
   loadMoreData = async () => {
      const {getUser: {userDetails}} = this.props;

      NetInfo.fetch().then(state => {
      if(state.isConnected ==true){
      //  this.setState({loading:true});
       fetch(global.serverURL+'front/api/getIncidentApi?search=2&offset=' + this.offset+'&empid='+userDetails.EmployeeID)
      .then(response => response.json())
             .then(responseJson => {
              this.offset = this.offset + global.RecordToshow;
              nextTotal = this.state.showingRec;
              nextTotal = nextTotal+2;
              this.setState({
                 serverData: [...this.state.serverData, ...responseJson],
                 showingRec:nextTotal,

               });

             })
             .catch(error => {
               this.setState({connection:false});
             });
      }
      else{
          this.setState({connection:false});
      }
      });
  }
  logoutUser = () => {
    NetInfo.fetch().then(state => {
    if(state.isConnected ==true){
      this.props.dispatch(logoutUser());
    }else{
      this.setState({connection:false});
    }
    });
  }
  incidentdetail = (tikno) => {
      Actions.incidentdetail({ ticketID: tikno });
    }
  updateSearch = (search) => {
      this.setState({ search });
  };


        onSearch = (searchText) => {
          const {getUser: {userDetails}} = this.props;
              return new Promise((resolve, reject) => {
                //  console.log(searchText);

                  //resolve();
                  if(searchText.length ==6){
                  fetch(global.serverURL+'front/api/getIncidentApi?search=1&offset=0&empid='+userDetails.EmployeeID+"&ticketref="+searchText)
                          .then(response => response.json())
                          .then(responseJson => {
                              this.setState({ serverData:[]});
                              this.setState({totalRecord: 0});
                              this.setState({ serverData: responseJson,Loading:false});
                          })
                          .catch(error => {
                            this.setState({connection:false,Loading:false});
                       });


                  }
              });
          }

          // Important: You must return a Promise
          beforeFocus = () => {
              return new Promise((resolve, reject) => {
                  console.log('beforeFocus');
                  resolve();
              });
          }

          // Important: You must return a Promise
          onFocus = (text) => {
              return new Promise((resolve, reject) => {
                  console.log('onFocus', text);
                  resolve();
              });
          }

          // Important: You must return a Promise
          afterFocus = () => {
              return new Promise((resolve, reject) => {
                  console.log('afterFocus');
                  resolve();
              });
            }
              onCancel = () => {
                  return new Promise((resolve, reject) => {
                      this.setState({ serverData:[]});
                      this.loadListing();
                  });
  }
  renderFooter() {
    return (
    //Footer View with Load More button
    <View style={styles.footer}>
    {this.state.showingRec < this.state.totalRecord?(
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.loadMoreData}
        //On Click of button calling loadMoreData function to load more data
        style={styles.button}>
        <Text style={styles.buttonText}>Load More</Text>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
        ) : null}
      </TouchableOpacity>):(null)}
    </View>
    );
  }

  render() {
     _keyExtractor = (item, index) => item.id.toString();
     const { search } = this.state;
    return (
      <View style={styles.container}>
        <HeaderBgInner />
        <SearchBox
         ref="search_box"
         placeholder="Ticket# e.g 200001"
         onSearch={this.onSearch}
         backgroundColor='#d3d3d3'
         titleCancelColor='black'
         onCancel={this.onCancel}
     />

        {this.state.loading ? (<ActivityIndicator size="large" style={{justifyContent: 'center',
    alignItems:'center',flex:1}} />) :(<FlatList

            ref={(ref) => { this.flatListRef = ref; }}
            style={{ width: '100%',marginTop:5 }}
            keyExtractor={item => item.TicketID}
            data={this.state.serverData}
            renderItem={({ item, index }) => (
              <TouchableHighlight id={item.TicketID.toString()}  style={{marginLeft:10,marginRight:10}} >
                  <CardItem  style={styles.ticketListing}>
                    <Body>
                      <Grid>
                        <Col  style={{ marginLeft:5,marginRight:5}} onPress={() => this.incidentdetail(item.TicketID)}>
                            <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Ticket ID:</Text> {item.RefrenceNo}</Text>
                            <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Subject:</Text> {item.TicketSubject}</Text>
                            <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Category:</Text> {item.CategoryName}</Text>
                            <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Sub Category:</Text> {item.SubCategoryName}</Text>
                            <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Service:</Text> {item.ServiceName}</Text>
                            <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Status:</Text> {item.Status}</Text>
                            <Text style={{paddingBottom:10}}><Text style={{fontWeight:'bold'}}>Date:</Text> {item.CreatedDate}</Text>
                        </Col>
                      </Grid>
                    </Body>
                  </CardItem>
              </TouchableHighlight>

            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
        />)}

      </View>
    )
  }
}

const styles = StyleSheet.create({

  item: {
    padding: 10,
  },
  separator: {
    height: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  container : {
    backgroundColor:'#ffffff',//cffedc
    flex:1,
    top:0,



  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
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
    width:220,
    backgroundColor:'#00acac',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
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
mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser

});
mapDispatchToProps = (dispatch) => ({
    dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(IncidentListing);
