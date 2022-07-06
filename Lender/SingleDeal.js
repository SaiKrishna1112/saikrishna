import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";


import { StyleSheet, Text, View,Button ,Alert,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity,ScrollView} from 'react-native';

const SingleDeal = ({route,navigation}) => {
  const [value, setValue] = useState("MONTHLY");
  const [dealName,setDealName]=useState('');
  const [DealAmount,setDealAmount]=useState('');
  const [tenure,setTenure]=useState('');
  const [start,setStart]=useState('');
  const [end,setEnd]=useState('');
  const [participationLimit,setParticipationLimit]=useState('');
  const [groupname,setgroupname]=useState();
  const [amount,setAmount]=useState();
  const [roi,setroi]=useState();
  const [mini,setmini]=useState();
  const [maxi,setmaxi]=useState();
  const [available,setavailable]=useState();
  const [groupid,setgroupid]=useState();
  const [loading,setloading]=useState();
  const [Monthly,setMonthly]=useState();
  const [Quaterly,setQuaterly]=useState();
  const [Half,setHalf]=useState();
  const [Yearly,setYearly]=useState();
  const [EOD,setEOD]=useState();
        //console.log(route);
        //console.log(route.params.id);
        var dealId = route.params.id;
    const userDetails = useSelector(state=>state.counter);
      var access = userDetails.headers.accesstoken;
      var id = userDetails.data.id;
    const deal = params => {
    axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/'+dealId+'/singleDeal',
      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
            //console.log(response.data);

            setDealName(response.data.dealName)
            setDealAmount(response.data.dealAmount)
            setTenure(response.data.duration)
            setStart(response.data.fundStartDate)
            setEnd(response.data.fundEndDate)
            setParticipationLimit(response.data.lenderParticiptionLimit)
            setgroupname(response.data.groupName)
            setroi(response.data.rateOfInterest)
            setgroupid(response.data.groupId)
            setmini(response.data.minimumPaticipationAmount)
            setmaxi(response.data.lenderParticiptionLimit)
            setavailable(response.data.remainingAmountInDeal)
            setMonthly(response.data.monthlyInterest)
            setYearly(response.data.yearlyInterest)
            setQuaterly(response.data.quartlyInterest)
            setEOD(response.data.endofthedealInterest)
            setHalf(response.data.halfInterest)
        })
        .catch(function(error){
            console.log(error)
        })

     }
useEffect(()=>{
  deal();
},[])

