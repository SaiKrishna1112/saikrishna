import  React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Pressable,Alert,Toast} from "react-native";
import DatePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import {useSelector} from "react-redux"

const Withdrawalfromwallet= ({navigation}) =>{
  const userDetails=useSelector(state=>state.counter);
  const userDetail=useSelector(state=>state.logged);
  var access=userDetails.headers.accesstoken;
  var id=userDetails.data.id;
  var primarytype=userDetails.data.primaryType;


    const[withdrawamount,setwithdrawamount]=useState();
    const[reason,setreason]=useState();
    const [defaultRating, setDefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const[feedback,setfeedback]=useState();
    const [date, setDate] = useState(new Date());
    const [mode,setMode] = useState('date');
    const [text,setText] = useState('09/06/2022');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading,setLoading]=useState(false)


const[show,setshow]=useState()
    const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';


//=============Rating=================
const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

//===============================

//===============DatePicker===========
const onChange=(event,selectDate) => {
  const currentDate = selectDate || date;
  setshow(Platform.OS === 'ios');
  setDate(currentDate);

  let tempDate = new Date(currentDate);
  let fDate = tempDate.getDate() + '/'+(tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
  setText(fDate);

  console.log(fDate);
 }
 const showMode = (currentMode)=> {
  setshow(true);
  setMode(currentMode);
 };

//====================================

//console.log(id,primarytype,withdrawamount,maxRating,text,reason,feedback)
const getfunction=()=>{

axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/lenderWithdrawFundsInfo',

  {
    headers:{
      accessToken:access
    }
  }
  )
  .then(function (response) {
            setTimeout(function(){
             setLoading(false);
             //console.log(response.data);

           },3000);
           })
   .catch(function (error) {
     console.log(error);

     Alert.alert(
"Warring",
error.response.data.errorMessage,
[
 { text: "OK", onPress: () => setLoading(false) }
]
);
 });
}

useEffect(()=>{
getfunction();
 },[])

function setfunction(){
  if(status!="")
  {
    Alert.alert(
      "Success",
      "You have already raised the INR",
      [
        {
          text: "ADD",
          onPress:()=>addfunction(),

        },
        { text: "UPDATE", onPress:()=>updatefunction()}
      ]
    );
  }else{
    submitfunction();
  }
}

const submitfunction=props=>{
  //console.log(id,primarytype,withdrawamount,text,reason,feedback)

  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/savewithdrawalfundsinfo',{
  userId:id,
  userType:primarytype,
  amount:withdrawamount,
  amountRequiredDate:text,
  withdrawalReason:reason,
  rating:"5",
  feedBack:feedback,
  adminComment:"",
  status:"INITIATED",

  },{
    headers:{
      accessToken:access
    }
  }
  )
  .then(function (response) {
            setTimeout(function(){
             setLoading(false);
             //console.log(response.data);
             Alert.alert(
              "Success",
              "Your Withdrawal Request has been saved Succesfully"
             );
           },3000);
           })
   .catch(function (error) {
     console.log(error);

     Alert.alert(
"Warring",
error.response.data.errorMessage,
[
 { text: "OK", onPress: () => setLoading(false) }
]
);
 });
}



const addfunction=props=>{
  //console.log(id,primarytype,withdrawamount,text,reason,feedback)

  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/savewithdrawalfundsinfo',{
  userId:id,
  userType:primarytype,
  amount:withdrawamount,
  amountRequiredDate:text,
  withdrawalReason:reason,
  rating:"5",
  feedBack:feedback,
  adminComment:"",
  status:"INITIATED",
  type:"ADD"
  },{
    headers:{
      accessToken:access
    }
  }
  )
  .then(function (response) {
            setTimeout(function(){
             setLoading(false);
             //console.log(response.data);
             Alert.alert(
              "Success",
              "Your Withdrawal Request has been saved Succesfully Sucessfully.Total Withdrawal Request is"+response.data.amount
             );

           },3000);
           })
   .catch(function (error) {
     console.log(error);

     Alert.alert(
"Warring",
error.response.data.errorMessage,
[
 { text: "OK", onPress: () => setLoading(false) }
]
);
 });
}



