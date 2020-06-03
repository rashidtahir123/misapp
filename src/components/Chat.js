import PropTypes from "prop-types";
import React, {Component} from "react";
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
  TextInput} from "react-native";
import NetInfo from "@react-native-community/netinfo";

class Chat extends Component<{}> {
    constructor(props) {
      super(props);
    }
    state = {
        messageList:[],
        comments:'',
        connection:'',
        messagebox:'',
        disabled: true,
    }
    componentDidMount() {
        this.update();
    }
    ListEmptyView = () => {
      return (
        <View style={styles.MainContainer}>

          <Text style={{textAlign: 'center'}}> Sorry, No Data Present In FlatList... Try Again.</Text>

        </View>

      );
    }
   getMessages =()=>{
      const {ticketid,empId} = this.props;
      NetInfo.fetch().then(state => {
         if(state.isConnected ==true){

            fetch(global.serverURL+'front/api/getMessages?ticketid='+ticketid, {
              headers: {
                'Cache-Control': 'no-cache'
              }
            })
            .then(response => response.json())
            .then(responseJson => {

              this.setState({messageList: responseJson});
           })
           .catch(error => {
             this.setState({connection:false});
          });
       }else{
            this.setState({connection:false});
       }
     });

   }
   sendMessage =()=>{
    const {ticketid,empId} = this.props;
    this.setState({disabled: true});
     fetch(global.serverURL+'front/api/sendMessage?ticketId='+ticketid+"&empId="+empId+"&comment="+this.state.comments, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
     .then(response => response.json())
     .then(responseJson => {
       this.comments.clear();
       this.getMessages();
       this.setState({disabled:false});

      // this.setState({messagebox:''})
     //  console.log(responseJson);
       //this.setState({messageList: responseJson});
    })
    .catch(error => {
         console.error(error);
     });

  }
  update =()=> {
      this.getMessages();
      setInterval(this.getMessages, 5000)

    }


    render() {

        return (
          <View style={styles.container1}>
            <View style={{marginBottom:40}}>
            {this.state.messageList.length>0?(<FlatList style={styles.list1}
              data={this.state.messageList}
               ref={ref => this.flatList = ref}
              ListEmptyComponent={this.ListEmptyView}
              onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
              keyExtractor= {(item) => {
                return item.TicketCommentID;
              }}
              renderItem={(message) => {

                const item = message.item;
                let inMessage = item.type === 'in';
                let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                return (
                  <View style={[styles.item, itemStyle]}>


                    <View style={[styles.balloon]}>
                      <Text style={{paddingTop:1,paddingBottom:10,fontWeight:'bold',fontSize:13}}>{item.EmployeeName}</Text>
                      <Text style={{fontSize:12}}>{item.TicketComment}</Text>

                      <Text style={{paddingTop:10,fontWeight:'bold',fontSize:10}}>{item.CreatedDate}</Text>
                    </View>

                    {inMessage && this.renderDate(item.CreatedDate)}
                  </View>
                )
              }}/>):(null)}
              </View>
            <View style={{flexDirection: 'row',borderColor:'#DCDCDC',borderWidth:1,bottom:0,position:'absolute',width:'100%'}}>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.inputs}
                      ref={input => {
                        this.comments = input
                      }}
                      placeholder="Write a message..."
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.setState({comments:text,disabled:false})}/>
                </View>
                <View >
                  <TouchableOpacity disabled={this.state.disabled}  style={styles.btnSend}  onPress = {() => this.sendMessage()}>
                    <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 14,

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
    justifyContent: 'flex-end',
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    width: 320,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
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
});

export default Chat;
