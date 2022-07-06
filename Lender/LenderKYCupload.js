import React,{useState,useLayoutEffect,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {View,Text,TextInput,ScrollView,TouchableOpacity} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import {FormData} from "formdata-node";
import axios from "axios"
import {useSelector} from 'react-redux';
import styles from '../src/styles'


const LenderKYCupload = ({navigation}) => {

 const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;

   const [panPic,setPanPic]=useState("PAN Upload");
   const [chequePic,setChequePic]=useState("Cheque Upload");
   const [aadharPic,setAadharPic]=useState("Aadhar Upload");
   const [voterPic,setvoterPic]=useState("VoterID Upload");
   const [driving,setDrivingPic]=useState("Driving Licence Upload");
   const [passportPic,setPassportPic]=useState("Passport Upload");
   const fd = new FormData();

//============================DocumentPicker=====================================//
const panDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
   type: "*/*",
   copyToCacheDirectory: true,
   allowsEditing: false,
   aspect: [4, 3],
 })
 .then(response => {
   if (response.type == 'success') {
     let { name, size, uri } = response;

  // ------------------------/
     if (Platform.OS === "android" && uri[0] === "/") {
        uri = `file://${uri}`;
        console.log(uri);
        uri = uri.replace(/%/g, "%25");
        console.log(uri);
     }
 // ------------------------/

     let nameParts = name.split('.');
     let fileType = nameParts[nameParts.length - 1];
     var fileToUpload = {
       name: name,
       size: size,
       uri: uri,
       type: "application/" + fileType
     };
    // console.log(fileToUpload.name, '...............file')
     fd.append("PAN", fileToUpload);
  axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/kyc',
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
       console.log(error.response.data.errorMessage);
     });
     setPanPic(fileToUpload.name);
   }
 });
}

const chequeDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
   type: "*/*",
   copyToCacheDirectory: true,
   allowsEditing: false,
   aspect: [4, 3],
 })
 .then(response => {
   if (response.type == 'success') {
     let { name, size, uri } = response;

  // ------------------------/
     if (Platform.OS === "android" && uri[0] === "/") {
        uri = `file://${uri}`;
        console.log(uri);
        uri = uri.replace(/%/g, "%25");
        console.log(uri);
     }
 // ------------------------/

     let nameParts = name.split('.');
     let fileType = nameParts[nameParts.length - 1];
     var fileToUpload = {
       name: name,
       size: size,
       uri: uri,
       type: "application/" + fileType
     };
     //console.log(fileToUpload.name, '...............file')
     fd.append("CHEQUELEAF", fileToUpload);
  axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/kyc',
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
       console.log(error.response.data.errorMessage);
     });
     setChequePic(fileToUpload.name);
   }
 });
}

const aadharDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
   type: "*/*",
   copyToCacheDirectory: true,
   allowsEditing: false,
   aspect: [4, 3],
 })
 .then(response => {
   if (response.type == 'success') {
     let { name, size, uri } = response;

  // ------------------------/
     if (Platform.OS === "android" && uri[0] === "/") {
        uri = `file://${uri}`;
        console.log(uri);
        uri = uri.replace(/%/g, "%25");
        console.log(uri);
     }
 // ------------------------/

     let nameParts = name.split('.');
     let fileType = nameParts[nameParts.length - 1];
     var fileToUpload = {
       name: name,
       size: size,
       uri: uri,
       type: "application/" + fileType
     };
     //console.log(fileToUpload.name, '...............file')
     fd.append("AADHAR", fileToUpload);
  axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/kyc',
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
       console.log(error.response.data.errorMessage);
     });
     setAadharPic(fileToUpload.name);
   }
 });
}
const voterDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
   type: "*/*",
   copyToCacheDirectory: true,
   allowsEditing: false,
   aspect: [4, 3],
 })
 .then(response => {
   if (response.type == 'success') {
     let { name, size, uri } = response;

  // ------------------------/
     if (Platform.OS === "android" && uri[0] === "/") {
        uri = `file://${uri}`;
        console.log(uri);
        uri = uri.replace(/%/g, "%25");
        console.log(uri);
     }
 // ------------------------/

     let nameParts = name.split('.');
     let fileType = nameParts[nameParts.length - 1];
     var fileToUpload = {
       name: name,
       size: size,
       uri: uri,
       type: "application/" + fileType
     };
     //console.log(fileToUpload.name, '...............file')
     fd.append("VOTERID", fileToUpload);
  axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/kyc',
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
       console.log(error.response.data.errorMessage);
     });
     setvoterPic(fileToUpload.name);
   }
 });
}
const drivingDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
   type: "*/*",
   copyToCacheDirectory: true,
   allowsEditing: false,
   aspect: [4, 3],
 })
 .then(response => {
   if (response.type == 'success') {
     let { name, size, uri } = response;

  // ------------------------/
     if (Platform.OS === "android" && uri[0] === "/") {
        uri = `file://${uri}`;
        console.log(uri);
        uri = uri.replace(/%/g, "%25");
        console.log(uri);
     }
 // ------------------------/

     let nameParts = name.split('.');
     let fileType = nameParts[nameParts.length - 1];
     var fileToUpload = {
       name: name,
       size: size,
       uri: uri,
       type: "application/" + fileType
     };
     //console.log(fileToUpload.name, '...............file')
     fd.append("DRIVINGLICENCE", fileToUpload);
  axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/kyc',
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
       console.log(error.response.data.errorMessage);
     });
     setDrivingPic(fileToUpload.name);
   }
 });
}
const passportDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
   type: "*/*",
   copyToCacheDirectory: true,
   allowsEditing: false,
   aspect: [4, 3],
 })
 .then(response => {
   if (response.type == 'success') {
     let { name, size, uri } = response;

  // ------------------------/
     if (Platform.OS === "android" && uri[0] === "/") {
        uri = `file://${uri}`;
        console.log(uri);
        uri = uri.replace(/%/g, "%25");
        console.log(uri);
     }
 // ------------------------/

     let nameParts = name.split('.');
     let fileType = nameParts[nameParts.length - 1];
     var fileToUpload = {
       name: name,
       size: size,
       uri: uri,
       type: "application/" + fileType
     };
     //console.log(fileToUpload.name, '...............file')
     fd.append("PASSPORT", fileToUpload);
  axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/kyc',
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
       console.log(error.response.data.errorMessage);
     });
     setPassportPic(fileToUpload.name);
   }
 });
}