const updatefunction=props=>{
  console.log(id,primarytype,withdrawamount,text,reason,feedback)

  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/savewithdrawalfundsinfo',{
  userId:id,
  userType:primarytype,
  amount:withdrawamount,
  amountRequiredDate:text,
  withdrawalReason:reason,
  rating:"5",
  feedBack:feedback,
  adminComment:"",
  status:"INITIATED",
  type:"UPDATE"
  },{
    headers:{
      accessToken:access
    }
  }
  )
  .then(function (response) {
            setTimeout(function(){
             setLoading(false);
             //console.log(response.data);
             alert("Your Withdrawal Request has been saved Succesfully.Total Withdrawal Request is"+withdrawamount);

           },3000);
           })
   .catch(function (error) {
     console.log(error);

     Alert.alert(
"Warring",
error.response.data.errorMessage,
[
 { text: "OK", onPress: () => setLoading(false) }
]
);
 });
}

    return (
        <View style={styles.container}>

            <View style={styles.cont1}>
                    <View style={styles.inputbox}>
                        <Text style={{fontSize:18,fontWeight:"bold"}}>Withdraw Amount: </Text>
                        <TextInput  placeholder="Withdraw Amount"onChangeText={(numeric)=>setwithdrawamount(numeric)} keyboardType="number-pad" />
                    </View>
                    {/* <View style={styles.inputbox1}>
                        <Text style={{fontSize:18,fontWeight:"bold"}}>Withdraw Date: </Text>
                        <TextInput  placeholder="Withdraw date"onChangeText={(numeric)=>setwithdrawdate(numeric)} keyboardType="number-pad" />
                    </View> */}

            <View style={styles.inputbox1}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Withdraw Date</Text>
                  {show&&(
                <DatePicker
                  testID='DatePicker'
                  value={date}
                  mode={mode}
                  display='default'
                  is24Hour={true}
                 onChange={onChange}
                />)}
                <TouchableOpacity onPress={()=>showMode('date')}>
                    <Text style={{fontSize:18}}>{text}</Text>
                </TouchableOpacity>
            </View>

                    <View style={styles.inputbox1}>
                        <Text style={{fontSize:18,fontWeight:"bold"}}>Reason: </Text>
                        <TextInput  placeholder="Reason" onChangeText={(text)=>setreason(text)} />
                    </View>
                          <View>
                        <Text style={{fontSize:18,fontWeight:"bold",marginLeft:20,marginTop:10}}>Rating: </Text>
                        <CustomRatingBar />
                        </View>
                     <View style={styles.inputbox1}>
                        <Text style={{fontSize:18,fontWeight:"bold"}}>Feedback: </Text>
                        <TextInput  placeholder="Feedback"onChangeText={(text)=>setfeedback(text)} />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={submitfunction}>
                            <Text style={{fontWeight:"bold"}} >   Submit  </Text>
                    </TouchableOpacity>
            </View>

        </View>


    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
         alignSelf:'center',
        },

    header:{
        fontSize:23,
        alignSelf:"center",
        marginTop:90,
        fontWeight:"bold"

    },
    btn:{
        padding:10,
        width:100,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        borderRadius:5,
        backgroundColor:"#4CAF50",
        marginTop:20,
        marginBottom:20
    },

      cont1:{
        justifyContent:"flex-start",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginTop:40,
        width:340,
        marginLeft:5,
        borderRadius:20
    },
    inputbox:{
        position:'relative',
        backgroundColor:'#E8E8E8',
        borderRadius: 16,
        width:300,
        height:'auto',
        alignItems: 'flex-start',
        paddingLeft:20,
        paddingVertical:5,
        marginBottom:5,
        marginTop:20,
        marginLeft:15
    },
    inputbox1:{
        position:'relative',
        backgroundColor:'#E8E8E8',
        borderRadius: 16,
        width:300,
        height:'auto',
        alignItems: 'flex-start',
        paddingLeft:20,
        paddingVertical:5,
        marginBottom:5,
        marginTop:10,
        marginLeft:15
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
      },
      buttonStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#8ad24e',
      },
      buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
      },
      customRatingBarStyle: {
        justifyContent: 'flex-start',
        marginLeft:20,
        marginTop:10,
        flexDirection: 'row',
        marginBottom:10
      },
      starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
      },

});

export default Withdrawalfromwallet;
