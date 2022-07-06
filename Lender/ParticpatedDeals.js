import React, { useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity} from 'react-native';

import ViewStatement from './ViewStatement';
import SingleDeal from './SingleDeal';


const ParticpatedDeals = ({navigation}) => {
    const [Participated,setParticipated]=useState([])

    const userDetails = useSelector(state=>state.counter);
            var id = userDetails.data.id;
      var access = userDetails.headers.accesstoken;

    var Data={ pageNo:1,pageSize:10}

    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/listOfDealPaticipation',
    Data,
      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
            //console.log(response.data.listOfDealsInformationToLender)
            setParticipated(response.data.lenderPaticipatedResponseDto)


        })
        .catch(function(error){
            console.log(error)
        })


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
                 <TouchableOpacity style={{backgroundColor:'#569F40',borderRadius:3,height:28,width:130,alignItems:'center',justifyContent:'center',}}
                    onPress={()=>navigation.navigate('ViewStatement',{id:item.dealId})}><Text style={{color:'white',fontWeight:"bold"}}>View Statements</Text></TouchableOpacity>
                 </View>


                 <View style={{alignItems:'center',justifyContent:'center',padding:14,borderBottomColor:'grey',borderBottomWidth:1,}}>

                 <TouchableOpacity style={{backgroundColor:'#569F40',borderRadius:3,height:28,width:130,alignItems:'center',justifyContent:'center',}}
                    onPress={()=>navigation.navigate('Participate Details',{id:item.dealId})}><Text style={{color:'white',fontWeight:"bold"}}>Participate details</Text></TouchableOpacity>
                 </View>
                      </View>
                  <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Status </Text></View>
                 {item.participationStatus=="ACHIEVED"?
                 <View><Text style={styles.Txt2}>Deal Closed</Text></View>
                                                :
                 <View><TouchableOpacity style={styles.btn1} onPress={()=>navigation.navigate('SingleDeal',{id:item.dealId})}><Text style={styles.Txt2}>Participate</Text></TouchableOpacity></View>}
                 </View>
            </View>
            )}

  return (
    <SafeAreaView style={{paddingTop:5,flex:1,marginBottom:0}}>
    <View style={{margin:5,alignItems:'flex-end',lexDirection:'row',justifyContent:'center',padding:5}}>
       <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:110,alignItems:'center',justifyContent:'center',}}
          onPress={()=>navigation.navigate('Closed Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Closed Deals</Text></TouchableOpacity>
    </View>
       <FlatList
           data={Participated}

           renderItem={renderList}

           keyExtractor={item => item.dealId}
      />

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

export default ParticpatedDeals
