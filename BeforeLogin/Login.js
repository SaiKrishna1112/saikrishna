import React,{useState} from "react"
import {View,Text,TextInput,StyleSheet,Pressable,TouchableOpacity,Image,ToastAndroid,Alert} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { AccessToken,UserID } from '../src/action/index';
import AnimatedLoader from "react-native-animated-loader";

const Login=({navigation})=>{
 const dispatch=useDispatch();
 const errormsg = msg => {
   ToastAndroid.showWithGravity(msg,
     ToastAndroid.SHORT,
     ToastAndroid.CENTER
   );
 };
  const[username,setusername]=useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
  var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';

  const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');

    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility);
      }
    };

    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility
    };
  };
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const submitfunction= ()=>{
   if(username=="")
   {
       errormsg("Please enter your name");
       color:"red"
       return false;
   }
   if(password=="")
   {
       errormsg("Please enter Password");
       return false;
   }

     setLoading(true);
     axios.post(local+'/login?grantType=PWD', {
         email: username,
        password: password,
       })
       .then(function (response) {
        //console.log(response);
        dispatch(AccessToken(response));
        axios({
            method:'get',
            url:local+'/personal/'+response.data.id,
            headers:{
                  accessToken:response.headers.accesstoken,
                 }
           })
            .then(function (response) {
             dispatch(UserID(response.data));
             //console.log(response.data);
                  })
            .catch(function (error) {
             console.log('error',error);
           });
        setTimeout(function(){
                setLoading(false);
                //console.log(primaryType);
                if(response.data.primaryType=="LENDER"){
                 errormsg('LENDER');
                 navigation.navigate('LenderTabs')
                } else {
                 Alert.alert(
                  "Oops",
                  "You Login As Borrower,Please login as a Lender "
                  [
                   { text: "OK",onPress: () => setLoading(false)}
                  ]
                 )
                }

               },2000);
               })
       .catch(function (error) {
        console.log(error);
    Alert.alert(
     "Oops",
     "Invaild User name or Password",
     [
       { text: "OK", onPress: () => setLoading(false) }
     ]
   );
   });
  }



  const loginfunction=()=>{
  }

    return(
        <View style={{flex:1}}>
        <View style={styles.cont1}>
           <Image source={require('../assets/bgm.png')} style={{height:900,width:500}}></Image>
           </View>

              <View style={styles.mainview}>
              <View style={{alignSelf:'center',marginBottom:50}}>
                 <Image source={require('../assets/oxylogo-white.png')} style={{height:120,width:200}}></Image>
              </View>
                  <Text style={styles.txt}>LOGIN</Text>
                  <TextInput style={styles.input} placeholder="Enter Email or Mobile Number" onChangeText={(text)=>setusername(text)}></TextInput>
                  <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputField}
                        name="password"
                        placeholder="Enter password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="newPassword"
                        secureTextEntry={passwordVisibility}
                        value={password}
                        enablesReturnKeyAutomatically
                        onChangeText={text =>setPassword(text)}>
                           {/* <Icon name="person" size={20}   /> */}
                      </TextInput>
                      {/* <Icon name="person" size={20} style={{marginRight:40}}  /> */}
                      <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="white" />
                      </Pressable>
                  </View>
                  <TouchableOpacity style={styles.btn} onPress={submitfunction}>
                    <Text style={styles.txt1}>Login</Text>
                  </TouchableOpacity>
                    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
                      <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                          <Text>Forgot Password</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>navigation.navigate('LoginWithOTP')}>
                          <Text>Login With OTP</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{borderBottomColor:"white",borderBottomWidth:1,width:250,alignSelf:"center",marginTop:25}}/>
                          <Text style={{alignSelf:"center",marginTop:50,fontSize:16}}>New Member ?</Text>
                          <TouchableOpacity>
                              <Text style={{alignSelf:"center",marginTop:2,color:"#f8f8ff",fontSize:16}}>Register</Text>
                          </TouchableOpacity>
              </View>

              <AnimatedLoader
               visible={loading}
               overlayColor="rgba(255,255,255,0.75)"
               source={require("../assets/loading.json")}
               animationStyle={styles.lottie}
               speed={1.5}>
           <Text style={{fontSize:18,fontWeight:'bold'}}>Loading.....</Text>
           </AnimatedLoader>

        </View>

    )
}



export default Login;

const styles = StyleSheet.create({
 cont1:{
        position:'relative',
        alignSelf:'center'
      },
      mainview:{
        position:'absolute',
        width:320,
        height:800,
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
        borderColor:'white',
        borderWidth:1,
        padding:10,
        borderRadius:20,
        marginVertical:15,
        marginHorizontal:15,
      },
      inputContainer: {
        width: '90%',
        alignSelf:"center",
        // marginLeft:10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
      },
      inputField: {
        padding: 10,
        width: '90%',
        borderRadius:20
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
      txt1:{
       fontWeight:'bold',
       fontSize:15,
      },
      lottie: {
        width: 150,
        height: 150
      },
})
//
  {/* <View style={{borderRadius:0.5,borderBottomColor:"black"}}/> */}
