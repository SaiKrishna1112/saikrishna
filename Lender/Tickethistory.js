import React,{useState} from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,FlatList} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from "react-redux";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";


const Tickethistory= ({navigation}) =>{
    const[history,sethistory]=useState([]);
    const count =useSelector(state=>state.counter);

    var partnerid=count.data.id;

    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/queryDetailsBasedOnUserId',
    {
        pageNo:1,
        pageSize:5,
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



    const renderList = ({ item }) => {
        return (

<ScrollView>
<View style={{flex:1}}>
          <View style={styles.renderview}>
              <View style={styles.insideview}>
                 <Text style={styles.txt5}>S.No  </Text>
                 <Text style={{color:"black",fontSize:14,paddingLeft:100}}>{item.sNo}</Text>
              </View>



              <View style={styles.insideview}>
                <Text style={styles.txt5}>Ticket ID  </Text>
                <Text style={{color:"black",fontSize:14,paddingLeft:70}}>{item.ticketId}</Text>

              </View>

              <View style={styles.insideview}>
                <Text style={styles.txt5}>Status  </Text>
                <Text style={{color:"black",fontSize:14,paddingLeft:80}}>{item.status}</Text>
              </View>

              <View style={styles.insideview}>
                <Text style={styles.txt3}>Query  </Text>
                <Text style={{color:"black",fontSize:14,paddingLeft:80}}>{item.query}</Text>
              </View>
          </View>
          </View>
          </ScrollView>

        );
      };




    return (
        <SafeAreaView style={{backgroundColor:"#CCD8E1",flex:5}}>
        <View style={{marginTop:10}}>
        <FlatList
             data={history}
             renderItem={renderList}
        />
        </View>
        </SafeAreaView>
        )

}


const styles=StyleSheet.create({
btn1:{
    padding:10,
    width:250,
    borderRadius:5,
    backgroundColor:"#B38481",
    marginTop:7,
    marginLeft:90
},
btn2:{
    padding:10,
    width:250,
    borderRadius:5,
    backgroundColor:"#C4AEAD",
    marginTop:5,
    marginLeft:90,
    marginBottom:20
},

txt4:{
    color:"#000000",
    fontWeight:"bold",


},
renderview:
{
    marginBottom:10,
    borderColor:"grey",
    alignSelf:"center",
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width:350,
},
txt5:{

    color:"black",
    fontSize:14,
    borderBottomColor:"black",
    fontWeight:"bold",
},
txt3:{
    color:"black",
    fontSize:14,
    fontWeight:"bold",
},
insideview:{
    flexDirection:"row",
    borderBottomWidth:1,
    borderBottomColor:"black",
    marginLeft:10,
    marginRight:10,
    padding:5,
    justifyContent:"flex-start"
},
})
export default Tickethistory;