////////---------------------------------get Profile---------------------------------

const getpan=()=>{
 axios({
     method:'get',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/PAN',
     headers:{
           accessToken:access,
          }
    })
     .then(function (response) {
      //console.log(response.data);
      setPanPic(response.data.fileName);
           })
     .catch(function (error) {
      console.log('error',error);
      console.log(error.response.data.errorMessage);
    });

}
const getcheque=()=>{
 axios({
     method:'get',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/CHEQUELEAF',
     headers:{
           accessToken:access,
          }
    })
     .then(function (response) {
      //console.log(response.data);
       setChequePic(response.data.fileName);
           })
     .catch(function (error) {
      console.log('error',error);
      console.log(error.response.data.errorMessage);
    });

}
const getaadhar=()=>{
 axios({
     method:'get',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/AADHAR',
     headers:{
           accessToken:access,
          }
    })
     .then(function (response) {
      //console.log(response.data);
       setAadharPic(response.data.fileName);
           })
     .catch(function (error) {
      console.log('error',error);
      console.log(error.response.data.errorMessage);
    });

}

const getvoter=()=>{
 axios({
     method:'get',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/VOTERID',
     headers:{
           accessToken:access,
          }
    })
     .then(function (response) {
      //console.log(response.data);
      setvoterPic(response.data.fileName);
           })
     .catch(function (error) {
      console.log('error',error);
      console.log(error.response.data.errorMessage);
    });

}

const getdriving=()=>{
 axios({
     method:'get',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/DRIVINGLICENCE',
     headers:{
           accessToken:access,
          }
    })
     .then(function (response) {
      //console.log(response.data);
      setDrivingPic(response.data.fileName);
           })
     .catch(function (error) {
      console.log('error',error);
      console.log(error.response.data.errorMessage);
    });

}

const getpass=()=>{
 axios({
     method:'get',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/PASSPORT',
     headers:{
           accessToken:access,
          }
    })
     .then(function (response) {
      //console.log(response.data);
      setPassportPic(response.data.fileName);
           })
     .catch(function (error) {
      console.log('error',error);
      console.log(error.response.data.errorMessage);
    });

}

useEffect(()=>{
 getpan();
 getcheque();
 getaadhar();
 getvoter();
 getdriving();
 getpass();
},[])

 return(
  <View style={{marginTop:20,alignSelf:'center',flex:1,height:800}}>
   <TouchableOpacity onPress={panDocument}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="cloud-upload"/>
         <Text style={styles.txt4}>{panPic}</Text>
              <View style={styles.btn}>
                 <Text>Upload</Text>
              </View>
     </View>
   </TouchableOpacity>


   <TouchableOpacity onPress={chequeDocument}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="cloud-upload"/>
         <Text style={styles.txt4}>{chequePic}</Text>
            <View style={styles.btn}>
              <Text>Upload</Text>
            </View>
     </View>
   </TouchableOpacity>
    <View style={{marginTop:10,marginBottom:10}}>
       <Text style={{fontWeight:'bold',marginLeft:80}}>Upload Anyone in the following</Text>
       <Text style={{fontWeight:'bold',marginLeft:52}}>Aadhar,voterID,Passport,Driving Licence</Text>
    </View>
   <TouchableOpacity onPress={aadharDocument}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="cloud-upload"/>
         <Text style={styles.txt4}>{aadharPic}</Text>
             <View style={styles.btn}>
               <Text>Upload</Text>
             </View>
     </View>
   </TouchableOpacity>

   <TouchableOpacity onPress={voterDocument}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="cloud-upload"/>
         <Text style={styles.txt4}>{voterPic}</Text>
               <View style={styles.btn}>
                     <Text>Upload</Text>
               </View>
     </View>
   </TouchableOpacity>

   <TouchableOpacity onPress={drivingDocument}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="cloud-upload"/>
         <Text style={styles.txt4}>{driving}</Text>
            <View style={styles.btn}>
               <Text>Upload</Text>
         </View>
     </View>
   </TouchableOpacity>

   <TouchableOpacity onPress={passportDocument}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="cloud-upload"/>
         <Text style={styles.txt4}>{passportPic}</Text>
              <View style={styles.btn}>
                <Text>Upload</Text>
           </View>
     </View>
   </TouchableOpacity>
 </View>
 )
}

export default LenderKYCupload;
