import React,{useState,useLayoutEffect,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {View,Text,TextInput,ScrollView,TouchableOpacity,Alert,Image,ToastAndroid} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../src/styles';
import axios from "axios"
import {useSelector} from 'react-redux';
import { Root,Popup,Toast} from 'popup-ui'
import success from '../navigation/Success';
import error from '../navigation/Error';

const LenderEdit = ({navigation}) => {

 const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;

 const [username,setUsername]=useState(userDetail.firstName);
 const [useremail,setUseremail]=useState(userDetail.email);
 const [usermobilenumber,setUsermobilenumber]=useState(userDetail.mobileNumber);
 const [userwhatsappnumber,setUserwhatsappnumber]=useState(userDetail.whatsAppNumber);
 const [middlename,setMiddlename]=useState(userDetail.middleName);
 const [lastName,setLastName]=useState(userDetail.lastName);
 const [panNumber,setPanNumber]=useState(userDetail.panNumber);
 const [passions,setPassions]=useState(['sports','vollyball']);
 const [education,setEducation]=useState(["B-tech","ssc","inter"]);
 const [dob,setDOB]=useState(userDetail.dob);
 const [fatherName,setFatherName]=useState(userDetail.fatherName);
 const [residenceAddress,setResidenceAddress]=useState(userDetail.address);
 const [permanentAddress,setPermanentAddress]=useState(userDetail.permanentAddress);
 const [pincode,setPincode]=useState(userDetail.pinCode);
 const [locality,setLocality]=useState(userDetail.locality);
 const [city,setCity]=useState(userDetail.city);
 const [state,setState]=useState(userDetail.state);
 const [facebook,setFacebook]=useState(userDetail.urlsDto.faceBookUrl);
 const [linkedin,setLinkedin]=useState(userDetail.urlsDto.linkedinUrl);
 const [twitter,setTwitter]=useState(userDetail.urlsDto.twitterUrl);
 const [date, setDate] = useState(new Date());
 const [mode,setMode] = useState('date');
 const [show,setShow] = useState(false);
 const [text,setText] = useState('22/08/2014');
 const [hide,setHide]=useState(false);
 const [shouldShow,setshouldShow]=useState(false);
 const [otp,setOtp]=useState();
 const [loading,setLoading]=useState(false)

 const errormsg = msg => {
  ToastAndroid.showWithGravity(msg,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,

  );
};


function Verify(number){
 setUserwhatsappnumber(number)
 setHide(true)
}

function btn2() {
 setshouldShow(true)
 setHide(false)
}
function Submit() {
 setshouldShow(false)
}
 //---------------DatePicker Start------------------//

 const onChange=(event,selectDate) => {
  const currentDate = selectDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);

  let tempDate = new Date(currentDate);
  let fDate = tempDate.getDate() + '/'+(tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
  setText(fDate);

  console.log(fDate);
 }
 const showMode = (currentMode)=> {
  setShow(true);
  setMode(currentMode);
 };
 //----------------DatePicker End-----------------//

//================fetch location using get call==================
function pincodefunction(){
  axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+pincode+'/pincode',
  {
    headers:{
      accessToken:access
    }
  })
  .then(function (response) {
    setLocality(response.data.pinresults[0].block);
    setCity(response.data.city);
    setState(response.data.state);
    setTimeout(function(){
               setLoading(false);


             }, 1000);
           })
   .catch(function (error) {
    //  console.log(error);
//       Alert.alert(
//  "Warring",
//  "Please Check Something went Wrong",
//  [
//   { text: "OK", onPress: () => setLoading(false) }
//  ]
//  );
console.log('error',error);
      console.log(error.response.data.errorMessage);
  });
 }
//============================================

function Profilesave(){
  if (username=="") {
    errormsg("Please Enter Name");
   return false;
  }
 if (useremail=="") {
  errormsg("Please Enter Email ");
  return false;
 }
if (usermobilenumber=="") {
  errormsg("Please Enter Mobile Number");
  return false;
 }
if (panNumber=="") {
  errormsg("Please Enter PAN Number");
 return false;
 var panRegex = /[A-Z]{5}\d{4}[A-Z]{1}/;
 if(!panRegex.test(panNumber)){
  errormsg("Please Enter valid PAN Number")
 }
}
if (fatherName=="") {
  errormsg("Please Enter Father Name");
 return false;
}
if (residenceAddress=="") {
  errormsg("Please Enter Residence Address");
 return false;
}
if (permanentAddress=="") {
  errormsg("Please Enter Permanent Address");
 return false;
}
if (pincode=="") {
  errormsg("Please Enter Pincode");
 return false;
 if(pincode.length>6){
  errormsg("Please Enter valid Pincode");
  return false;
 }
}
if (locality=="") {
  errormsg("Please Enter Locality");
 return false;
}
if (state=="") {
  errormsg("Please Enter State");
 return false;
}
if (city=="") {
  errormsg("Please Enter City");
 return false;
}
setLoading(true);
axios.patch('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/personal/'+id,
{
 firstName:username,
 lastName:lastName,
 middleName:middlename,
 fatherName:fatherName,
 dob:text,
 panNumber:panNumber,
 address:residenceAddress,
 permanentAddress:permanentAddress,
 pinCode:pincode,
 state:state,
 locality:locality,
 facebookUrl:facebook,
 linkedinUrl:linkedin,
 twitterUrl:twitter,
 whatsAppNumber:userwhatsappnumber,
 education: "Primary education",
 passion: "BASKETBALL",
},
   {headers:{
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

useEffect(()=>{
    pincodefunction();
},[pincode])




 return (
  <Root>
  <ScrollView>
  <View style={{marginTop:10,alignSelf:'center',height:1300}}>
               <View style={styles.inputbox}>
               <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
              <TextInput style={{alignItems:'flex-end',marginLeft:10}} placeholder="First Name" value={username}
              onChangeText={(text)=>setUsername(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
              <TextInput style={{marginLeft:10}} placeholder="Middle Name" value={middlename}
                 onChangeText={(text)=>setMiddlename(text)}/>
                 </View>

                 <View style={styles.inputbox}>
                 <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
              <TextInput style={{marginLeft:10}} placeholder="Last Name" value={lastName}
              onChangeText={(text)=>setLastName(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="person"/>
              <TextInput style={{marginLeft:10}} placeholder="PAN Number"
               value={panNumber}
              onChangeText={(text)=>setPanNumber(text)}/>
              </View>

              <View style={styles.inputbox}>
          {show&&(
         <DatePicker
         testID='DatePicker'
         value={date}
         mode={mode}
         display='default'
         is24Hour={true}
       onChange={onChange}
        />)}
        <Icon  size={20} style={{alignItems:'flex-start'}} name="calendar"/>
            <TouchableOpacity onPress={()=>showMode('date')}>
              <Text style={styles.txt}>{text}</Text>
            </TouchableOpacity>
            </View>


            <View style={styles.inputbox}>
            <Icon  size={20} style={{alignItems:'flex-start'}} name="call"/>
              <TextInput style={{marginLeft:10}} placeholder="Mobile Number" keyboardType="numeric" value={usermobilenumber} maxLength={10}
              onChangeText={(number)=>setUsermobilenumber(number)}/>
              </View>

              <View style={styles.inputbox}>
              <Icons  size={20} style={{alignItems:'flex-start'}} name="whatsapp"/>
                <TextInput style={{marginLeft:10}} placeholder="91 Whatsapp Number" keyboardType="numeric" maxLength={12} value={userwhatsappnumber}
                onChangeText={(number)=>Verify(number)}/>
                { hide ?(
                 <TouchableOpacity style={{marginLeft:92}} onPress={btn2}>
                    <View style={styles.btn1}>
                      <Text>Verify</Text>
                 </View>
                 </TouchableOpacity>
                 ):null}
                </View>

                 {shouldShow? (
                  <View style={{alignSelf:'center'}}>
                <View style={styles.inputbox1}>
                <Icon  size={20} style={{alignItems:'flex-start'}} name="call"/>
                  <TextInput style={{marginLeft:10}} placeholder="OTP" keyboardType="numeric"
                  onChangeText={(number)=>setOtp(number)}/>
                  <TouchableOpacity style={{marginLeft:65}} onPress={Submit}>
                     <View style={styles.btn1}>
                       <Text>Submit</Text>
                  </View>
                  </TouchableOpacity>
                  </View>
                  </View>
                 ):null}

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="mail"/>
              <TextInput style={{marginLeft:10}} placeholder="Email ID" value={useremail}
              autoCapitalize='none'
             captionTextStyle={styles.captionTextStyle}
             onChangeText={(text)=>setUseremail(text)}/>
             </View>

           <View style={styles.inputbox}>
             <Icon1  size={20} style={{alignItems:'flex-start'}} name="cast-for-education"/>
                 <View style={{marginLeft:10}}>
                   <SelectDropdown
                     	data={education}
                     	onSelect={(selectedItem, index) => {
                       setEducation(selectedItem)
                     		console.log(selectedItem, index)
                     	}}
                     	buttonTextAfterSelection={(selectedItem, index) => {
                     		return selectedItem
                     	}}
                     	rowTextForSelection={(item, index) => {
                     		return item
                     	}}
                     />
                </View>
           </View>
                <View style={styles.inputbox}>
                  <Icon1  size={20} style={{alignItems:'flex-start'}} name="sports"/>
                     <View style={{marginLeft:10}}>
                         <SelectDropdown
                         	data={passions}

                         	onSelect={(selectedItem, index) => {
                           setPassions(selectedItem)
                         		console.log(selectedItem, index)
                         	}}
                         	buttonTextAfterSelection={(selectedItem, index) => {
                         		return selectedItem
                         	}}
                         	rowTextForSelection={(item, index) => {
                         		return item
                         	}}
                         />
                     </View>
                 </View>


             <View style={styles.inputbox}>
             <Icon  size={20} style={{alignItems:'flex-start'}} name="home"/>
              <TextInput style={{marginLeft:10}} placeholder="Residence Address" multiline={true} value={residenceAddress}
              onChangeText={(text)=>setResidenceAddress(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="home"/>
              <TextInput style={{marginLeft:10}} placeholder="Permanent Address" multiline={true} value={permanentAddress}
              onChangeText={(text)=>setPermanentAddress(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="location"/>
              <TextInput style={{marginLeft:10}} placeholder="PinCode" keyboardType="numeric" value={pincode} maxLength={6}
              onChangeText={(number)=>setPincode(number)}/>
              </View>

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="location"/>
              <TextInput style={{marginLeft:10}} placeholder="Locality" value={locality}
              onChangeText={(text)=>setLocality(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="location"/>
              <TextInput style={{marginLeft:10}} placeholder="City" value={city}
              onChangeText={(text)=>setCity(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icon  size={20} style={{alignItems:'flex-start'}} name="location"/>
              <TextInput style={{marginLeft:10}} placeholder="State" value={state}
              onChangeText={(text)=>setState(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icons  size={20} style={{alignItems:'flex-start'}} name="facebook"/>
              <TextInput style={{marginLeft:10}} placeholder="Facebook URL" value={facebook}
              onChangeText={(text)=>setFacebook(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icons  size={20} style={{alignItems:'flex-start'}} name="linkedin"/>
              <TextInput style={{marginLeft:10}} placeholder="Linkedin URL" value={linkedin}
              onChangeText={(text)=>setLinkedin(text)}/>
              </View>

              <View style={styles.inputbox}>
              <Icons  size={20} style={{alignItems:'flex-start'}} name="twitter"/>
              <TextInput style={{marginLeft:10}}  placeholder="Twitter URL" value={twitter}
              onChangeText={(text)=>setTwitter(text)}/>
              </View>
              <TouchableOpacity onPress={Profilesave}>
              <View style={styles.btn}>
              <Icons  size={15}  color='black' name="save"/>
              <Text style={{marginLeft:10}}>Save</Text>
              </View>
              </TouchableOpacity>

     </View>
     <StatusBar style="auto" />
     </ScrollView>
     </Root>
 );
}

 export default LenderEdit;
