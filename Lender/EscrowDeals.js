import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity} from 'react-native';


import ParticpatedDeals from './ParticpatedDeals';
import ViewStatement from './ViewStatement';
import SingleDeal from './SingleDeal';

const EscrowDeals = ({navigation}) => {
    const [deal,setDeal]=useState([])
    const userDetails = useSelector(state=>state.counter);
   const userDetail = useSelector(state=>state.logged);
    var access = userDetails.headers.accesstoken;
    var id = userDetails.data.id;
    var Data={ pageNo:1,pageSize:10,dealType:'HAPPENING',dealName: "ESCROW"}
const ongoingDealfunction=param=>{
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/listOfDealsInformationForEquityDeals',
    Data,
      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
        //console.log(response.data.listOfBorrowersDealsResponseDto);
            setDeal(response.data.listOfBorrowersDealsResponseDto)
        })
        .catch(function(error){
            console.log(error)
        })
       }



    const renderList = ({ item }) => {


      return (

          <View style={{borderColor:'grey',borderWidth:1.8,marginHorizontal:15,height:"auto",padding:8,borderTopWidth:8,borderTopColor:'#569F40',borderBottomWidth:0.5}}>
            <View style={styles.flatmain}>
               <Text style={{fontWeight:'bold',color:'#569F40',fontSize:15,marginRight:86}}>Deal Name</Text>
               <Text>{item.dealName}</Text>
            </View>
            <View style={styles.flatmain}>
               <Text style={{fontWeight:'bold',color:'#569F40',fontSize:15,marginRight:73}}>Deal Amount</Text>
               <Text>{item.dealAmount}</Text>
            </View>
            <View style={styles.flatmain}>
               <Text style={{fontWeight:'bold',color:'#569F40',fontSize:15,marginRight:54}}>Borrower Name</Text>
               <Text>{item.borrowerName}</Text>
            </View>
            <View style={styles.flatmain}>
               <Text style={{fontWeight:'bold',color:'#569F40',fontSize:15,marginRight:107}}>Duration</Text>
               <Text>{item.duration}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',padding:10,borderBottomColor:'grey',borderBottomWidth:1,}}>
                {item.lenderPaticipateStatus==true ?
                <View>
                <TouchableOpacity style={styles.btnAble} onPress={()=>navigation.navigate('Deal Info',{id:item.dealId})}>
                       <Text style={{color:'white',fontWeight:"bold"}}>
                             PARTICIPATE
                       </Text>
                </TouchableOpacity>
                </View>
                              :
                <View>
                <Text style={{alignSelf:'center',color:'black'}}>{item.lenderPaticipateStatus}</Text>
                <TouchableOpacity style={styles.btnDiAble}>
                       <Text style={{color:'white',fontWeight:"bold"}}>
                             PARTICIPATE
                       </Text>
                </TouchableOpacity>
                </View>
                }


            </View>

            <View style={styles.flatmain}>
               <Text style={{fontWeight:'bold',color:'#569F40',fontSize:15,marginRight:33}}>Participation Time</Text>
               <View style={{flexDirection:"row"}}>
                 <Text>{item.fundsAcceptanceStartDate}</Text>
                 <Text style={{fontWeight:'bold',color:'#569F40',}}> to </Text>
                 <Text>{item.fundsAcceptanceEndDate}</Text>
               </View>
            </View>
            <View style={styles.flatmain}>
               <Text style={{fontWeight:'bold',color:'#569F40',fontSize:15,marginRight:79}}>Fund Status</Text>
               <Text>{item.fundingStatus}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',padding:14}}>
            <TouchableOpacity onPress={()=>navigation.navigate('View Lenders',{id:item.dealId})} style={{backgroundColor:'#6495ED',borderRadius:3,height:28,width:180,alignItems:'center',justifyContent:'center',}}>
            <Text style={{color:'white',fontWeight:"bold"}}>VIEW LENDERS</Text>
            </TouchableOpacity>
            </View>

          </View>


      );
    };

    useEffect(()=>{
       ongoingDealfunction();
    },[]);

    const Footer_Component = () => {
      return (
        <View style={{
          height:80,
          width: "100%",
          justifyContent: 'center',
          alignItems: 'center'
        }}>
  
        </View>
      );
    }

  return (

    <SafeAreaView style={{paddingTop:6,flex:1,marginBottom:0}}>
    <View style={{margin:5,alignItems:'flex-end',lexDirection:'row',justifyContent:'center',padding:5}}>
       <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:110,alignItems:'center',justifyContent:'center',}}
          onPress={()=>navigation.navigate('Escrow Closed Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Closed Deals</Text></TouchableOpacity>
    </View>
    <View style={{marginTop:4}}>
      <FlatList
           data={deal}
           renderItem={renderList}
           keyExtractor={item => item.dealId}
           ListFooterComponent={Footer_Component}

      />
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

  btnAble:{
    backgroundColor:'green',
    borderRadius:3,
    height:28,
    width:180,
    alignItems:'center',
    justifyContent:'center',
  },

  btnDiAble:{
    // backgroundColor:'#569F40',
    backgroundColor:'red',
    borderRadius:3,
    height:28,
    width:180,
    alignItems:'center',
    justifyContent:'center',
    opacity:0.1,

  }


})

export default EscrowDeals;
