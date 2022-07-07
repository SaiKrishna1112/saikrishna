import React,{useState,useEffect} from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,FlatList} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from "react-redux";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";


const Tickethistory= ({navigation}) =>{
    const[history,sethistory]=useState([]);
    const count =useSelector(state=>state.counter);
const[count1,setCount1]=useState(1);
    var partnerid=count.data.id;


function historyfunction(){
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/queryDetailsBasedOnUserId',
    {
        pageNo:count1,
        pageSize:10,
        status:"Pending",
        userId:count.data.id
    },
    {headers:{
        accessToken: count.headers.accesstoken,
    }}
    )
    .then(function(response){
        sethistory(response.data.listOfUserQueryDetailsResponseDto)
        // console.log(response.data);

    })
    .catch(function(error){
        // console.log(error)
    })
}


function add1(){
    setCount1(count1+1);
  historyfunction()

 }
         function sub1(){
          if(count1==0){
            errormsg("No Data Found")
            setCount1(count1+2)
         }else{
         setCount1(count1-1);
         historyfunction()

         }
         }
useEffect(()=>{
    historyfunction();
},[])

const renderList = ({ item }) => {
return (
    <ScrollView>
         
         <View style={{backgroundColor:'white',marginHorizontal:11,height:"auto",padding:8,borderColor:'grey',borderWidth:2,borderTopColor:"#F75D59",borderBottomWidth:0,borderTopWidth:3.5}}>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>SNo</Text></View>
                <View><Text style={styles.Txt2}>{item.sNo}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Ticket ID</Text></View>
                <View><Text style={styles.Txt2}>{item.ticketId}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Status</Text></View>
                <View><Text style={styles.Txt2}>{item.status}</Text></View>
                </View>

                <View style={styles.flatmain1}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Query</Text></View>
                <View><Text style={styles.Txt2}>{item.query}</Text></View>
                </View>
        </View>
    </ScrollView>

        );
      };
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
        <SafeAreaView>
        <View >
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub1}><Text style={{color:'white'}}><Icon name="arrow-back" size={15}/>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn1}><TouchableOpacity onPress={add1}><Text>Next<Icon name="arrow-forward" size={15}/></Text></TouchableOpacity></View>
                  </View>
        <FlatList
             data={history}
             renderItem={renderList}
             keyExtractor={item => item.sNo}
             ListFooterComponent={Footer_Component}
        />
        </View>
        </SafeAreaView>
        )

}


const styles=StyleSheet.create({
    flatmain:{
        flexDirection:"row",
        alignItems:'center',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        paddingVertical:5
      },
      flatmain1:{
        flexDirection:"row",
        alignItems:'center',
        paddingVertical:5
      },
    Txt1:{
        fontWeight:'bold',
        color:'#F75D59',
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
       


})
export default Tickethistory;
