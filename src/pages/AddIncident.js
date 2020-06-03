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
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import { Field, reduxForm ,change } from 'redux-form';
//import {FormData} from "form-data";

import InputText from "../components/InputText";
import {loginUser} from "../actions/auth.actions";
import Logo from '../components/Logo';
import Form from '../components/Form';
import Loader from "../components/Loader";
import {Actions} from 'react-native-router-flux';
import homeBg from '../images/bg.png';
import SearchableDropdown from 'react-native-searchable-dropdown';
//import ImagePicker from 'react-native-image-picker';
//import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from "@react-native-community/netinfo";
//import RNFetchBlob from 'react-native-fetch-blob';
import Constants from 'expo';
import * as ImagePicker from 'expo-image-picker';
import Permissionsfrom from 'expo';

const options = {
  title: 'Select a File',
  takePhotoButtonTitle:'Take a photo',
  chooseFromLibraryButtonTitle:'Choose from gallery',
  quantity:1
};
import HeaderBgInner from '../components/HeaderBgInner';
import FooterBgInner from '../components/FooterBgInner';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class AddIncident extends Component<{}> {

  constructor(props) {
   super(props);
   this.onSubmit.bind(this)
   this.state = {
      Loading:true,
      serviceData: [],
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
      selectedItemsStoreLocation: [
        {
          id: 1020,
          name: 'Al Raya 20',
        }
      ],
      StoreLocation:'',
      error_subject: '',
      error_detail: '',
      error_category:'',
      error_subcategory:'',
      response_msg:'',
      imageSource:'https://alrayamis.com/uploads/2020-06-02_1591117925_photo.jpg',
      filename:'',
      locationData:[],
      connection:true,

      image1: null,
      uploading1: false,
    }
  }

  async componentDidMount() {

      const {getUser: {userDetails}} = this.props;

        NetInfo.fetch().then(state => {
           if(state.isConnected ==true){
               fetch(global.serverURL+'front/api/getIncidentServices')
               .then(response => response.json())
               .then(responseJson => {

                this.setState({ serviceData: [...this.state.serviceData, ...responseJson],Loading:false});})
              .catch(error => {
                    this.setState({connection:false});
                 });
            }else{
                 this.setState({connection:false});
            }
          });

          NetInfo.fetch().then(state => {
              if(state.isConnected ==true){
                  fetch(global.serverURL+'front/api/getAllCategories')
                  .then(response => response.json())
                  .then(responseJson => {
                      this.setState({ categoryData: [...this.state.categoryData, ...responseJson],Loading:false});})
                  .catch(error => {
                       this.setState({connection:false});
                  });
               }else{
                   this.setState({connection:false});
               }
         });


               if(userDetails.PositionID==74 || userDetails.PositionID==75 || userDetails.PositionID==76)
               {

                 NetInfo.fetch().then(state => {
                     if(state.isConnected ==true){

                       fetch(global.serverURL+'front/api/getStoreLocation')
                       .then(response => response.json())
                       .then(responseJson => {
                        this.setState({ locationData: [...this.state.locationData, ...responseJson],Loading:false});})
                      .catch(error => {
                        this.setState({connection:false});
                         });
                      }else{
                          this.setState({connection:false});
                      }
                });

               }
    }

   getSubCategories = async (value)=>{
     this.setState({Loading:true});
      //  this.setState({Loading:true});
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
     getServiceCategories = async (value)=>{
           this.setState({Loading:true});
           NetInfo.fetch().then(state => {
           if(state.isConnected ==true){
             fetch(global.serverURL+'front/api/getServiceCategories?serviceid='+value)
             .then(response => { return response.json();})
             .then(responseJson => {
               this.setState({
                 CategoryID:responseJson[0].CategoryID,
                 SubCategoryID:responseJson[0].SubCategoryID,
                 CategoryName:responseJson[0].CategoryName,
                 SubCategoryName:responseJson[0].SubCategoryName,
                 Loading:false,
                });

             })
             .catch(error => {
                this.setState({connection:false});
             });
           }else{
               this.setState({connection:false});
           }
         });
       }
     onSubmit = async (values) => {

       const {getUser: {userDetails}} = this.props;

       var  error =2

       if(this.state.CategoryID==null || this.state.CategoryID ==""){
            this.setState({error_category: true});
             error =1
       }else{
         this.setState({error_category: false});
          error =2

       }
       if(this.state.SubCategoryID==null || this.state.SubCategoryID ==""){
            this.setState({error_subcategory:true});
             error =1
       }else{
         this.setState({error_subcategory: false});
          error =2
       }

       if(this.state.subject =='subject'  || this.state.subject ==""){
             this.setState({error_subject:1});
             error =1
      }else{
             this.setState({error_subject: 2});
              error =2
      }
     if(this.state.detail =='detail'  || this.state.detail ==""){
             this.setState({error_detail: 1});
             error =1
       }else{
             this.setState({error_detail: 2});
              error =2
       }
  //   }

     if(error ==1){
         this.setState({Loading:false});

        return false;
      }else{

        if(this.state.StoreLocation){
            var location = this.state.StoreLocation
        }else{
            var location = 1020;
        }


        if(this.state.filename){


          var data = { serviceId:this.state.serviceid,
                       categoryId: this.state.CategoryID,
                       subCategoryId: this.state.SubCategoryID,
                       subject: this.state.subject,
                       detail: this.state.detail,
                       employeeId: userDetails.EmployeeID,
                       departmentId: userDetails.DepartmentID,
                       positionId: userDetails.PositionID,
                       StoreLocation: location,
                       requestId: 4,
                       ticketdep:'MIS',
                       priority:'Medium',
                       file:this.state.filename,
                    }
        }else{

          var data = { serviceId:this.state.serviceid,
                       categoryId: this.state.CategoryID,
                       subCategoryId: this.state.SubCategoryID,
                       subject: this.state.subject,
                       detail: this.state.detail,
                       employeeId: userDetails.EmployeeID,
                       departmentId: userDetails.DepartmentID,
                       positionId: userDetails.PositionID,
                       StoreLocation: location,
                       requestId: 4,
                       ticketdep:'MIS',
                       priority:'Medium',
                    }

        }

        NetInfo.fetch().then(state => {
        if(state.isConnected ==true){
          this.setState({Loading:true});
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
    uploadPic = () => {
      // alert('ddf');
      this.setState({Loading:true});
      RNFetchBlob.fetch('POST', global.serverURL+'upload.php', {
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
      });
    }
    _maybeRenderUploadingOverlay = () => {
      if (this.state.uploading) {
        return (
          <View
            style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
            <ActivityIndicator color="#fff" size="large" />
          </View>
        );
      }
    };

    _maybeRenderImage = () => {
      let {
        image
      } = this.state;

      if (!image) {
        return;
      }

      return (
        <View
          style={styles.maybeRenderContainer}>
          <View
            style={styles.maybeRenderImageContainer}>
            <Image source={{ uri: image }} style={styles.maybeRenderImage} />
          </View>

          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={styles.maybeRenderImageText}>
            {image}
          </Text>
        </View>
      );
    };

    _share = () => {
      Share.share({
        message: this.state.image,
        title: 'Check out this photo',
        url: this.state.image,
      });
    };

    _copyToClipboard = () => {
      Clipboard.setString(this.state.image);
      alert('Copied image URL to clipboard');
    };

    _takePhoto = async () => {

      // only if user allows permission to camera AND camera roll
    //  if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    //  }
    };

    _pickImage = async () => {

    //  Alert.alert('1212')
    //  if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    //  }
    };

    _handleImagePicked = async pickerResult => {
      let uploadResponse, uploadResult;

      try {
        this.setState({
          loading: true

        });

        if (!pickerResult.cancelled) {

          uploadResponse = await this.uploadImageAsync(pickerResult.uri);

          uploadResult = await uploadResponse.json();
          this.setState({
            imageSource:  global.serverURL+'uploads/'+uploadResult.filename,
            filename: uploadResult.filename
          });
          Alert.alert(this.state.imageSource);

        }else{
          this.setState({
            loading: false

          });
        }
      } catch (e) {
        console.log({ uploadResponse });
        console.log({ uploadResult });
        console.log({ e });
      //  alert('Upload failed, sorry :(');
      }
    };
  uploadImageAsync = async (uri) => {

  let apiUrl = global.serverURL+'upload.php';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });


  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
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

	   render() {
      const { handleSubmit,onSubmit} = this.props;
      const {getUser: {userDetails}} = this.props;
		return(


 <View  style={{flex:1,alignItems:'center',justifyContent:'center'}} >
               <HeaderBgInner />
               {this.state.Loading === true ? <Loader /> : null}
			<ScrollView contentContainerStyle={{ flexGrow: 1 ,justifyContent:'center'}} style={{textAlign:'center'}}  keyboardShouldPersistTaps="always">




<View style={{flex:1,textAlign:'center',justifyContent:'center'}} >
      <SearchableDropdown  style={styles.inputBox}
          onChangeText={(text) => this.setState({serviceid: text})}
          selectedItems={this.state.selectedItems}
          onItemSelect={(item) => {
              const items = this.state.selectedItems;
              this.setState({ serviceid: item.id});
              this.getServiceCategories(JSON.stringify(item.id))
         }}

          containerStyle={{ padding: 5 }}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 15,
            color: '#000',
            width:300
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
          textInputProps={
              {
               onTextChange: text => this.setState({serviceid: text})
             }
           }

          items={this.state.serviceData}
          defaultIndex={0}
          placeholder="Select Service"
          name="serviceid"
          resetValue={false}
          underlineColorAndroid="transparent"

        />
        {this.state.serviceid ?
          (
            <TextInput style={styles.inputBox}
                  name="categoryid"
                  value={this.state.CategoryName}
                  placeholder="Category"
                  editable={false}
                  selectTextOnFocus={false}
                  onChangeText={(text) => this.setState({CategoryID: text})}
            />
          ):(
            <SearchableDropdown  style={styles.inputBox}
                onChangeText={(text) => this.setState({CategoryID: text})}
                selectedItems={this.state.selectedItemsCat}
                onItemSelect={(item) => {
                    const items = this.state.selectedItemsCat;
                    this.setState({ CategoryID:item.id });
                    this.getSubCategories(JSON.stringify(item.id))
                }}

                containerStyle={{ padding: 5 }}
                ref={r=>this.serviceidInput=r}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 15,
                  color: '#000',
                  width:300
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
                itemsContainerStyle={{ maxHeight: 130 }}
                textInputProps={
                    {
                     onTextChange: text => this.setState({CategoryID: text})
                   }
                 }
                itemsContainerStyle={{ maxHeight: 240 }}
                items={this.state.categoryData}
                defaultIndex={0}
                placeholder="Select Category"
                name="categoryid"
                resetValue={false}
                underlineColorAndroid="transparent"
              />
          )
        }
{this.state.error_category?<Text style={{color:'red'}}>This is required field.</Text>:null}
      {this.state.serviceid ?
        (
          <TextInput style={styles.inputBox}
                name="subcategoryid"
                value={this.state.SubCategoryName}
                editable={false}
                selectTextOnFocus={false}
                placeholder="Sub Category"
                onChangeText={(text) => this.setState({SubCategoryID: text})}
          />
        ):(
          <SearchableDropdown  style={styles.inputBox}
              onChangeText={(text) => this.setState({SubCategoryID: text})}
              selectedItems={this.state.selectedItemsSubCat}
              onItemSelect={(item) => {
                  const items = this.state.selectedItemsSubCat;
                  this.setState({ SubCategoryID: item.id });
              }}

              containerStyle={{ padding: 5 }}
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 15,
                color: '#000',
                width:300
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
              itemsContainerStyle={{ maxHeight: 130 }}
              textInputProps={
                  {
                   onTextChange: text => this.setState({SubCategoryID: text})
                 }
               }
              itemTextStyle={{ color: '#000' }}
              items={this.state.subCategoryData}
              defaultIndex={0}
              placeholder="Select Sub Category"
              name="subcategoryid"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          )

      }
      {this.state.error_subcategory?<Text style={{color:'red'}}>This is required field.</Text>:null}
    {userDetails.PositionID==74 || userDetails.PositionID==75 || userDetails.PositionID==76?(
      <SearchableDropdown  style={styles.inputBox}
          onChangeText={(text) => this.setState({StoreLocation: text})}
          selectedItems={this.state.selectedItemsStoreLocation}
          onItemSelect={(item) => {
              const items = this.state.selectedItemsStoreLocation;
              this.setState({ StoreLocation:item.id});
          }}

          containerStyle={{ padding: 5 }}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 15,
            color: '#000',
            width:300
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
          textInputProps={
              {
               onTextChange: text => this.setState({StoreLocation: text})
             }
           }
          items={this.state.locationData}
          defaultIndex={10}
          placeholder="Select Store Location"
          name="storeLocation"
          resetValue={false}
          underlineColorAndroid="transparent"
        />

    ):null}

        <TextInput style={styles.inputBox}
            name="subject"

            placeholder="Subject"
            onChangeText={(text) => this.setState({subject: text,error_subject:false})}
        />

        {this.state.error_subject==1?<Text  style={{color:'red'}}>This is required field.</Text>:null}
        <TextInput style={styles.inputBox}
                name="detail"
                multiline={true}
                numberOfLines={Platform.OS === 'ios' ? null : 4}
                minHeight={(Platform.OS === 'ios' && 4) ? (20 * 4) : 80}
                placeholder="Detail"

                onChangeText={(text) => this.setState({detail: text,error_detail:false})}
       />
       {this.state.error_detail==1?<Text style={{color:'red'}}>This is required field.</Text>:null}
       {this.state.imageSource?<Image style={{width:300,height:200,marginBottom:10}} source={{uri:this.state.imageSource?'https://alrayamis.com/uploads/2020-06-02_1591117925_photo.jpg':'https://alrayamis.com/uploads/2020-06-02_1591117925_photo.jpg'}} />:null}

       <Button style={[styles.button,{backgroundColor:'white',borderColor:'green',borderWidth:1}]}
                 onPress={this._pickImage}
                 title="Pick an image from camera roll"
               />

               <Button style={[styles.button,{backgroundColor:'white',borderColor:'green',borderWidth:1}]} onPress={this._takePhoto} title="Take a photo" />


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
  	fontSize:16,
    fontWeight:'bold'
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
    paddingVertical: 13
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
    form: "AddIncident"
  })
)(AddIncident);
//  enableReinitialize: true,
//  destroyOnUnmount: false
