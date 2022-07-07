import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'

import {useSelector} from 'react-redux';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity} from 'react-native';


import ParticpatedDeals from './ParticpatedDeals';

const MyClosedDeals = ({navigation}) => {
    const [deal,setDeal]=useState([])
    const[count1,setCount1]=useState(1);
    const userDetails = useSelector(state=>state.counter);
//   const userDetail = useSelector(state=>state.logged);
    var access = userDetails.headers.accesstoken;
    var id = userDetails.data.id;
    var Data={ pageNo:count1,pageSize:10,dealType:'CLOSED'}

const myclosedDealfunction=param=>{
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/listOfDealsInformationToLender',
    Data,
      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
        //console.log(response.data);
            setDeal(response.data.listOfDealsInformationToLender)
        })
        .catch(function(error){
            console.log(error)
        })
       }


function add1(){
  setCount1(count1+1);
  myclosedDealfunction()

}
       function sub1(){
        if(count1==0){
          errormsg("No Data Found")
          setCount1(count1+2)
       }else{
       setCount1(count1-1);
       myclosedDealfunction()

       }
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
                <TouchableOpacity style={styles.btnAble}>
                       <Text style={{color:'white',fontWeight:"bold"}}>
                             PARTICIPATE
                       </Text>
                </TouchableOpacity>
                </View>
                              :
                <View>
                <Text style={{alignSelf:'center',color:'black'}}>{item.lenderPaticipateStatus}</Text>
                <TouchableOpacity style={styles.btnDiAble}>
                       <Text style={{color:'black',fontWeight:"bold"}}>
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
       myclosedDealfunction();
    },[]);

  return (

    <SafeAreaView style={{paddingTop:10,flex:1,marginBottom:0}}>

        <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
            <View style={styles.btn}><TouchableOpacity onPress={sub1}><Text style={{color:'white'}}><Icon name="arrow-back" size={15}/>Prev</Text></TouchableOpacity></View>

            <View style={styles.btn2}><TouchableOpacity onPress={add1}><Text>Next<Icon name="arrow-forward" size={15}/></Text></TouchableOpacity></View>
        </View>
    {/* <View> */}
      <FlatList
           data={deal}

           renderItem={renderList}

           keyExtractor={item => item.dealId}
      />
    {/* </View> */}

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
    opacity:2,

  },
  btn:{
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


})

export default MyClosedDeals;
