import React,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {View,Text,TextInput,StyleSheet,ScrollView,TouchableOpacity,FlatList,ToastAndroid} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome'
 import styles from '../src/styles'
import {useSelector} from 'react-redux';
import { Root,Popup,Toast} from 'popup-ui'
import success from '../navigation/Success';
import error from '../navigation/Error';
import axios from 'axios';

function LenderNominee({navigation}) {

 const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;

 const [relation,setrelation]=useState("");
 const [nomineeEmail,setNomineeEmail]=useState("");
 const [nomineeNumber,setNomineeNumber]=useState();
 const [nomineename,setnomineename]=useState("");
 const [nomineeaccount,setnomineeaccount]=useState();
 const [nomineebankname,setnomineebankname]=useState("");
 const [nomineebranchname,setnomineebranchname]=useState("");
 const [nomineebankcity,setnomineebankcity]=useState("");
 const [nomineeifscCode,setnomineeifscCode]=useState("");
 const[loading,setLoading]=useState(false);

 const errormsg = msg => {
    ToastAndroid.showWithGravity(msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    
    );
  };

function getnomineedetails(){
    axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/nominee/'+id+"",{
        headers:{
            accessToken:access
        }
    })
    .then(function (response) {
        //    console.log(response.data);
           setTimeout(function(){
                    setLoading(false);
                    }, 1000);
                  })
          .catch(function (error) {
            // console.log(error);
            error();
         });
}



 function referenceDetailSave() {
    if(nomineename==""){
        errormsg("Please Enter Nominee Name");
     return false;
    }
    if(nomineebankname==""){
        errormsg("Please Enter Bank Name");
     return false;
    }if(nomineebranchname==""){
        errormsg("Please Enter Branch Name");
     return false;
    }if(nomineebankcity==""){
        errormsg("Please Enter City");
     return false;
    }
    if(nomineeEmail==""){
        errormsg("Please Enter Email");
     return false;
    }
    if(nomineeifscCode==""){
        errormsg("Please Enter iFSC Code");
     return false;
    }
    if(relation==""){
        errormsg("Please Enter Relation");
     return false;
    }
    if(nomineeNumber==""){
        errormsg("Please Enter Mobile Number");
     return false;
    }
    if(nomineeaccount==""){
        errormsg("Please Enter Account Number");
     return false;
    }
    setLoading(true);
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/nominee',
    {
     accountNumber: nomineeaccount,
     bankName: nomineebankname,
     branchName: nomineebranchname,
     city: nomineebankcity,
     email: nomineeEmail,
     ifscCode: nomineeifscCode,
     mobileNumber:nomineeNumber,
     name: nomineename,
     relation: relation,
     userId: id,
    },
       {headers:{
              accessToken:access
             }
                 })
      .then(function (response) {
       console.log(response.data);
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


useEffect(()=>{
    getnomineedetails();
},[])


 return(
    <Root>
        <View style={{marginTop:10,alignSelf:'center',flex:1,height:800}}>
            <View style={styles.inputbox}>
                <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
                <TextInput style={{marginLeft:10}} placeholder="Name" value={nomineename}
                onChangeText={(number)=>setnomineename(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icon  size={20} style={{alignItems:'flex-start'}} name="call"/>
                <TextInput style={{marginLeft:10}} placeholder="Mobile Number" keyboardType="numeric"  value={nomineeNumber} maxLength={10}
                onChangeText={(number)=>setNomineeNumber(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
                <TextInput style={{marginLeft:10}} placeholder="Email"  value={nomineeEmail}
                onChangeText={(number)=>setNomineeEmail(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
                <TextInput style={{marginLeft:10}} placeholder="Relation"  value={relation}
                onChangeText={(number)=>setrelation(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
                <TextInput style={{marginLeft:10}} placeholder="Account Number" keyboardType="numeric"  value={setnomineeaccount}
                onChangeText={(number)=>setnomineeaccount(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
                <TextInput style={{marginLeft:10}} placeholder="IFSC Code" value={nomineeifscCode}
                onChangeText={(number)=>setnomineeifscCode(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
                <TextInput style={{marginLeft:10}} placeholder="Bank Name" value={nomineebankname}
                onChangeText={(number)=>setnomineebankname(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
                <TextInput style={{marginLeft:10}} placeholder="Branch Name"  value={nomineebranchname}
                onChangeText={(number)=>setnomineebranchname(number)}/>
            </View>

            <View style={styles.inputbox}>
                <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
                <TextInput style={{marginLeft:10}} placeholder="Bank City" value={nomineebankcity}
                onChangeText={(number)=>setnomineebankcity(number)}/>
            </View>

            <TouchableOpacity style={styles.btn} onPress={referenceDetailSave}>
            <Icons  size={20} style={{alignItems:'flex-start'}} name="save"/>
                <Text style={{marginLeft:5}}>Sumbit</Text>
            </TouchableOpacity >

        </View>
  </Root>
 )
}

export default LenderNominee;
