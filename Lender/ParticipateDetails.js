import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity} from 'react-native';


const ParticipateDetails = ({route,navigation}) => {
    const [Participated,setParticipated]=useState([])
    var dealid=route.params.id

    const userDetails = useSelector(state=>state.counter);
            var id = userDetails.data.id;
      var access = userDetails.headers.accesstoken;
      const [token, settoken]=useState();
      const [ids, setid]=useState();
      const [amount, setamount]=useState();

      const cashfreeINtegration=pros=>{
     axios.post("https://test.cashfree.com/api/v2/cftoken/order",{

     orderId:ids,
     orderAmount:amount,
     orderCurrency:"INR"
     },{ headers: {
     'x-client-id':'1385818e255507feae28462f3b185831',
     'x-client-secret':'311e3600dec6f631c1c56ec6b9d13d9ee7597c45'
     }}).then(function (response) {
     console.log(response);
     settoken(response.data.cftoken);

     });
     onPayPressHandler();
     }

     function onPayPressHandler(){

     var inputparams={
     "orderId":ids ,
     "orderAmount": amount,
     "appId": "1385818e255507feae28462f3b185831",
     "tokenData": token,
     "orderCurrency": "INR",
     "orderNote": "asdasdasd",
     "notifyUrl": "https://test.gocashfree.com/notify",
     "customerName": "Cashfree User",
     "customerPhone": "9999999999",
     "customerEmail": "cashfree@cashfree.com"
    }
     }


function getdata(){
      axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/'+dealid+'/paticipationChanges',
        {headers:{
                accessToken:access
               }
                   })

          .then(function(response){
              //console.log(response.data.lenderParticipationUpdatedInfo)
              setParticipated(response.data.lenderParticipationUpdatedInfo)


          })
          .catch(function(error){
              console.log(error.response.data)
          })
         }

useEffect(()=>{
 getdata();
},[id])
                  const renderList = ({ item }) => {
                      return (
                      <View style={{backgroundColor:'white',marginHorizontal:8,height:"auto",padding:8,marginVertical:8,borderLeftColor:'green',borderLeftWidth:4.5}}>
                           <View style={styles.flatmain}>
                           <View style={styles.TxtView1}><Text style={styles.Txt1}>Amount</Text></View>
                           <View><Text style={styles.Txt2}>{item.amount}</Text></View>
                           </View>



                           <View style={styles.flatmain}>
                           <View style={styles.TxtView1}><Text style={styles.Txt1}>Date</Text></View>
                           <View><Text style={styles.Txt2}>{item.upatedDate}</Text></View>
                           </View>

                      </View>
                      )}

            return (
              <SafeAreaView style={{paddingTop:5,flex:1,marginBottom:30}}>

                 <FlatList
                     data={Participated}

                     renderItem={renderList}

                     keyExtractor={item => item.id}
                />
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                <Text style={{fontSize:15}}>If you've any queries please write to us</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Write To Us')}><Text style={{color:'blue'}}>  Click Here</Text></TouchableOpacity>
               </View>

            </SafeAreaView>
            )
          }

          const styles = StyleSheet.create({
              flatmain:{
                flexDirection:"row",
                alignItems:'center',
                borderBottomColor:'grey',
                borderBottomWidth:1,
                paddingVertical:5
              },

              Txt1:{
                  fontWeight:'bold',
                  color:'#569F40',
                  fontSize:15

              },

              Txt2:{
                  fontWeight:'bold',
                  color:'black',
                  fontSize:15

              },

              TxtView1:{
                  width:190,
              },
              btn1:{
                padding:5,
                width:90,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:5,
                backgroundColor:"#4CAF50",
                marginLeft:10
                },

            })

          export default ParticipateDetails;

          // <View><Text>HLO MANDEVA</Text>
          // <TextInput placeholder="enter the order id " onChangeText={(text)=>setid(text) }></TextInput>
          // <TextInput placeholder="enter the amount " onChangeText={(amount)=>setamount(amount) }></TextInput>
          // <Button title="Click here to pay the amount" onPress={cashfreeINtegration}></Button>
          // </View>
