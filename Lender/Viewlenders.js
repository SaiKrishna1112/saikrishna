import React, { useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity} from 'react-native';



const ViewLenders =({route,navigation}) => {
    const [view,setview]=useState([])
    const userDetails = useSelector(state=>state.counter);
//   const userDetail = useSelector(state=>state.logged);
    var access = userDetails.headers.accesstoken;
    var id = userDetails.data.id;
    var dealId = route.params.id;


    axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+dealId+'/listOfLenders',

      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
            // console.log(response.data)
            setview(response.data.lenderPaticipatedResponseDto)


        })
        .catch(function(error){
            console.log(error)
        })


        const renderList = ({ item }) => {
            return (

                <View style={{backgroundColor:'white',marginHorizontal:11,height:"auto",padding:8,borderColor:'grey',borderWidth:2.5,borderBottomWidth:0}}>
                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Name</Text></View>
                <View><Text style={styles.Txt2}>{item.dealName}</Text></View>

                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Lender Id </Text></View>
                <View><Text style={styles.Txt2}>LR{item.lenderId}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Registered Date</Text></View>
                <View><Text style={styles.Txt2}>{item.registeredDate}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Participate Amount </Text></View>
                <View><Text style={styles.Txt2}>{item.paticipatedAmount}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Roi </Text></View>
                <View><Text style={styles.Txt2}>{item.rateOfInterest}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>feeStatus </Text></View>
                <View><Text style={styles.Txt2}>{item.feeStatus}</Text></View>
                </View>
           </View>
            );
          };

        return (

            <SafeAreaView style={{paddingTop:8,flex:1,marginBottom:0}}>

              <FlatList
                   data={view}

                   renderItem={renderList}

                    keyExtractor={item => item.lenderId}
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
                color:'#2B547E',
                fontSize:15

            },

            Txt2:{
                fontWeight:'bold',
                color:'black',
                fontSize:15

            },

            TxtView1:{
                width:190,
            }


          })

export default ViewLenders;
