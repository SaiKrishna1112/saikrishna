import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,ActivityIndicator,
 Linking,ScrollView,Modal,Alert,Image,ImageBackground,Button} from 'react-native';
//import MyTransactionHistory from './MyTransactionHistory';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function LenderWallets({navigation}){

    useEffect(()=>{
        async function configurePushNotifications(){
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if(finalStatus !== 'granted'){
         const { status } = await Notifications.requestPermissionsAsync();
         finalStatus = status;
        }

        if (finalStatus !=='granted'){
         Alert.alert('Permission Required',
        'Push Notifications'
       );
       return;
        }
        const pushTokenData = await Notifications.getExpoPushTokenAsync();
          console.log(pushTokenData);

          if (Platform.OS === 'android') {
           Notifications.setNotificationChannelAsync('default',{
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT
           });
          }
        }
        configurePushNotifications();
    }, []);

 useEffect(()=>{
 const subscription1 = Notifications.addNotificationReceivedListener((notification)=>{
   console.log('Notification Received');
   console.log(notification);
  });

   const subscription2 = Notifications.addNotificationResponseReceivedListener((response)=>{
    console.log('Notification Response');
    console.log(response);
   })
  return () => {
   subscription1.remove();
   subscription2.remove();
  };
 },[])
function scheduleNotificationHandler() {
     alert('Notification')
   Notifications.scheduleNotificationAsync({
      content:{
       title: "This is my First local Notification",
       body: "This is my First local Notification",
      },
      trigger:{
       seconds: 5,
      },
     });
    }


 const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
 var access = userDetails.headers.accesstoken;
var id = userDetails.data.id;
const [lenderWalletAmount,setlenderWalletAmount]=useState(userDetail.lenderWalletAmount);
const [amount,setAmount]=useState();
const [modal1,setmodal1]=useState(false);
const [link,setlink] = useState();
const [tableID,settableID] = useState();
const [status,setStatus] = useState();
const [Date,setDate] = useState();
var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';
function Save(){
 setmodal1(!modal1);
}
function Link(){
    link;
   }
function Load(){
 if(amount==""){
  alert("please Enter Amount For loading you wallet");
  return false;
 }
 axios({
     method:'post',
     url:local+'/QRTransactionInitiation',
     data:{
           userId:id,
           amount:amount,
           },
     headers:{
           accessToken:access,
          }
    })
     .then(function (response) {
      console.log(response.data);
      setlink(response.data.qrGenerationString);
      settableID(response.data.qrTableId);
      var intervalId = window.setInterval(function(){
                               checkqrcodetransaction(response.data.qrTableId);
                            }, 3000);
                            Alert.alert(
                             "Success",
                             "Transactions Initiation",
                             [
                               { text: "OK", onPress: () => Linking.openURL(response.data.qrGenerationString) }
                             ]
                           );
           })
     .catch(function (error) {
      console.log('error',error);
    });
      }

 function checkqrcodetransaction( tableID){
  if(status!='SCANNED'){
       axios({
          method:'patch',
          url:local+'/'+tableID+'/qrStatusCheck',
          headers:{
                accessToken:access,
               }
         })
         .then(function (response) {
          console.log(response.data)
          setStatus(response.data.status);
                 })
          .catch(function (error) {
           console.log('error',error);
         });
        }else{
         navigation.navigate('WalletSuccess')
        }
       }
       axios({
           method:'get',
           url:local+'/personal/'+id,
           headers:{
                 accessToken:access,
                }
          })
           .then(function (response) {
            setlenderWalletAmount(response.data.lenderWalletAmount)
                 })
           .catch(function (error) {
            console.log('error',error);
          });
          axios({
              method:'get',
              url:local+'/'+id+'/dealsStatistics',
              headers:{
                accessToken: access,
              }
            })

            .then(function (response) {
              setDate(response.data.validityDate)
            })
            .catch(function(error){
              console.log('error',error)
            });
    return (
     <ScrollView>
      <View style={styles.container}>
      <View style={styles.img7}>
          <Image source={require('../assets/card.jpeg')} style={{height:250,width:'auto', position:'relative'}} />

          <View style={styles.secimg}>
              <Text style={styles.txt1}>INR:{lenderWalletAmount}</Text>
          </View>
          <View style={styles.maintext}>
          <Text style={{color:'white'}}>MemberShip Validity Date</Text>
          <Text style={{color:'white'}}>{Date}</Text>
          </View>
      </View>
       <View style={{flexDirection:'row',marginTop:30}}>
       <TouchableOpacity style={styles.appButtonContainer} onPress={Save}>
          <Text style={styles.appButtonText}>Upload</Text>
        </TouchableOpacity >
           <View>
           <TouchableOpacity  style={styles.appButtonContainer}
           onPress={()=>navigation.navigate('Wallet Withdrawal')}>
             <Text style={styles.appButtonText}>Withdrawal</Text>
           </TouchableOpacity>
          </View>

         </View>
         <Modal animationType="slide"
     visible={modal1}>
     <TouchableOpacity onPress={Save}>
     <MaterialCommunityIcons style={{paddingLeft:10,paddingTop:20}} name = "arrow-left-thick" color = 'black' size = { 35 }/>
      </TouchableOpacity>
     <View style={styles.container1}>
     <Text style={{alignSelf:'center',fontSize:22,fontWeight:'bold',marginBottom:20}}>Load Your Wallet</Text>
     <View style={styles.inputbox}>
         <Text style={{fontSize:18}}>Amount</Text>
         <TextInput placeholder="Enter Amount" keyboardType="numeric"
         onChangeText={(number)=>setAmount(number)}/>
     </View>
     <View style={{alignItems:'center'}}>
     <TouchableOpacity style={styles.appButtonContainer} onPress={Load}>
        <Text style={styles.appButtonText}>Upload</Text>
      </TouchableOpacity >
      </View>
      </View>
     </Modal>
         </View>
         </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    img7:{
        marginTop:80
  },
  secimg:{
      top:60,
      position:'absolute',
      margin:10,
      alignSelf:'center',
      justifyContent:'center'
},
maintext:{
   position:'absolute',
   marginLeft:25,
   marginTop:180,
},
    container1: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      marginTop:150
    },
    box:{
    ImageBackground:'../assets/background.jpeg',
    width:'100%',
    height:120,
    marginTop:90,
    borderRadius:10,
    display:'flex',
   },
   txt1:{
     color:'white',
     fontSize:30,
     margin:20,
     alignItems:'center',
   },
   inputbox:{
       position:'relative',
       backgroundColor:'#E8E8E8',
       borderRadius: 16,
       width:310,
       height:'auto',
       alignItems: 'flex-start',
       paddingLeft:15,
       paddingVertical:5,
       margin:10,
       marginTop:5,
       marginLeft:15,
       marginBottom:20
   },
   appButtonContainer: {
       marginTop:8,
       backgroundColor: "#e91e63",
       borderRadius: 8,
       paddingVertical: 10,
       paddingHorizontal: 12,
       width:150,
       marginLeft:20,
       marginBottom:8
     },
     appButtonText: {
       fontSize: 15,
       color: "#fff",
       fontWeight: "bold",
       alignSelf: 'center',
       justifyContent:'center'
     },
  })

export default LenderWallets;
