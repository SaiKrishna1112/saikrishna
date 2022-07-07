import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'
<<<<<<< Updated upstream

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity} from 'react-native';

=======
import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity,ToastAndroid} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
>>>>>>> Stashed changes

import ParticpatedDeals from './ParticpatedDeals';
import ViewStatement from './ViewStatement';
import SingleDeal from './SingleDeal';

const PersonalDeals = ({navigation}) => {
 const errormsg = msg => {
   ToastAndroid.showWithGravity(msg,
     ToastAndroid.SHORT,
     ToastAndroid.CENTER
   );
 };
    const [deal,setDeal]=useState([])
    const [count,setCount] = useState(1);
    const [loading,setLoading] = useState(false)
    const userDetails = useSelector(state=>state.counter);
   const userDetail = useSelector(state=>state.logged);
   const[count1,setCount1]=useState(1);
    var access = userDetails.headers.accesstoken;
    var id = userDetails.data.id;
    var Data={ pageNo:count,pageSize:10,dealType:'HAPPENING',dealName: "PERSONAL"}

    function add(){
       setCount(count+1);
     ongoingDealfunction()
    }
          function sub(){
           if(count==0){
             errormsg("No Data Found")
             setCount(count+2)
          }else{
          setCount(count-1);
           ongoingDealfunction()
          }
          }

const ongoingDealfunction=param=>{
 setLoading(true)
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/listOfDealsInformationForEquityDeals',
    Data,
      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
       // console.log(response.data.listOfBorrowersDealsResponseDto);
            setDeal(response.data.listOfBorrowersDealsResponseDto)
            setTimeout(function(){
                    setLoading(false);
                   },2000)
        })
        .catch(function(error){
            console.log(error)
        })
       }

       function add1(){
        setCount1(count1+1);
      principalfunction()

     }
           function sub1(){
            if(count1==0){
              errormsg("No Data Found")
              setCount1(count1+2)
           }else{
           setCount1(count1-1);
            principalfunction()

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
            <TouchableOpacity style={{backgroundColor:'#6495ED',borderRadius:3,height:28,width:180,alignItems:'center',justifyContent:'center',}} onPress={()=>navigation.navigate('View Lenders',{id:item.dealId})}>
            <Text style={{color:'white',fontWeight:"bold"}}>VIEW</Text>
            </TouchableOpacity>
            </View>

          </View>


      );
    };

    useEffect(()=>{
       ongoingDealfunction();
    },[]);
    function footer() {
     return (
      <View style={{alignSelf:'center'}}><Text>No More Data Present Please GO Back </Text></View>
     );
    }

  return (

    <SafeAreaView style={{paddingTop:6,flex:1,marginBottom:0}}>
    <View style={{margin:5,alignItems:'flex-end',lexDirection:'row',justifyContent:'center',padding:5}}>
       <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:110,alignItems:'center',justifyContent:'center',}}
          onPress={()=>navigation.navigate('Personal Closed Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Closed Deals</Text></TouchableOpacity>
    </View>
<<<<<<< Updated upstream

=======
    <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
    <View style={styles.btn}><TouchableOpacity onPress={sub}><Text style={{color:'white'}}><Icon name="arrow-back" size={15}/>Prev</Text></TouchableOpacity></View>

    <View style={styles.btn2}><TouchableOpacity onPress={add}><Text>Next<Icon name="arrow-forward" size={15}/></Text></TouchableOpacity></View>
    </View>
>>>>>>> Stashed changes
    <View style={{marginTop:4}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub1}><Text style={{color:'white'}}><Icon name="arrow-back" size={15}/>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn1}><TouchableOpacity onPress={add1}><Text>Next<Icon name="arrow-forward" size={15}/></Text></TouchableOpacity></View>
                  </View>
      <FlatList
           data={deal}
           renderItem={renderList}
           keyExtractor={item => item.dealId}
<<<<<<< Updated upstream
           
=======
           ListFooterComponent={footer}
           ListFooterComponentStyle={styles.footerStyle}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
   btn1:{
    marginRight:30,
    borderWidth:1,
    width:60,
    height:20,
    alignItems:'center',
    borderRadius:8,
    backgroundColor:'#999999'
   },
=======

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
  footerStyle:{
   marginTop:50
  },
  lottie: {
    width: 150,
    height: 150
  },
>>>>>>> Stashed changes


})

export default PersonalDeals;
