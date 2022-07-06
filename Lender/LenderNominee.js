import React,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {View,Text,TextInput,StyleSheet,ScrollView,TouchableOpacity,FlatList} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome'
 import styles from '../src/styles'
import {useSelector} from 'react-redux';

function LenderNominee({navigation}) {

 const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;

 const [relation,setrelation]=useState();
 const [nomineeEmail,setNomineeEmail]=useState();
 const [nomineeNumber,setNomineeNumber]=useState();
 const [nomineename,setnomineename]=useState();
 const [nomineeaccount,setnomineeaccount]=useState();
 const [nomineebankname,setnomineebankname]=useState();
 const [nomineebranchname,setnomineebranchname]=useState();
 const [nomineebankcity,setnomineebankcity]=useState();
 const [nomineeifscCode,setnomineeifscCode]=useState();

 return(
  <View style={{marginTop:10,alignSelf:'center',flex:1,height:800}}>
     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
         <TextInput style={{marginLeft:10}} placeholder="Name" keyboardType="numeric"  value={nomineename}
         onChangeText={(number)=>setnomineename(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="call"/>
         <TextInput style={{marginLeft:10}} placeholder="Mobile Number" keyboardType="numeric"  value={nomineeNumber}
         onChangeText={(number)=>setNomineeNumber(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
         <TextInput style={{marginLeft:10}} placeholder="Email" keyboardType="numeric"  value={nomineeEmail}
         onChangeText={(number)=>setNomineeEmail(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
         <TextInput style={{marginLeft:10}} placeholder="Relation" keyboardType="numeric"  value={relation}
         onChangeText={(number)=>setrelation(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
         <TextInput style={{marginLeft:10}} placeholder="Account Number" keyboardType="numeric"  value={setnomineeaccount}
         onChangeText={(number)=>setnomineeaccount(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
         <TextInput style={{marginLeft:10}} placeholder="IFSC Code" keyboardType="numeric"  value={nomineeifscCode}
         onChangeText={(number)=>setnomineeifscCode(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
         <TextInput style={{marginLeft:10}} placeholder="Bank Name" keyboardType="numeric"  value={nomineebankname}
         onChangeText={(number)=>setnomineebankname(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
         <TextInput style={{marginLeft:10}} placeholder="Branch Name" keyboardType="numeric"  value={nomineebranchname}
         onChangeText={(number)=>setnomineebranchname(number)}/>
     </View>

     <View style={styles.inputbox}>
         <Icons  size={20} style={{alignItems:'flex-start'}} name="bank"/>
         <TextInput style={{marginLeft:10}} placeholder="Bank City" keyboardType="numeric"  value={nomineebankcity}
         onChangeText={(number)=>setnomineebankcity(number)}/>
     </View>

     <TouchableOpacity style={styles.btn}>
       <Icons  size={20} style={{alignItems:'flex-start'}} name="save"/>
        <Text style={{marginLeft:5}}>Sumbit</Text>
      </TouchableOpacity >

  </View>
 )
}

export default LenderNominee;
