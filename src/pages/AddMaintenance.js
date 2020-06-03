import React, { Component , Fragment  } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  Picker,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import { Field, reduxForm ,change } from 'redux-form';

import { Container, Header, Content, ListItem, Radio, Right,Left } from 'native-base';
//import RNFetchBlob from 'rn-fetch-blob'
import InputText from "../components/InputText";
import {loginUser} from "../actions/auth.actions";
import Logo from '../components/Logo';
import Form from '../components/Form';
import Loader from "../components/Loader";
import {Actions} from 'react-native-router-flux';
import homeBg from '../images/bg.png';
import SearchableDropdown from 'react-native-searchable-dropdown';
import ImagePicker from 'react-native-image-picker';
import HeaderBgInner from '../components/HeaderBgInner';
import FooterBgInner from '../components/FooterBgInner';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NetInfo from "@react-native-community/netinfo";

const options = {
  title: 'Select a File',
  takePhotoButtonTitle:'Take a photo',
  chooseFromLibraryButtonTitle:'Choose from gallery',
  quantity:1
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class AddIncident extends Component<{}> {

  constructor(props) {
   super(props);
   this.onSubmit.bind(this)
   this.state = {
     connection:true,
      Loading:true,
      categoryData:[],
      subCategoryData:[],
      CatIdTxt:'',
      SubCatIdTxt:'',
      CategoryID : '',
      SubCategoryID: '',
      CategoryName:'',
      SubCategoryName:'',
      fetching_from_server: false,
      subject:'subject',
      detail:'detail',
      value: "",
      pic:null,
      selectedItems: [
        {
          id: '',
          name: '',
        }
      ],
      selectedItemsCat: [
        {
          id: '',
          name: '',
        }
      ],
      selectedItemsSubCat: [
        {
          id: '',
          name: '',
        }
      ],
      StoreLocation:'',
      error_subject: '',
      error_detail: '',
      error_category:'',
      error_subcategory:'',
      response_msg:'',
      imageSource:null,
      filename:'',
      locationData:[],
      departmenttype: 'Maintenance',
      serviceid:476,
      requestID:5,

    }
  }

  componentDidMount() {

      this.getMaintenanceCategories()
  }
   getMaintenanceCategories = async (value)=>{
      //  this.setState({Loading:true});
      NetInfo.fetch().then(state => {
      if(state.isConnected ==true){

        fetch(global.serverURL+'front/api/getMaintenanceCategories')
       .then(response => { return response.json();})
         .then(responseJson => {
            this.setState({categoryData:[]});
            this.setState({categoryData: [...this.state.categoryData, ...responseJson],Loading:false});})
         .catch(error => {
           this.setState({connection:false});
      });
    }else{
        this.setState({connection:false});
    }
  });

   }
   getOperationCategories = async (value)=>{
     this.setState({Loading:true});
     NetInfo.fetch().then(state => {
     if(state.isConnected ==true){

       fetch(global.serverURL+'front/api/getOperationCategories')
      .then(response => { return response.json();})
         .then(responseJson => {
            this.setState({categoryData:[]});
            this.setState({categoryData: [...this.state.categoryData, ...responseJson],Loading:false});})
         .catch(error => {
           this.setState({connection:false,Loading:false});
      });
    }else{
        this.setState({connection:false,Loading:false});
    }
  });
   }
   getSubCategories = async (value)=>{
     this.setState({Loading:true});
     NetInfo.fetch().then(state => {
     if(state.isConnected ==true){
       fetch(global.serverURL+'front/api/getSubCategories?categoryid='+value)
      .then(response => { return response.json();})
         .then(responseJson => {
            this.setState({subCategoryData:''});
            this.setState({subCategoryData: [...this.state.subCategoryData, ...responseJson],Loading:false});})
         .catch(error => {
           this.setState({connection:false,Loading:false});
      });
    }else{
        this.setState({connection:false,Loading:false});
    }
  });
    }
    changeDepartment = async (dept)=>{
          if(dept =='Maintenance'){
               this.setState({departmenttype:'Maintenance'});
               this.setState({serviceid:576});
               this.setState({requestID:5});
               this.getMaintenanceCategories();
          }else{
              this.setState({departmenttype:'Operation'});
              this.setState({serviceid:574});
              this.setState({requestID:6});
              this.getOperationCategories()
          }
    }
     onSubmit = async (values) => {
       const {getUser: {userDetails}} = this.props;
       var error = 2;

       if(this.state.CategoryID==null || this.state.CategoryID ==""){
            this.setState({error_category: 1});
             error =1

       }else{
         this.setState({error_category:2});
          error =2

       }
       if(this.state.SubCategoryID==null || this.state.SubCategoryID ==""){
            this.setState({error_subcategory: 1});
             error =1
       }else{
         this.setState({error_subcategory:2});
          error =2
       }
           if(this.state.subject =='subject'  || this.state.subject ==''){
             this.setState({error_subject:1});
 error =1

           }else{
             this.setState({error_subject:2});
              error =2
           }
           if(this.state.detail =='detail' || this.state.detail ==''){
             this.setState({error_detail: 1});
              error =1
           }else{
             this.setState({error_detail:2});
              error =2
           }

           if(error==1){

               this.setState({Loading:false});
              return false;
            }else{

                  this.setState({Loading:true});
                  if(this.state.StoreLocation){
                      var location = this.state.StoreLocation
                  }else{
                      var location = 1020;
                  }

                  if(this.state.departmenttype =='Operation'){
                    var serviceId = 474;
                  }else{
                    var serviceId = 476;
                  }

                  if(this.state.filename){


                    var data = { serviceId:serviceId,
                                 categoryId: this.state.CategoryID,
                                 subCategoryId: this.state.SubCategoryID,
                                 subject: this.state.subject,
                                 detail: this.state.detail,
                                 employeeId: userDetails.EmployeeID,
                                 departmentId: userDetails.DepartmentID,
                                 positionId: userDetails.PositionID,
                                 StoreLocation: location,
                                 requestId: this.state.requestID,
                                 ticketdep:this.state.departmenttype,
                                 priority:'Medium',
                                 file:this.state.filename,
                              }
                  }else{

                    var data = { serviceId:serviceId,
                                 categoryId: this.state.CategoryID,
                                 subCategoryId: this.state.SubCategoryID,
                                 subject: this.state.subject,
                                 detail: this.state.detail,
                                 employeeId: userDetails.EmployeeID,
                                 departmentId: userDetails.DepartmentID,
                                 positionId: userDetails.PositionID,
                                 StoreLocation: location,
                                 requestId: this.state.requestID,
                                 ticketdep: this.state.departmenttype,
                                 priority: 'Medium',
                              }

                  }

                  NetInfo.fetch().then(state => {
                  if(state.isConnected ==true){
                    fetch(global.serverURL+'front/api/saveTicket', {
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
                            this.setState({response_msg:responseData,Loading:false});
                       }).catch((error) => {
                         this.setState({connection:false,Loading:false});
                    });
                  }else{
                      this.setState({connection:false,Loading:false});
                  }
                });
             }
     }

     selectPhoto(){

         ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           const source = { uri: response.uri };

           this.setState({
             imageSource: source,
             pic:response.data
           });
           this.uploadPic();
         }
         });
     }
     uploadPic = () => {
       // alert('ddf');
       this.setState({Loading:true});
      /* RNFetchBlob.fetch('POST', global.serverURL+'upload.php', {
         Authorization : "Bearer access-token",
         otherHeader : "foo",
         'Content-Type' : 'multipart/form-data',
       }, [
         // element with property `filename` will be transformed into `file` in form data
         { name : 'image', filename : 'up.png', data: this.state.pic}
       ]).then((res) => {
         return res.json();
       }).then((obj) => {
         this.setState({Loading:false});
         this.setState({
           filename: obj.filename

         });
       });*/
     }
	   render() {
      const { handleSubmit,onSubmit} = this.props;
      const {getUser: {userDetails}} = this.props;
		return(

      <View  style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                    <HeaderBgInner />
                    {this.state.Loading === true ? <Loader /> : null}
           <ScrollView contentContainerStyle={{ flexGrow: 1 ,justifyContent:'center'}} style={{textAlign:'center'}}  keyboardShouldPersistTaps="always">
           <View style={{flex:1,textAlign:'center',justifyContent:'center'}} >


           <View>
            <ListItem style={{width:300,marginLeft:20,marginRight:20}}>
              <Left>
                <Text style={{fontWeight:'bold'}}>Maintenance Request</Text>
              </Left>
              <Right>
              <Radio style={{borderColor:'grey',borderWidth:1,width:20,height:20}} onPress={() => this.changeDepartment('Maintenance')}
                   selected={this.state.departmenttype == 'Maintenance'}
                 />
              </Right>
            </ListItem>
            <ListItem style={{width:300,marginLeft:20,marginRight:20}}>
              <Left>
                <Text  style={{fontWeight:'bold'}}>Operation Request</Text>
              </Left>
              <Right>
              <Radio  style={{borderColor:'grey',borderWidth:1,width:20,height:20}} onPress={() => this.changeDepartment('Operation')}
                 selected={this.state.departmenttype == 'Operation'}
               />
              </Right>
            </ListItem>
          </View>
          <SearchableDropdown  style={styles.inputBox}
                onChangeText={(text) => this.setState({CategoryID: text})}
                selectedItems={this.state.selectedItemsCat}
                onItemSelect={(item) => {
                    const items = this.state.selectedItemsCat;
                    this.setState({ CategoryID: item.id});

                    this.getSubCategories(JSON.stringify(item.id))
                }}
                textInputProps={
                    {
                     onTextChange: text => this.setState({CategoryID: text})
                   }
                 }
                containerStyle={{ padding: 5 }}
                ref={r=>this.serviceidInput=r}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 15,
                  color: '#000',
                  width:300,
                  marginLeft:10,
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 15,
                  color: '#000',
                }}
                itemTextStyle={{ color: '#000' }}
                itemsContainerStyle={{ maxHeight: 240 }}
                items={this.state.categoryData}
                defaultIndex={0}
                placeholder="Select Category"
                name="categoryid"
                resetValue={false}
                underlineColorAndroid="transparent"
              />
              {this.state.error_category==1?<Text style={{color:'red'}}>This is required field.</Text>:null}
              <SearchableDropdown  style={styles.inputBox}
                onChangeText={(text) => this.setState({SubCategoryID: text})}
                selectedItems={this.state.selectedItemsSubCat}
                onItemSelect={(item) => {
                    const items = this.state.selectedItemsSubCat;
                    this.setState({ SubCategoryID:item.id });
                }}

                containerStyle={{ padding: 5 }}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 15,
                  color: '#000',
                  width:300,
                  marginLeft:10,
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 15,
                  color: '#000',
                }}
                itemTextStyle={{ color: '#000' }}
                itemsContainerStyle={{ maxHeight: 240 }}
                items={this.state.subCategoryData}
                defaultIndex={0}
                placeholder="Select Sub Category"
                name="subcategoryid"
                resetValue={false}
                underlineColorAndroid="transparent"
                textInputProps={
                    {
                     onTextChange: text => this.setState({SubCategoryID: text})
                   }
                 }
              />
              {this.state.error_subcategory==1?<Text style={{color:'red'}}>This is required field.</Text>:null}
              <TextInput style={styles.inputBox}
                  name="subject"

                  placeholder="Subject"
                  onChangeText={(text) => this.setState({subject: text,error_subject:''})}
              />
              {this.state.error_subject==1?<Text style={{color:'red'}}>This is required field.</Text>:null}
              <TextInput style={styles.inputBox}
                      name="detail"
                      multiline={true}
                      nnumberOfLines={Platform.OS === 'ios' ? null : 4}
                      minHeight={(Platform.OS === 'ios' && 4) ? (20 * 4) : 80}
                      placeholder="Detail"

                      onChangeText={(text) => this.setState({detail: text,error_detail:''})}
             />
             {this.state.error_detail==1?<Text style={{color:'red'}}>This is required field.</Text>:null}
            {this.state.imageSource?<Image style={{width:300,height:100}} source={this.state.imageSource?this.state.imageSource:null} />:null}
            <TouchableOpacity style={[styles.button,{backgroundColor:'white',borderColor:'green',borderWidth:1}]} onPress={this.selectPhoto.bind(this)}>
              <Text style={[styles.buttonText,{color:'black',fontWeight:'bold'}]}>Select File</Text>
            </TouchableOpacity>
            {this.state.response_msg?<Text  style={{color:'green'}}>Ticket#{this.state.response_msg} has been created successfully</Text>:null}
            <TouchableOpacity style={styles.button} onPress={this.onSubmit.bind(this)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
             </View>

               </ScrollView>

             </View>

			)
	}
  renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength,value, keyboardType, placeholder, input: {onChange, ...restInput}} = field;

        return (
            <View>
              <InputText
                  onChangeText={onChange}
                  maxLength={maxLength}
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                  value={field.input.value}
                  currentValue={{val: field.input.value}}
                  thingsChanged={param => field.input.onChange(param.val)}
                  label={label}
                  {...restInput} />
            {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'transparent',

    alignItems:'center',
    justifyContent :'center',

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
    marginVertical: 10,
      height: Platform.OS === 'ios' ? 40 :40,
      marginLeft:10,
  },
  dropdown :{
    width:200,
    height:30,
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
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  button: {
    width:300,
    backgroundColor:'#00acac',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    marginLeft:10,
  },
  buttonText: {
    fontSize:16,
    color:'#ffffff',
    textAlign:'center',
    fontWeight:'bold'
  },
  errorText:{
    color:'red'
  }
});
const validate = (values) => {
    const errors = {};
    if(!values.name) {
        errors.name = "Name is required"
    }
    if(!values.email) {
        errors.email = "Email is required"
    }
    if(!values.password) {
        errors.password = "Name is required"
    }
    return errors;
};

mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser

})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  reduxForm({
    form: "AddIncident",


  })
)(AddIncident);
//  enableReinitialize: true,
//  destroyOnUnmount: false
