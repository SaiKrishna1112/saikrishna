<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity,ToastAndroid} from 'react-native';

=======
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity,ToastAndroid} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
>>>>>>> Stashed changes
import ViewStatement from './ViewStatement';
import SingleDeal from './SingleDeal';


const ParticpatedDeals = ({navigation}) => {
<<<<<<< Updated upstream
    const [Participated,setParticipated]=useState([])
    const [count1,setCount1]=useState(1);
=======
>>>>>>> Stashed changes

 const errormsg = msg => {
   ToastAndroid.showWithGravity(msg,
     ToastAndroid.SHORT,
     ToastAndroid.CENTER
   );
 };

    const [Participated,setParticipated]=useState([])
    const [count,setCount] = useState(1);
    const [loading,setLoading] = useState(false);
    const userDetails = useSelector(state=>state.counter);
            var id = userDetails.data.id;
      var access = userDetails.headers.accesstoken;
<<<<<<< Updated upstream
     
    var Data={ pageNo:count1,pageSize:10}

    const errormsg = msg => {
        ToastAndroid.showWithGravity(msg,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
      
        );
      };

function participatedealfunction(){
=======

      function add(){
         setCount(count+1);
       GetFunction()
      }
            function sub(){
             if(count==0){
               errormsg("No Data Found")
               setCount(count+2)
            }else{
            setCount(count-1);
             GetFunction()
            }
            }

    var Data={ pageNo:count,pageSize:10}
 function GetFunction(){
  setLoading(true)
>>>>>>> Stashed changes
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/listOfDealPaticipation',
    Data,
      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
            //console.log(response.data.listOfDealsInformationToLender)
            setParticipated(response.data.lenderPaticipatedResponseDto)
            setTimeout(function(){
                    setLoading(false);
                   },2000)

        })
        .catch(function(error){
            console.log(error)
        })
<<<<<<< Updated upstream
    }
useEffect(()=>{
    participatedealfunction();
},[])

        function add1(){
            setCount1(count1+1);
            participatedealfunction()
    
         }
                 function sub1(){
                  if(count1==0){
                    errormsg("No Data Found")
                    setCount1(count1+2)
                 }else{
                 setCount1(count1-1);
                 participatedealfunction()
    
                 }
                 }
=======
}
>>>>>>> Stashed changes

useEffect(()=>{
 GetFunction();
},[])

