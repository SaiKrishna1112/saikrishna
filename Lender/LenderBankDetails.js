import React,{useState,useLayoutEffect,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {View,Text,TextInput,ScrollView,TouchableOpacity,ToastAndroid} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome'
import styles from '../src/styles'
import {useSelector} from 'react-redux';
import success from '../navigation/Success';
import error from '../navigation/Error';
import axios from "axios";
import { Root,Popup,Toast} from 'popup-ui'


const LenderBankDetails = ({navigation}) => {

 const userDetails = useSelector(state=>state.counter);
   const userDetail = useSelector(state=>state.logged);
   var access = userDetails.headers.accesstoken;
   var id = userDetails.data.id;
   var bankDetailsInfo = userDetail.bankDetailsInfo

 const [accountNo,setAccountNo]=useState(userDetail.accountNumber);
 const [confirmAccountNo,setconfirmAccountNo]=useState(userDetail.accountNumber);
 const [iFSCCode,setiFSCCode]=useState(userDetail.ifscCode);
 const [name,setName]=useState(userDetail.userName);
 const [bankName,setBankName]=useState(userDetail.bankName);
 const [branch,setBranch]=useState(userDetail.branchName);
 const [bankcity,setBankCity]=useState(userDetail.bankAddress);
 const [hide,setHide]=useState(true);
 const [shouldShow,setshouldShow]=useState(true);
 const[loading,setLoading]=useState(false);

 const errormsg = msg => {
  ToastAndroid.showWithGravity(msg,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  
  );
};


 useLayoutEffect(()=>{
 navigation.setOptions({
  headerRight: () => (
   <Icon name="save" size={24} color='black' style={{marginRight:50}}/>
  ),
 });
 },[]);
 function Verify() {

  if(accountNo==""){
    errormsg("Please Enter Account Number");
   return false;
  }
  if(confirmAccountNo==""){
    errormsg("Please Enter confirm Account Number");
   return false;
  }
  if(iFSCCode==""){
    errormsg("Please Enter IFSC Number");
   return false;
  }
  setLoading(true);
  var data={bankAccount:"026291800001191",ifscCode:"YESB0000262"};
  if(accountNo==confirmAccountNo){
  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/verifyBankAccountAndIfsc',
     data,{headers:{
            accessToken:access
           }
          })
    .then(function (response) {
    //  console.log(response.data.data);
     setName(response.data.data.nameAtBank)
     setBankName(response.data.data.bankName)
     setBranch(response.data.data.branch)
     setBankCity(response.data.data.city)
     setTimeout(function(){
                  setLoading(false);
                  setHide(!hide)
                  setshouldShow(!shouldShow)
              }, 1000);
            })
    .catch(function (error) {
      // console.log(error);
      //  console.log(error.response.data.errorMessage);
      error();
   });
  }
  else{
    errormsg("Please check confirm Account Number");
  }
}
function BankVerification(){
if(bankDetailsInfo==true){
    setshouldShow(false)
    setHide(false)
}else {
   setshouldShow(true)
   setHide(true)
}
}

useEffect(()=>{
 BankVerification();
},[])

 function Banksave(){
  if(name==""){
    errormsg("Please Enter Account Holder Name");
   return false;
  }
  if(bankName==""){
    errormsg("Please Enter Bank Name");
   return false;
  }if(branch==""){
    errormsg("Please Enter Branch Name");
   return false;
  }if(bankcity==""){
    errormsg("Please Enter City");
   return false;
  }
  setLoading(true);
  axios.patch('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/personal/'+id,
     {userName:name,accountNumber:accountNo,ifscCode:iFSCCode,bankName:bankName,branchName:branch,bankAddress:bankcity,confirmAccountNumber:confirmAccountNo},
     { headers:{
            accessToken:access
           }
          })
    .then(function (response) {
      //  console.log(response.data);
        setTimeout(function(){
                  setLoading(false);
                  success();
                }, 1000);
              })
      .catch(function (error) {
        // console.log(error);
        error();
    
      });
    }

 
 return(
  <Root>
  <View style={{marginTop:10,alignSelf:'center',flex:1,height:800}}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
         <TextInput style={{marginLeft:10}} placeholder="Enter Account Number" keyboardType="numeric"  value={accountNo}
         onChangeText={(number)=>setAccountNo(number)}/>
     </View>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
         <TextInput style={{marginLeft:10}} placeholder="Enter Confirm Account Number" keyboardType="numeric" value={confirmAccountNo}
         onChangeText={(number)=>setconfirmAccountNo(number)}/>
     </View>
     <View style={styles.inputbox}>
           <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
         <TextInput style={{marginLeft:10}} placeholder="Enter IFSC code"  value={iFSCCode}
         onChangeText={(text)=>setiFSCCode(text)}/>
     </View>
     {hide ?
        (
         <View>
         <TouchableOpacity style={styles.btn} onPress={Verify}>
           <Text >Verify </Text>
         </TouchableOpacity >
         </View>
        ):null}
      {!shouldShow ?
       (
        <View>
           <View style={styles.inputbox}>
               <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
               <TextInput style={{marginLeft:10}} placeholder="Enter Name As Per Bank " value={name}
               onChangeText={(text)=>setName(text)}/>
           </View>
           <View style={styles.inputbox}>
           <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
               <TextInput style={{marginLeft:10}} placeholder="Enter Bank Name" value={bankName}
               onChangeText={(text)=>setBankName(text)}/>
           </View>
           <View style={styles.inputbox}>
            <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
               <TextInput style={{marginLeft:10}} placeholder="Enter Branch" value={branch}
               onChangeText={(text)=>setBranch(text)}/>
           </View>
           <View style={styles.inputbox}>
             <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
               <TextInput style={{marginLeft:10}} placeholder="Enter City" value={bankcity}
               onChangeText={(text)=>setBankCity(text)}/>
           </View>
           <TouchableOpacity style={styles.btn} onPress={Banksave}>
             <Icon  size={20} style={{alignItems:'flex-start'}} name="save"/>
              <Text>Save</Text>
            </TouchableOpacity >
       </View>
           ):null}
   </View>
   </Root>
 )
}

export default LenderBankDetails;
