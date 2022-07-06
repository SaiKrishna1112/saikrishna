import React, { useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';


import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,TouchableOpacity} from 'react-native';



const ViewStatement = ({route,navigation}) => {
    const [Statement,setStatement]=useState([])
    const userDetails = useSelector(state=>state.counter);
//   const userDetail = useSelector(state=>state.logged);
    var access = userDetails.headers.accesstoken;
    var id = userDetails.data.id;
    var dealId = route.params.id;


    axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/'+dealId+'/loanStatementBasedOnCurrentValue',

      {headers:{
              accessToken:access
             }
                 })

        .then(function(response){
            //console.log(response.data.listOfDealsInformationToLender)
            setStatement(response.data.participationUpdatedInfoList)


        })
        .catch(function(error){
            console.log(error)
        })


        const renderList = ({ item }) => {
            return (

                <View style={{backgroundColor:'white',marginHorizontal:11,height:"auto",padding:8,borderColor:'grey',borderWidth:2.5,borderBottomWidth:0}}>
                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>SNo</Text></View>
                <View><Text style={styles.Txt2}>{item.sno}</Text></View>

                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>emiStartDate </Text></View>
                <View><Text style={styles.Txt2}>{item.emiStartDate}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>principalAmount</Text></View>
                <View><Text style={styles.Txt2}>{item.principalAmount}</Text></View>
                </View>

                <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>interestAmount </Text></View>
                <View><Text style={styles.Txt2}>{item.interestAmount}</Text></View>
                </View>

                <View style={{ flexDirection:"row",
                alignItems:'center',

                paddingVertical:5}}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>differenceInDays</Text></View>
                <View><Text style={styles.Txt2}>{item.differenceInDays}</Text></View>
                </View>

                {/* <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Status </Text></View>
                <View><Text style={styles.Txt2}>{item.participationStatus}</Text></View>
                </View> */}
           </View>
            );
          };

        return (

            <SafeAreaView style={{paddingTop:6,flex:1,marginBottom:0}}>
                 <View style={{marginTop:8}}>
              <FlatList
                   data={Statement}

                   renderItem={renderList}

                //    keyExtractor={item => item.Id}
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

          export default ViewStatement
