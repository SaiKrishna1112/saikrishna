import React,{useState} from "react"
import {View,Text,TextInput,StyleSheet,Pressable,TouchableOpacity,Image,ToastAndroid,Alert} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios'
import {error} from '../navigation/Error'

function LoginWithOTP({navigation}) {
 const errormsg = msg => {
   ToastAndroid.showWithGravity(msg,
     ToastAndroid.SHORT,
     ToastAndroid.CENTER
   );
 };
  const[usernumber,setusernumber]=useState();
  const [otp, setOtp] = useState();
  const [loading,setLoading] = useState(false);
  const [hide,setHide]= useState(false)
  const [shouldShow,setshouldShow]=useState(true)
  var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
  var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';


  const submitfunction= ()=>{
   if(usernumber=="")
   {
       errormsg("Please enter your number");
       color:"red"
       return false;
   }

   setLoading(true);
    axios.post(local+'/sendOtp',
     {
        mobileNumber:usernumber
      })
      .then(function (response) {
       //console.log(response.data);
       //console.log(usernumber);
       setHide(true)
       setshouldShow(false)
              })
      .catch(function (error) {
        console.log(error);
           error();
     });
}

function submit(){
 setLoading(true);
    axios.post(local+'/login?grantType=PWD', {
        mobileNumber: usernumber,
        mobileOtpValue: otp,
      })
      .then(function (response) {
       setTimeout(function(){
                   setLoading(false);
                    console.log("LENDER");

                    navigation.navigate('LenderTabs')
                }, 4000);
              })
      .catch(function (error) {
        console.log(error);
        // console.log(error.response.data.errorMessage);
        Alert.alert(
  "Warring",
  "Invaild OTP Try Again"
  [
    { text: "OK", onPress: () => setLoading(false) }
  ]
);
    });
}


    return(
        <View style={{flex:1}}>
        <View style={styles.cont1}>
           <Image source={require('../assets/bgm.png')} style={{height:1000,width:600}}></Image>
           </View>
              <View style={styles.mainview}>
              <View style={{alignSelf:'center',marginBottom:50}}>
                 <Image source={require('../assets/oxylogo-white.png')} style={{height:120,width:200}}></Image>
              </View>
                  <Text style={styles.txt}>Login with OTP</Text>
                  <TextInput style={styles.input} placeholder="Enter Mobile Number" onChangeText={(number)=>setusernumber(number)} />
                 {shouldShow ? ( <View>
                  <TouchableOpacity style={styles.btn} onPress={submitfunction}>
                    <Text style={styles.txt1}>Get OTP</Text>
                  </TouchableOpacity>
                  </View>):null}
                     {hide ? (
                      <View>
                        <TextInput style={styles.input} placeholder="Enter OTP" onChangeText={(number)=>setOtp(number)} />
                  <TouchableOpacity style={styles.btn} onPress={submit}>
                    <Text style={styles.txt1}>Login</Text>
                  </TouchableOpacity>
                  </View>
                  ):null}
                    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
                      <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                          <Text>Forgot Password</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                          <Text>Login</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{borderBottomColor:"white",borderBottomWidth:1,width:250,alignSelf:"center",marginTop:25}}/>
                          <Text style={{alignSelf:"center",marginTop:50,fontSize:16}}>New Member ?</Text>
                          <TouchableOpacity>
                              <Text style={{alignSelf:"center",marginTop:2,color:"#f8f8ff",fontSize:16}}>Register</Text>
                          </TouchableOpacity>
              </View>
        </View>

    )
}



export default LoginWithOTP;

const styles = StyleSheet.create({
 cont1:{
        position:'relative',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
      },
      mainview:{
        position:'absolute',
        borderRadius: 16,
        width:320,
        height:400,
        alignSelf:"center",
        paddingVertical:5,
        marginTop:150,

      },
      txt:{
        justifyContent:"center",
        alignSelf:"center",
        fontSize:23,
        fontWeight:"bold",
        marginTop:10,
        marginBottom:10,
        color:"#ffff"
      },
      input:{
       fontSize:15,
        backgroundColor:'white',
        borderColor:'white',
        borderWidth:1,
        padding:10,
        borderRadius:20,
        marginVertical:15,
        marginHorizontal:15,
        opacity:0.4
      },
      inputContainer: {
        width: '90%',
        alignSelf:"center",
        // marginLeft:10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey'
      },
      inputField: {
        padding: 10,
        width: '90%',
      },
      btn:{
        backgroundColor:"#56A5EC",
        width:100,
        borderRadius:20,
        alignSelf:"center",
        marginTop:20,
        padding:10,
        marginBottom:10,
       alignItems:'center'
      },
})
//
  {/* <View style={{borderRadius:0.5,borderBottomColor:"black"}}/> */}