var data1={
 dealId: dealId,
 groupId: groupid,
 lenderReturnType: value,
 participatedAmount: amount,
 paticipationStatus: "ADD",
 processingFee: 0,
 rateofInterest: roi,
 userId: id,
}
const dealparticipate = params => {
 if(amount==""){
  alert("Please Enter Minimium Amount ")
  return false;
 }
 if(amount<=5000){
  alert("Please Enter Above INR 5000")
  return false
 }
 var data ={
  userId:id,
  groupId:groupid,
  dealId:dealId,
  participatedAmount:amount,
  lenderReturnType:value,
  rateofInterest:roi,
  processingFee:0
 }
 setloading(true)
axios.patch('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/updatingLenderDeal',
data,
  {headers:{
          accessToken:access
         }
             })

    .then(function(response){
        //console.log(response.data);
        Alert.alert(
         "Success",
         "Successfully Participate in Deal",
         [
          { text: "OK", onPress: () => navigation.navigate('Participated Deals') }
         ]
        )
        setTimeout(function(){
         setloading(false)
      },8000);
       })
       .catch(function(error){
           console.log(error)
           Alert.alert(
            "Oops",
            "Something Went Wrong Please try After Sometime",
            [
             { text: "OK", onPress: () =>navigation.navigate('Participated Deals') }
            ]
           )
       })

    }


  return (
    <SafeAreaView style={{paddingTop:4,flex:8,marginBottom:10}}>
    <View style={{marginHorizontal:20}}>

    </View>

    <ScrollView>
    <View style={{backgroundColor:'white',marginHorizontal:9,marginTop:15}}>
    <View style={{marginHorizontal:20,marginTop:17}}>
      <Text style={{fontWeight:'bold',fontSize:18}}>Deal Info</Text>
    </View>

    <View style={{marginTop:15}}>

        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Name </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{dealName}</Text></View>
        </View>
        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Amount </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{DealAmount}</Text></View>
        </View>
        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Available Limit </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{available}</Text></View>
        </View>
        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Tenure in Months </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{tenure}</Text></View>
        </View>
        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Funding Start Date </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{start}</Text></View>
        </View>
        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Funding End Date </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{end}</Text></View>
        </View>
        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Minimum Participation </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{mini}</Text></View>
        </View>
        <View style={styles.flatmain}>
                 <View style={styles.TxtView1}><Text style={styles.Txt1}>Miximum Participation </Text></View>
                 <View style={styles.TxtView1}><Text style={styles.Txt2}>{participationLimit}</Text></View>
        </View>
    </View>



    <View style={{margin:10,alignItems:'center'}}>

      <Text style={{fontSize:18,margin:10}}>Your Participation to this deal is</Text>

      <View style={{flexDirection:'row'}}>
      <View style={{borderWidth:1}}>
      <TextInput style={{borderColor:'grey',marginLeft:10,width:230,alignSelf:'center'}}
      placeholder="Enter Participation Amount" onChangeText={(number)=>setAmount(number)} keyboardType="numeric" maxLength={8}/></View>
       <Icon name="alert-circle" size={29} style={{marginHorizontal:10}}/>
      </View>
    </View>


    <View style={{marginHorizontal:18,alignItems:'center',backgroundColor:'#DCDCDC',paddingBottom:20,marginLeft:20}}>
    { groupname=='NEWLENDER' ?
    <View>
        <View style={{backgroundColor:'#008EFF',paddingVertical:8,width:335,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>New Lender</Text>
          <Icon name="flash" size={22} style={{marginHorizontal:10,color:'#ffd700'}}/>
        </View>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
               <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="MONTHLY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Monthly Interest Pay-out {roi}</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="MONTHLY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Monthly Interest Pay-out {Monthly}%</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="QUARTELY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Quaterly Interest {Quaterly}%</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="HALFLY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Half-Yearly Interest Pay-out {Half}%</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="YEARLY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Yearly Interest Pay-out {Yearly}%</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="ENDOFTHEDEAL"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>End of Deal Interest Pay-out {EOD}%</Text>
               </View>
               <View style={{alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity style={{backgroundColor:'#008EFF',width:200,padding:5,alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}>Participate</Text>
                  </TouchableOpacity>
              </View>
        </RadioButton.Group>
      </View>
                               :
     <View>
        <View style={{backgroundColor:'#008EFF',paddingVertical:8,width:335,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Oxy Premium</Text>
          <Icon name="flash" size={22} style={{marginHorizontal:10,color:'#ffd700'}}/>
        </View>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
             <View>
               <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="MONTHLY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Monthly Interest Pay-out {Monthly}%</Text>
               </View>
               {Quaterly!=0?<View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="QUARTELY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Quaterly Interest {Quaterly}%</Text>
               </View>:null}
               {Half!=0?<View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="HALFLY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Half-Yearly Interest Pay-out {Half}%</Text>
               </View>:null}
               {Yearly!=0?<View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                 <RadioButton.Item value="YEARLY"/>
                 <Text style={{fontSize:18,left:-10,top:-2}}>Yearly Interest Pay-out {Yearly}%</Text>
               </View>:null}
                {EOD!=0?<View style={{flexDirection:'row',alignItems:'center',top:-2}}>
                  <RadioButton.Item value="ENDOFTHEDEAL"/>
                  <Text style={{fontSize:18,left:-10,top:-2}}>End of Deal Interest Pay-out {EOD}%</Text>
                </View>:null}
               <View style={{alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity style={{backgroundColor:'#008EFF',width:200,padding:5,alignItems:'center'}} onPress={dealparticipate}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}>Participate</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </RadioButton.Group>
   </View>
     }
    </View>
    </View>
    <AnimatedLoader
     visible={loading}
     overlayColor="rgba(255,255,255,0.75)"
     source={require("../assets/loading-state.json")}
     animationStyle={styles.lottie}
     speed={1}>
 <Text style={{fontSize:18,fontWeight:'bold'}}>Loading.....</Text>
 </AnimatedLoader>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    flatmain:{
      flexDirection:"row",
      alignItems:'center',
      paddingHorizontal:20
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
        width:170,
        borderColor:'grey',
        borderWidth:1,
        padding:5
    },
    lottie: {
      width: 150,
      height: 150
    },


  })

export default SingleDeal;


// <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
//   <RadioButton.Item value="QUARTELY"/>
//   <Text style={{fontSize:18,left:-10,top:-2}}>Quaterly Interest 0%</Text>
// </View>
// <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
//   <RadioButton.Item value="HALFLY"/>
//   <Text style={{fontSize:18,left:-10,top:-2}}>Half-Yearly Interest Pay-out 0%</Text>
// </View>
// <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
//   <RadioButton.Item value="YEARLY"/>
//   <Text style={{fontSize:18,left:-10,top:-2}}>Yearly Interest Pay-out 0%</Text>
// </View>
// <View style={{flexDirection:'row',alignItems:'center',top:-2}}>
//   <RadioButton.Item value="ENDOFTHEDEAL"/>
//   <Text style={{fontSize:18,left:-10,top:-2}}>End of Deal Interest Pay-out 0%</Text>
// </View>
