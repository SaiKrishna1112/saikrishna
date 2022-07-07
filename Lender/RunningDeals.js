import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity,ScrollView,ToastAndroid} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

import ParticpatedDeals from './ParticpatedDeals';
import ViewStatement from './ViewStatement';
import SingleDeal from './SingleDeal';
import ViewLenders from './Viewlenders';

const OngoingDeals = ({navigation}) => {
 const errormsg = msg => {
   ToastAndroid.showWithGravity(msg,
     ToastAndroid.SHORT,
     ToastAndroid.CENTER
   );
 };
    const [deal,setDeal]=useState([])
     const [count,setCount] = useState(1);
     const [loading,setLoading] = useState(false);
    const userDetails = useSelector(state=>state.counter);
//   const userDetail = useSelector(state=>state.logged);
    var access = userDetails.headers.accesstoken;
    var id = userDetails.data.id;
    var Data={ pageNo:count,pageSize:10,dealType:'HAPPENING'}

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
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/listOfDealsInformationToLender',
    Data,
      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
        // console.log(response.data.listOfDealsInformationToLender[0].lenderPaticipateStatus);
            setDeal(response.data.listOfDealsInformationToLender)
            setTimeout(function(){
              setLoading(false);
            },2000);
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
    function footer() {
     return (
      <View style={{alignSelf:'center'}}><Text>No More Data Present Please GO Back </Text></View>
     );
    }

  return (
   // <TouchableOpacity style={{backgroundColor:'#FF6347',borderRadius:3,height:28,width:180,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white',fontWeight:"bold"}}>Running Deals</Text></TouchableOpacity>

    <SafeAreaView style={{paddingTop:6,flex:1,marginBottom:-2}}>
      <View style={{marginTop:5}}>
        <View style={{margin:5,alignItems:'center',flexDirection:'row',justifyContent:'center',padding:5}}>
           <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:105,alignItems:'center',justifyContent:'center'}}
              onPress={()=>navigation.navigate('Personal Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Personal Deals</Text></TouchableOpacity>
<<<<<<< Updated upstream
            <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:100,alignItems:'center',justifyContent:'center',marginLeft:10}}
              onPress={()=>navigation.navigate('Escrow Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Escrow Deals</Text></TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:130,alignItems:'center',justifyContent:'center',marginLeft:10}}
              onPress={()=>navigation.navigate('Participated Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Participated Deals</Text></TouchableOpacity>
=======
              <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:100,alignItems:'center',justifyContent:'center',marginLeft:10}}
                 onPress={()=>navigation.navigate('Escrow Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Escrow Deals</Text></TouchableOpacity>
                 <TouchableOpacity style={{backgroundColor:'#3090C7',borderRadius:3,height:28,width:130,alignItems:'center',justifyContent:'center',marginLeft:10}}
                    onPress={()=>navigation.navigate('Participated Deals')}><Text style={{color:'white',fontWeight:"bold"}}>Participated Deals</Text></TouchableOpacity>
>>>>>>> Stashed changes
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:3}}>
        <View style={styles.btn}><TouchableOpacity onPress={sub}><Text style={{color:'white'}}><Icon name="arrow-back" size={15}/>Prev</Text></TouchableOpacity></View>

        <View style={styles.btn2}><TouchableOpacity onPress={add}><Text>Next<Icon name="arrow-forward" size={15}/></Text></TouchableOpacity></View>
        </View>
      </View>
       { deal===""? <View><Text>NO Data Present</Text></View>:
       <ScrollView>
    <View>
      <FlatList
           data={deal}

           renderItem={renderList}

           keyExtractor={item => item.dealId}
           ListFooterComponent={footer}
           ListFooterComponentStyle={styles.footerStyle}
      />
    </View>
   </ScrollView>
   }

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

})

export default OngoingDeals;
