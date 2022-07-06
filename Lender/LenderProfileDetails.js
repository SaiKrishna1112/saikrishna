import React,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {View,StyleSheet,Text,TouchableOpacity,Image,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import {FormData} from "formdata-node";
import * as ImagePicker from 'expo-image-picker';
import {useSelector} from 'react-redux';
import axios from 'axios';

import LenderEdit from '../Lender/LenderEdit'
import LenderBankDetails from '../Lender/LenderBankDetails'
import LenderKYCupload from '../Lender/LenderKYCupload'
import LenderNominee from '../Lender/LenderNominee'
import Support from '../Lender/Support'

const LenderProfileDetails=({navigation})=>{

 const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;
 const fd = new FormData();

 const [isVisible,setVisible]=useState(true)
const [loading,setLoading]=useState(false)

  const [imageshow,setimageshow] = useState();
  const [cameraPermissionInformation, requestPermission] = ImagePicker.useCameraPermissions();

 async function verifyPermissions() {
  if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
   const  permissionResponse = await requestPermission();

   return permissionResponse.granted;
  }
  // if(cameraPermissionInformation.status === PermissionStatus.DENIED){
  //  Alert.alert(
  //   'Insufficient Permissions',
  //  );
  //  return false;
  // }
  return true;
 }
  async function takeImageHandler() {
  const hasPermission = await verifyPermissions();

  if(!hasPermission){
   return ;
  }
   const result = await launchCameraAsync({
  type: "*/*",
  allowsEditing: true,
  copyToCacheDirectory: true,
  aspect: [4, 3],
 });
 setimageshow(result.uri)
 console.log(result);
 var name=result.uri.split('/')
 var imageset={
  name:name[name.length - 1],
  uri: result.uri,
  size:(result.height)+(result.width),
  type: "application/jpg"
 }
 //console.log(name[1]);
   fd.append("PROFILEPIC", imageset);
 axios({
    method:'post',
    url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/uploadProfilePic',
    data:fd,
    headers:{
          accessToken:access,
          'Content-Type' :'multipart/form-data',
         }
   })
    .then(function (response) {
     //console.log(response);
     alert("Successfully Upload")
          })
    .catch(function (error) {
     console.log('error',error);
     alert("Not Upload ")
   });
  }

  //------------------------------profile Pic Get Call---------------------------------------------
  const getprofieshowss=()=>{
   setLoading(true)
   axios({
       method:'get',
       url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/PROFILEPIC',
       headers:{
             accessToken:access,
            }
      })
       .then(function (response) {
        //console.log(response.data);
         setimageshow(response.data.downloadUrl);
         setTimeout(function(){
                 setLoading(false);
                },2000)
             })
       .catch(function (error) {
        console.log('error',error);
        console.log(error.response.data.errorMessage);
      });

  }



     let imagePreview = <Text style={{marginTop:120,alignSelf:'center',justifyContent:'center',color:'white'}}>NO Image taken yet.</Text>

      if(imageshow) {
       imagePreview = <Image source={{uri:imageshow }} style={styles.image}/>
      }
    useEffect(()=>{
       getprofieshowss();
      },[]);

return(
       <View style={{alignItems:'center'}}>
         <View style={{height:200,width:400,borderWidth:0.5,position:'absolute',backgroundColor:'black'}}>
           <Image source={require('../assets/background.jpg')} style={{height:250,width:400}}/>
         </View>
         <View>
      <View style={{alignItems:'center',marginTop:10}}>
<TouchableOpacity onPress={takeImageHandler}>
     <View style={styles.imagePreview}>{imagePreview}</View>
  </TouchableOpacity>
</View>
      </View>
            <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>{userDetail.firstName}</Text>
            <Text style={{fontWeight:'bold',fontSize:18}}>ID:  <Text>LR{id}</Text></Text>
            <Text style={{fontWeight:'bold',fontSize:20}}>{userDetail.mobileNumber}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,marginBottom:20}}>{userDetail.email}</Text>
             </View>
            <View>
                <View style={styles.view}>
                <View style={styles.txt}>
                <TouchableOpacity onPress={()=>navigation.navigate('Edit Profile Detail')}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.text}>Profile</Text>
                <Icon  size={20} style={{alignItems:'flex-end'}} name="chevron-forward-outline"/>
                  </View>
                </TouchableOpacity>
                </View>
                </View>


                <View style={styles.view}>
                <View style={styles.txt}>
                <TouchableOpacity onPress={()=>navigation.navigate('Nomine Details')}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.text}>Nomine Details</Text>
                <Icon  size={20} style={{alignItems:'flex-end'}} name="chevron-forward-outline"/>
                 </View>
                </TouchableOpacity>
                </View>
                </View>


                <View style={styles.view}>
                <View style={styles.txt}>
                <TouchableOpacity onPress={()=>navigation.navigate('Bank Detail')}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.text}>Bank Details</Text>
                <Icon  size={20} style={{alignItems:'flex-end'}} name="chevron-forward-outline"/>
                 </View>
                </TouchableOpacity>
                </View>
                </View>

                <View style={styles.view}>
                <View style={styles.txt}>
                <TouchableOpacity onPress={()=>navigation.navigate('KYC Upload')}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.text}>KYC Update</Text>
                <Icon  size={20} style={{alignItems:'flex-end'}} name="chevron-forward-outline"/>
                 </View>
                </TouchableOpacity>
                </View>
                </View>

                <View style={styles.view}>
                <View style={styles.txt}>
                <TouchableOpacity onPress={()=>navigation.navigate('Write To Us')}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.text}>Contact Us</Text>
                <Icon  size={20} style={{alignItems:'flex-end'}} name="chevron-forward-outline"/>
                 </View>
                </TouchableOpacity>
                </View>
                </View>

                <View style={styles.view}>
                <View style={styles.txt}>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.text}>Sign Out</Text>
                <Icon  size={20} style={{alignItems:'flex-end'}} name="chevron-forward-outline"/>
                 </View>
                </TouchableOpacity>
                </View>
                </View>


            </View>

            <View style={{marginTop:300}}>
              <Text>Powered by Oxyloans</Text>
            </View>
        </View>
	)
}

const styles = StyleSheet.create({
 avatar:{
 	height:150,
 	width:150,
 	borderRadius:80,
  borderWidth:1,
  marginBottom:20,
  //position: 'relative',
 },

 view:{
  borderBottomWidth:1,width:280
 },
 text:{
  marginLeft:10,fontSize:20,fontWeight:'bold'
 },
 txt:{
  marginLeft:8,marginBottom:10,marginTop:10
 },
 imagePreview:{
  marginTop:160,
  borderRadius:100,
  width:160,
  height:160,
  backgroundColor:'black'
 },
 image:{
  width:160,
  height:160,
  borderRadius:100
 },
})
export default LenderProfileDetails;
