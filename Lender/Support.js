import React,{useState}from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,ScrollView,ToastAndroid} from "react-native";

import {useSelector} from "react-redux";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import {FormData,File} from "formdata-node";
import style from '../src/styles';
import success from "../navigation/Success";
import error from "../navigation/Error";
import { Root } from "popup-ui";
import uploadsuccess from "../navigation/uploadsuccess";




const Support=({navigation})=>{
    const count =useSelector(state=>state.counter);
    var id=count.data.id;
    var access = count.headers.accesstoken;
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[number,setnumber]=useState("");
    const[query,setquery]=useState("");
    const[load,setLoading]=useState("");
     const [ doc, setDoc ] = useState();
     const [ photoId, setphotoid] = useState();
      const fd = new FormData();
  const errormsg = msg => {
        ToastAndroid.showWithGravity(msg,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,

        );
      };
        axios({
            method:'get',
            url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/gettingMobileAndEmail',
            headers:{
                  accessToken:access,
                 }
           })
            .then(function (response) {
             setname(response.data.firstName);
             setemail(response.data.email);
             setnumber(response.data.mobileNumber);
                  })
            .catch(function (error) {
           console.log('error',error);

           });

    const submitfunction=props=>{
        if(name==""){
            errormsg("Please enter Your Name");
            return false;
        }
        if(email==""){
          errormsg("Please enter your email_id");
            return false;

        }
        if(number==""){
          errormsg("Please enter your Mobile Number");
            return false;

        }
        if(query==""){
          errormsg("Please enter your Query");
            return false;

        }
        setLoading(true);
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/readingQueriesFromUsers',
    {
        query:query,
        documentId:photoId,
        email:email,
        mobileNumber:number
    },
    {headers:{
        accessToken: count.headers.accesstoken,
    }}
    )
    .then(function (response) {
    // console.log(response.data);
            setTimeout(function(){
              popupmsg();
          }, 3000);
          })
          .catch(function (error) {
              error();
    }
    );
       }

function popupmsg(){
        return (
         Popup.show({
           type: 'Success',
           title: 'Success',
           button: true,
           textBody: 'Thanks.We have received your Query and will get back to you with a response soon',
           buttontext: 'Ok',
           callback: () => Popup.hide(),

         })
    );
    }

const pickDocument = async () => {
                let result = await DocumentPicker.getDocumentAsync({
                 type: "*/*",
                 copyToCacheDirectory: true })
                  .then(response => {
                    if (response.type == 'success') {
                      let { name, size, uri } = response;

                   / ------------------------/
                      if (Platform.OS === "android" && uri[0] === "/") {
                         uri = `file://${uri}`;
                         console.log(uri);
                         uri = uri.replace(/%/g, "%25");
                         console.log(uri);
                      }
                  / ------------------------/

                      let nameParts = name.split('.');
                      let fileType = nameParts[nameParts.length - 1];
                      var fileToUpload = {
                        name: name,
                        size: size,
                        uri: uri,
                        type: "application/" + fileType
                      };
                      fd.append("USERQUERYSCREENSHOT",fileToUpload);
                      console.log(fileToUpload.name, '...............file')
                      console.log(fd)
                      axios({
                          method:'post',
                          url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/userQueryScreenshot',
                          data:fd,
                          headers:{
                                accessToken: access,
                                "content-type": 'multipart/form-data',
                               }
                         })
                          .then(function (response) {
                          //  console.log(response);
                            uploadsuccess();
                           setphotoid(response.data.documentId);
                          })
                    .catch(function (error) {
                    //  console.log('error',error);
                        error();
                      });
                      // console.log(fd._parts)
                      // console.log(fileToUpload.uri);
                      setDoc(fileToUpload.name)
                    }
                  });
            }

  return(
    <Root>
        <View style={styles.container}>
        <ScrollView>
        <TouchableOpacity style={styles.btn1} onPress={()=>{navigation.navigate('Ticket History')}} >
              <Text>View Query</Text>
        </TouchableOpacity>
        <View style={styles.cont}>
           <Text style={styles.txt}>Contact Us</Text>
           <Text style={styles.text}>Name</Text>
           <TextInput style={styles.input}  onChangeText={(text)=>setname(text)} value={name}/>
           <Text style={styles.text}>Email</Text>
           <TextInput style={styles.input}  onChangeText={(text)=>setemail(text)} value= {email}/>
           <Text style={styles.text}>Mobile Number</Text>
           <TextInput style={styles.input}  onChangeText={(numeric)=>setnumber(numeric)} maxLength={10} keyboardType="number-pad" value={number}/>
           <Text style={styles.text}>Query</Text>
           <TextInput style={styles.input1}  onChangeText={(text)=>setquery(text)}  numberOfLines={5} multiline={true} value={query}/>
           <TouchableOpacity onPress={pickDocument}>
             <View style={style.inputbox1}>
                 <Icon  size={20} style={{alignItems:'flex-start'}} name="cloud-upload"/>
                 <Text style={style.txt6}>{doc}</Text>
                    <View style={style.btn3}>
                      <Text>Upload</Text>
                    </View>
             </View>
           </TouchableOpacity>

<<<<<<< Updated upstream
           <TouchableOpacity onPress={submitfunction}>
              <View style={styles.btn}>
              <Icon  size={15}  color='black' name="send"/>
              <Text style={{marginLeft:10}}>Send</Text>
              </View>
           </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.btn} onPress={submitfunction} >
                          <Text>Submit</Text>
                    </TouchableOpacity> */}
=======

                         <TouchableOpacity onPress={submitfunction}>
                   <View style={styles.btn}>
                   <Icon  size={15}  color='black' name="send"/>
                   <Text style={{marginLeft:10}}>Send</Text>
                   </View>
                </TouchableOpacity>
>>>>>>> Stashed changes
        </View>

        </ScrollView>
        </View>
    </Root>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    img:{
        marginTop:30,
      height:200,
      width:240
    },
    cont :{
        borderColor:'grey',
        borderWidth:2,
        borderRadius:10,
        height:500,
        width:300

    },
    txt:{
        marginTop:10,
        fontWeight:"bold",
        fontSize:20,
        alignContent:"center",
        justifyContent:"center",
        alignSelf:"center"
    },
    text:{
        marginLeft:20,
        fontSize:15,
        marginTop:15,
        fontWeight:"bold"
    },
    input:{
        // borderBottomColor:"grey",
        // borderWidth:1,
        borderBottomWidth:1,
        marginLeft:20,
        marginRight:20
    },
    input1:{
        borderWidth:1,
        marginLeft:20,
        marginRight:20,
        marginTop:5,
        textAlignVertical: 'top',
        padding:10
    },

    btn:{
      borderWidth:1,
      width:100,
      alignItems:'center',
      alignSelf:'center',
      height:35,
      justifyContent:'center',
      backgroundColor:'#ADD8E6',
      borderRadius:15,
      flexDirection:'row'
     },

            btn1:{
                // margin:2,
                padding:5,
                width:100,
                justifyContent:"flex-end",
                alignItems:"center",
                alignSelf:"flex-end",
                borderRadius:5,
                backgroundColor:"#c0c0c0",
              marginTop:1,
              marginBottom:10
                },
        upload:{
            padding:5,
            width:80,
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"center",
            borderRadius:26,
            backgroundColor:"#3A9BDC",
            marginTop:15,
            marginLeft:12
            },

  });
export default Support;
