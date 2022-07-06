import React,{useState} from "react"
import {View,Text,TextInput,StyleSheet,Pressable,TouchableOpacity,Image,ToastAndroid,Alert} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios'


const ForgotPassword=({navigation})=>{
 const errormsg = msg => {
   ToastAndroid.showWithGravity(msg,
     ToastAndroid.SHORT,
     ToastAndroid.CENTER
   );
 };
  const[useremail,setUseremail]=useState('');
  const [loading,setLoading] = useState(false);
  var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
  var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';

  const submitfunction= ()=>{
   if(useremail=="")
   {
       errormsg("Please enter your Email");
       color:"red"
       return false;
   }

     setLoading(true);
     axios.post(local+'/login?grantType=PWD', {
         email: username,
        password: password,
       })
       .then(function (response) {
        //console.log(response);
        //dispatch(AccessToken(response));
        axios({
            method:'get',
            url:local+'/personal/'+response.data.id,
            headers:{
                  accessToken:response.headers.accesstoken,
                 }
           })
            .then(function (response) {
             //dispatch(UserID(response.data));
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
                 navigation.navigate('BorrowerTabs')
                 errormsg('BORROWER');
                }

               },1000);
               })
       .catch(function (error) {
    Alert.alert(
     "Oops",
     "Invaild User name or Password",
     [
       { text: "OK", onPress: () => setLoading(false) }
     ]
   );
   });
  }


    return(
        <View style={{flex:1}}>
        <View style={styles.cont1}>
           <Image source={require('../assets/bgm.jpeg')} style={{height:1000,width:500}}></Image>
           </View>
              <View style={styles.mainview}>

                  <Text style={styles.txt}>Forgot Password</Text>
                  <TextInput style={styles.input} placeholder="Enter Email Id" onChangeText={(text)=>setUseremail(text)}></TextInput>
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.txt1}>Submit</Text>
                  </TouchableOpacity>
                    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
                      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                          <Text>Login</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>navigation.navigate('LoginWithOTP')}>
                          <Text>Login With OTP</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{borderBottomColor:"grey",borderBottomWidth:1,width:250,alignSelf:"center",marginTop:25}}/>
                          <Text style={{alignSelf:"center",marginTop:50,fontSize:16}}>New Member ?</Text>
                          <TouchableOpacity>
                              <Text style={{alignSelf:"center",marginTop:2,color:"#f8f8ff",fontSize:16}}>Register</Text>
                          </TouchableOpacity>
              </View>
        </View>

    )
}



export default ForgotPassword;

const styles = StyleSheet.create({
 cont1:{
        position:'relative',
      },
      mainview:{
        position:'absolute',
        borderRadius: 16,
        width:320,
        height:400,
        alignSelf:"center",
        paddingVertical:5,
        marginTop:200,

      },
      txt:{
        justifyContent:"center",
        alignSelf:"center",
        fontSize:23,
        fontWeight:"bold",
        marginTop:10,
        marginBottom:10,
        // color:"#00bfff"
      },
      input:{
        borderColor:'grey',
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