function footer() {
 return (
  <View style={{alignSelf:'center'}}><Text>No More Data Present Please GO Back </Text></View>
 );
}

        const renderList = ({ item }) => {
            return (
            <View style={{backgroundColor:'white',marginHorizontal:8,height:"auto",padding:8,marginVertical:8,borderLeftColor:'green',borderLeftWidth:4.5}}>
                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Name</Text></View>
                 <View><Text style={styles.Txt2}>{item.dealName}</Text></View>
                 </View>

                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Type </Text></View>
                 <View><Text style={styles.Txt2}>{item.dealType}</Text></View>
                 </View>

                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>First Interest</Text></View>
                 <View><Text style={styles.Txt2}>{item.firstInterestDate}</Text></View>
                 </View>

                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Participated </Text></View>
                 <View><Text style={styles.Txt2}>{item.paticipatedAmount}</Text>
                 {/* {if(item.paticipatedAmount=="true"){}} */}
                 </View>

                 </View>

                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Duration </Text></View>
                 <View><Text style={styles.Txt2}>{item.dealDuration}</Text></View>
                 </View>


                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>RoI </Text></View>
                 <View><Text style={styles.Txt2}>{item.dealRateofinterest}</Text></View>
                 </View>

                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Payout Type </Text></View>
                 <View><Text style={styles.Txt2}>{item.lederReturnType}</Text></View>
                 </View>

                 <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Participated Date </Text></View>
                 <View><Text style={styles.Txt2}>{item.registeredDate}</Text></View>
                 </View>

                       <View style={{flexDirection:'row'}}>
                 <View style={{alignItems:'center',justifyContent:'center',padding:14,borderBottomColor:'grey',borderBottomWidth:1,}}>
                 <TouchableOpacity style={{backgroundColor:'#569F40',borderRadius:3,height:28,width:150,alignItems:'center',justifyContent:'center',}}
                    onPress={()=>navigation.navigate('View Statement',{id:item.dealId})}><Text style={{color:'white',fontWeight:"bold"}}>View Statements</Text></TouchableOpacity>
                 </View>


                 <View style={{alignItems:'center',justifyContent:'center',padding:14,borderBottomColor:'grey',borderBottomWidth:1,}}>

                 <TouchableOpacity style={{backgroundColor:'#569F40',borderRadius:3,height:28,width:150,alignItems:'center',justifyContent:'center',}}
                    onPress={()=>navigation.navigate('Participate Details',{id:item.dealId})}><Text style={{color:'white',fontWeight:"bold"}}>Participate details</Text></TouchableOpacity>
                 </View>
                      </View>
                  <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Status </Text></View>
                 {item.participationStatus=="ACHIEVED"?
                 <View><Text style={styles.Txt2}>Deal Closed</Text></View>
                                                :
                 <View><TouchableOpacity style={styles.btn1} onPress={()=>navigation.navigate('Deal Info',{id:item.dealId})}><Text style={styles.Txt2}>Participate</Text></TouchableOpacity></View>}
                 </View>
            </View>
            )}

  return (
    <SafeAreaView style={{paddingTop:2,flex:15,height:'auto'}}>
    <View style={{margin:5,alignItems:'flex-end',lexDirection:'row',justifyContent:'center',padding:5}}>
       <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:110,alignItems:'center',justifyContent:'center',}}
          onPress={()=>navigation.navigate('Closed Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Closed Deals</Text></TouchableOpacity>
    </View>
<<<<<<< Updated upstream
    <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub1}><Text style={{color:'white'}}><Icon name="arrow-back" size={15}/>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn2}><TouchableOpacity onPress={add1}><Text>Next<Icon name="arrow-forward" size={15}/></Text></TouchableOpacity></View>
                  </View>
=======
    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
    <View style={styles.btn}><TouchableOpacity onPress={sub}><Text style={{color:'white'}}><Icon name="arrow-back" size={15}/>Prev</Text></TouchableOpacity></View>

    <View style={styles.btn2}><TouchableOpacity onPress={add}><Text>Next<Icon name="arrow-forward" size={15}/></Text></TouchableOpacity></View>
    </View>
    <View>
>>>>>>> Stashed changes
       <FlatList
           data={Participated}

           renderItem={renderList}

           keyExtractor={item => item.dealId}

           ListFooterComponent={footer}
           ListFooterComponentStyle={styles.footerStyle}
      />

      </View>
      <AnimatedLoader
       visible={loading}
       overlayColor="rgba(255,255,255,0.75)"
       source={require("../assets/loading.json")}
       animationStyle={styles.lottie}
       speed={1.5}>
   <Text style={{fontSize:18,fontWeight:'bold'}}>Loading.....</Text>
   </AnimatedLoader>

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
      btn:{
<<<<<<< Updated upstream
        marginLeft:30,
        borderWidth:1,
        width:60,
        height:20,
        alignItems:'center',
        borderRadius:8,
        backgroundColor:'#84c0e2'
       },
       btn2:{
        marginRight:30,
        borderWidth:1,
        width:60,
        height:20,
        alignItems:'center',
        borderRadius:8,
        backgroundColor:'#999999'
       },

=======
       marginLeft:30,
       borderWidth:1,
       width:60,
       height:20,
       alignItems:'center',
       borderRadius:8,
       backgroundColor:'#84c0e2'
      },
      btn2:{
       marginRight:30,
       borderWidth:1,
       width:60,
       height:20,
       alignItems:'center',
       borderRadius:8,
       backgroundColor:'#999999'
      },
    footerStyle:{
     marginTop:50
    },
    lottie: {
      width: 150,
      height: 150
    },
>>>>>>> Stashed changes
  })

export default ParticpatedDeals
