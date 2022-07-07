<<<<<<< Updated upstream
import React,{useState,useEffect,useLayoutEffect} from 'react'
import { View,Text,TextInput,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList,Button,Alert,ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
=======
import React,{useState,useEffect} from 'react'
import { View,Text,TextInput,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
>>>>>>> Stashed changes
import { SliderBox } from "react-native-image-slider-box";
import { Neomorph } from 'react-native-neomorph-shadows';
import PaginationDot from 'react-native-animated-pagination-dot'
import  '@react-native-community/art'
import {useSelector} from 'react-redux';
import axios from 'axios'
import * as FileSystem from 'expo-file-system';


const Home = ({navigation}) => {

const [imageshow,setimageshow] = useState();

 const errormsg = msg => {
   ToastAndroid.showWithGravity(msg,
     ToastAndroid.SHORT,
     ToastAndroid.CENTER
   );
 };

      const images=[
         "https://source.unsplash.com/1024x768/?nature",
         "https://source.unsplash.com/1024x768/?water",
         "https://source.unsplash.com/1024x768/?girl",
         "https://source.unsplash.com/1024x768/?tree",
         require('../assets/Avatar.jpg'),
       ]
       const userDetails = useSelector(state=>state.counter);
        var access = userDetails.headers.accesstoken;
        var id = userDetails.data.id;
        const userDetail = useSelector(state=>state.logged);

        const [loading,setLoading]= useState(false)
         const [curPage] = React.useState(0);
         const [Amount,setAmount]=useState()

         const [Count,setCount]=useState()
         const [Deals,setDeals]=useState()

         const [Closed,setclosed]=useState()
         const [ClosedAmt,setclosedAmt]=useState()

         const [Disbursed,setDisbursed]=useState()
         const [DisbursedAmt,setDisbursedAmt]=useState()
         const [Greeting,setGreeting]=useState("Good Morning")

         const[wallet,setwallet]=useState([]);
         const[earnings,setearnings]=useState([]);
         const[referral,setreferral]=useState([]);
         const[interestearnings,setinterestearnings]=useState([]);
         const[principal,setprincipal]=useState([]);

         const [Dates,setDate]=useState()
         var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
         var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';
         function greeting(){
         const day = new Date();
              const hr = day.getHours();
              if (hr >= 0 && hr < 12) {
                  setGreeting("Good Morning!");
              } else if (hr == 12) {
                  setGreeting("Good Noon!");
              } else if (hr >= 12 && hr <= 17) {
                  setGreeting("Good Afternoon!");
              } else {
                  setGreeting("Good Evening!");
              }
       }

       const getprofieshowss=()=>{
       setLoading(true)
       axios({
          method:'get',
          url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/PROFILEPIC',
          headers:{
                accessToken:access,
               }
         })
          .then(function (response) {
           //console.log(response.data);
            var imageshow=response.data.downloadUrl;
            setTimeout(function(){
                    setLoading(false);
                   },2000)
                })
          .catch(function (error) {
           console.log('error',error);
           console.log(error.response.data.errorMessage);
         });

       }

       useLayoutEffect(()=>{
       navigation.setOptions({
        headerLeft:()=>(
        <Image source={{uri:imageshow }} style={styles.image}/>
        ),
       });
       },[]);

       useEffect(()=>{
        getprofieshowss();
       },[])

         const Getfunction=()=>{
       axios({
           method:'get',
           url:local+'/'+id+'/dealsStatistics',
           headers:{
             accessToken: access,
           }
         })

         .then(function (response) {

           setAmount(response.data.totalWalletDebitedAmount)

           setCount(response.data.numberOfActiveDealsCount)
           setDeals(response.data.activeDealsAmount)

           setclosed(response.data.numberOfClosedDealsCount)
           setclosedAmt(response.data.closedDealsAmount)

           setDisbursed(response.data.numberOfDisbursedDealsCount)
           setDisbursedAmt(response.data.disbursedDealsAmount)

           setDate(response.data.validityDate)
         })
         .catch(function(error){
           console.log('error',error)
         });
        }
       useEffect(()=>{
        Getfunction();
        greeting();
        earningsfunction();
        referralearningsfunction();
        interestearningsfunction();
        principalfunction();
       },[])

//---------------------------------------------------------------------
//Download Investment/Wallets
  // function downloadwallet(){
  //   axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/excelsForNewLenderDashboard',
  //   {
  //     userId:id,
  //     requestType:"WALLETCREDITED"
  //   },{
  //     headers:{
  //       accessToken:access
  //     }
  //   })
  //   .then(function (response) {
  //     setLoading(true);
  //   //console.log(response.data.excelDownloadUrl);
  //         FileSystem.downloadAsync(
  //         response.data.excelDownloadUrl,
  //           ExternalStorageDirectoryPath
  //         )
  //           .then(({ uri }) => {
  //             console.log('Finished downloading to ', uri);
  //           })
  //           .catch(error => {
  //             console.error(error);
  //           });
  //     setTimeout(function(){

  //      setLoading(false)
  //             })
  //            })
  //   .catch(function (error) {
  //    console.log('error',error);

  //    });

  //   }

function walletfunction(){
  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/newLenderDashboard',{
    userId:id,
    requestType:"WALLETCREDITED",
    pageSize:3,
    pageNo:count1,
    searchType:"DESC"
  },{
    headers:{
    accessToken:access
    }
  })
  .then(function (response) {
     setwallet(response.data.lenderWalletHistoryResponseDto);

    setTimeout(function(){

     setLoading(false)
            })
           })
  .catch(function (error) {
   console.log('error',error);
   });

  }
  const [count1,setCount1]=useState(1);
  const [count2,setCount2]=useState(1);
  const [count3,setCount3]=useState(1);
  const [count4,setCount4]=useState(1);
  const [count5,setCount5]=useState(1);
      function add1(){
         setCount1(count1+1);
       walletfunction()

      }
              function sub1(){
               if(count1==0){
                 errormsg("No Data Found")
                 setCount1(count1+2)
              }else{
              setCount1(count1-1);
               walletfunction()

              }
              }
       function add2(){
          setCount2(count2+1);
        referralearningsfunction()

       }
              function sub2(){
               if(count2==0){
                 errormsg("No Data Found")
                 setCount2(count2+2)
              }else{
              setCount2(count2-1);
               referralearningsfunction()

              }
              }
       function add3(){
          setCount3(count3+1);
        interestearningsfunction()

       }
              function sub3(){
               if(count3==0){
                 errormsg("No Data Found")
                 setCount3(count3+2)
              }else{
              setCount3(count3-1);
               interestearningsfunction()

              }
              }
       function add4(){
          setCount4(count4+1);
        principalfunction()

       }
             function sub4(){
              if(count4==0){
                errormsg("No Data Found")
                setCount4(count4+2)
             }else{
             setCount4(count4-1);
              principalfunction()

             }
             }
        function add5(){
           setCount5(count5+1);
         earningsfunction()

        }
             function sub5(){
              if(count5==0){
                errormsg("No Data Found")
                setCount5(count5+2)
             }else{
             setCount5(count5-1);
              earningsfunction()
             }
             }

  function earningsfunction(){
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/newLenderDashboard',{
      userId:id,
      requestType:"LENDERPATICIPATION",
      pageSize:2,
      pageNo:count5,
      searchType:"DESC"
    },{
      headers:{
      accessToken:access
      }
    })
    .then(function (response) {
      setearnings(response.data.lenderTotalPaticipationDealsInfo);
      setTimeout(function(){
       setLoading(false)
              })
             })
    .catch(function (error) {
     console.log('error',error);

     });

    }


    function referralearningsfunction(){
      axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/newLenderDashboard',{
        userId:id,
        requestType:"REFERRALBONUS",
        pageSize:2,
        pageNo:count2,
        searchType:"DESC"
      },{
        headers:{
        accessToken:access
        }
      })
      .then(function (response) {
        setearnings(response.data.referrerResponseDto);
        setTimeout(function(){

         setLoading(false)
                })
               })
      .catch(function (error) {
       console.log('error',error);

       });

      }


      function interestearningsfunction(){
        axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/newLenderDashboard',{
          userId:id,
          requestType:"LENDERINTEREST",
          pageSize:2,
          pageNo:count3,
          searchType:"DESC"
        },{
          headers:{
          accessToken:access
          }
        })
        .then(function (response) {
          setinterestearnings(response.data.lenderReturnsResponseDto);
          setTimeout(function(){
           setLoading(false)
                  })
                 })
        .catch(function (error) {
         console.log('error',error);

         });

        }


        function principalfunction(){
          axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/newLenderDashboard',{
            userId:id,
            requestType:"LENDERPRICIPAL",
            pageSize:2,
            pageNo:count4,
            searchType:"DESC"
          },{
            headers:{
            accessToken:access
            }
          })
          .then(function (response) {
            setprincipal(response.data.lenderReturnsResponseDto);
            setTimeout(function(){

             setLoading(false)
                    })
                   })
          .catch(function (error) {
           console.log('error',error);

           });

          }


  const renderList = ({ item }) => {


    return (


        <View style={{borderColor:'grey',borderWidth:1.8,marginHorizontal:15,height:"auto",padding:8,borderTopWidth:8,borderTopColor:'#2B547E',borderBottomWidth:0.5}}>

        <View style={styles.flatmain}>
            <View style={styles.TxtView1}><Text style={styles.Txt1}>Date</Text></View>
            <View><Text style={styles.Txt2}>{item.walletLoaded}</Text></View>
        </View>
        <View style={styles.flatmain}>
            <View style={styles.TxtView1}><Text style={styles.Txt1}>Description</Text></View>
            <View><Text style={styles.Txt2}>{item.remarks}</Text></View>
        </View>
        <View style={styles.flatmain}>
            <View style={styles.TxtView1}><Text style={styles.Txt1}>Amount</Text></View>
            <View><Text style={styles.Txt2}>{item.amount}</Text></View>
        </View>

        </View>
       
        )}
  const renderList1 = ({ item }) => {


          return (

              <View style={{borderColor:'grey',borderWidth:1.8,marginHorizontal:15,height:"auto",padding:8,borderTopWidth:8,borderTopColor:'green',borderBottomWidth:0.5}}>

              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>S.No</Text></View>
                  <View><Text style={styles.Txt2}>{item.sno}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>Deal Name</Text></View>
                  <View><Text style={styles.Txt2}>{item.dealName}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>ROI</Text></View>
                  <View><Text style={styles.Txt2}>{item.rateofinterest}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>Tenure</Text></View>
                  <View><Text style={styles.Txt2}>{item.tenure}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>Date</Text></View>
                  <View><Text style={styles.Txt2}>{item.participatedDate}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>Closed Date</Text></View>
                  <View><Text style={styles.Txt2}>{item.pricipaleReturnedStatus}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>Amount</Text></View>
                  <View><Text style={styles.Txt2}>{item.participatedAmount}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt3}>Loan Status</Text></View>
                  <View><Text style={styles.Txt2}>{item.pricipaleReturnedStatus}</Text></View>
              </View>

              </View>
              )}


      const renderList2 = ({ item }) => {


        return (

            <View style={{borderColor:'grey',borderWidth:1.8,marginHorizontal:15,height:"auto",padding:8,borderTopWidth:8,borderTopColor:'#872657',borderBottomWidth:0.5}}>

            <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt6}>Date</Text></View>
                <View><Text style={styles.Txt2}>{item.participatedDate}</Text></View>
            </View>
            <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt6}>Lender</Text></View>
                <View><Text style={styles.Txt2}>{item.dealName}</Text></View>
            </View>
            <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt6}>Deal</Text></View>
                <View><Text style={styles.Txt2}>{item.dealName}</Text></View>
            </View>
            <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt6}>Participated</Text></View>
                <View><Text style={styles.Txt2}>{item.participatedAmount}</Text></View>
            </View>
            <View style={styles.flatmain}>
                <View style={styles.TxtView1}><Text style={styles.Txt6}>Status</Text></View>
                <View><Text style={styles.Txt2}>{item.paymentStatus}</Text></View>
            </View>

            </View>
            )}

      const renderList3 = ({ item }) => {

              return (

                  <View style={{borderColor:'grey',borderWidth:1.8,marginHorizontal:15,height:"auto",padding:8,borderTopWidth:8,borderTopColor:'#FFA500',borderBottomWidth:0.5}}>

                  <View style={styles.flatmain}>
                      <View style={styles.TxtView1}><Text style={styles.Txt4}>Date</Text></View>
                      <View><Text style={styles.Txt2}>{item.returedDate}</Text></View>
                  </View>
                  <View style={styles.flatmain}>
                      <View style={styles.TxtView1}><Text style={styles.Txt4}>Deal Name</Text></View>
                      <View><Text style={styles.Txt2}>{item.remarks}</Text></View>
                  </View>
                  <View style={styles.flatmain}>
                      <View style={styles.TxtView1}><Text style={styles.Txt4}>Profit</Text></View>
                      <View><Text style={styles.Txt2}>{item.amount}</Text></View>
                  </View>

                  </View>
                  )}


        const renderList4 = ({ item }) => {

          return (

              <View style={{borderColor:'grey',borderWidth:1.8,marginHorizontal:15,height:"auto",padding:8,borderTopWidth:8,borderTopColor:'#F75D59',borderBottomWidth:0.5}}>

              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt5}>Date</Text></View>
                  <View><Text style={styles.Txt2}>{item.returedDate}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt5}>Deal Name</Text></View>
                  <View><Text style={styles.Txt2}>{item.dealName}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt5}>Amount Lent</Text></View>
                  <View><Text style={styles.Txt2}>{item.amount}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt5}>Returned Amount</Text></View>
                  <View><Text style={styles.Txt2}>{item.remarks}</Text></View>
              </View>
              <View style={styles.flatmain}>
                  <View style={styles.TxtView1}><Text style={styles.Txt5}>Deal Bal</Text></View>
                  <View><Text style={styles.Txt2}>{item.amount}</Text></View>
              </View>

              </View>
              )}


 return(
<<<<<<< Updated upstream
  <ScrollView>
  <View style={{marginTop:5}}>
    <View>
     <ScrollView horizontal>
=======

 
    <ScrollView>
  <View style={{marginTop:5}}>
 
    <ScrollView horizontal>
>>>>>>> Stashed changes
   <View style={styles.box1}>
     <Text style={styles.txt1}>{Amount}</Text>
     <View style={{backgroundColor:'#008B8B',width:165,marginHorizontal:20,paddingVertical:10,bottom:-8,alignItems:'center'}}>
       <Text style={{color:'white'}}>Earnings</Text>
     </View>
   </View>
   <View style={styles.box2}>
     <Text style={styles.txt1}>{Deals}</Text>
     <Text style={{color:'white'}}></Text>
     <View style={{backgroundColor:'#34A56F',width:165,marginHorizontal:20,paddingVertical:10,top:0,alignItems:'center'}}>
       <Text style={{color:'white'}}>Active Deals: {Count}</Text>
     </View>
   </View>

<<<<<<< Updated upstream
=======

  
>>>>>>> Stashed changes
   <View style={styles.box3}>
     <Text style={styles.txt1}>{ClosedAmt}</Text>
     <Text style={{color:'white'}}></Text>
     <View style={{backgroundColor:'#9F000F',width:165,marginHorizontal:20,paddingVertical:10,top:0,alignItems:'center'}}>
          <Text style={{color:'white'}}>No.of closed Deals: {Closed}</Text>
     </View>
   </View>
   <View style={styles.box4}>
     <Text style={styles.txt2}>INR: {DisbursedAmt}</Text>
     <Text style={{color:'white'}}></Text>
     <View style={{backgroundColor:'#E66C2C',width:165,marginHorizontal:20,paddingVertical:10,top:0,alignItems:'center'}}>
     <Text style={{color:'white'}}>No.of Disbursed Deals: {Disbursed}</Text>
     </View>
   </View>
   </ScrollView>
<<<<<<< Updated upstream
</View>
                <View style={{alignSelf:'center',marginBottom:15}} >
                 <Text style={{fontWeight:'bold'}}>MemberShip Validity Date:  {Dates}</Text>
               </View>
=======

   <View style={{alignSelf:'center',marginBottom:15}} >
    <Text style={{fontWeight:'bold'}}>MemberShip Validity Date:  {Dates}</Text>
  </View>

       


  <View style={styles.container2}>
        <View style={{margin:15}}>
          <Text style={{fontWeight:"500",fontSize:17,color:'#2B547E'}}>Investment\Wallets</Text>
        </View>
          <FlatList
          data={wallet}
          renderItem={renderList}
          keyExtractor={item=>item.sno}
          />
           <PaginationDot
            activeDotColor={'black'}
            curPage={curPage}
            maxPage={2}
        />
      </View>
>>>>>>> Stashed changes

     

<<<<<<< Updated upstream
                     <View style={styles.container2}>
                <View style={{margin:15}}>
                  <Text style={{fontWeight:"500",fontSize:17,color:'#2B547E'}}>Investment\Wallets</Text>
                </View>
                <TouchableOpacity onPress={downloadwallet}><Text>Download</Text></TouchableOpacity>
                  <FlatList
                  data={wallet}
                  renderItem={renderList}
                  keyExtractor={item=>item.sno}
                  />
                  <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub1}><Text style={{color:'white'}}>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn1}><TouchableOpacity onPress={add1}><Text>Next</Text></TouchableOpacity></View>
                  </View>
              </View>

                <View style={styles.container2}>
              <View style={{margin:15}}>
                  <Text style={{fontWeight:"500",fontSize:17,color:'#872657'}}>Referral Earnings</Text>
                </View>
                  <FlatList
                  data={referral}
                  renderItem={renderList2}
                  keyExtractor={item=>item.sno}
                  />
                  <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub2}><Text style={{color:'white'}}>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn1}><TouchableOpacity onPress={add2}><Text>Next</Text></TouchableOpacity></View>
                  </View>
                </View>

                <View style={styles.container2}>
              <View style={{margin:15}}>
                  <Text style={{fontWeight:"500",fontSize:17,color:'#FFA500'}}>Interest Earnings</Text>
                </View>
                  <FlatList
                  data={interestearnings}
                  renderItem={renderList3}
                  keyExtractor={item=>item.sno}
                  />
                  <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub3}><Text style={{color:'white'}}>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn1}><TouchableOpacity onPress={add3}><Text>Next</Text></TouchableOpacity></View>
                  </View>
                </View>


                <View style={styles.container2}>
              <View style={{margin:15}}>
                  <Text style={{fontWeight:"500",fontSize:17,color:'#F75D59'}}>Principal Returned</Text>
                </View>
                  <FlatList
                  data={principal}
                  renderItem={renderList4}
                  keyExtractor={item=>item.sno}
                  />
                  <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub4}><Text style={{color:'white'}}>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn1}><TouchableOpacity onPress={add4}><Text>Next</Text></TouchableOpacity></View>
                  </View>
                </View>

                <View style={styles.container2}>
              <View style={{margin:15}}>
                  <Text style={{fontWeight:"500",fontSize:17,color:'green'}}>Deals vs Earnings</Text>
                </View>
                  <FlatList
                  data={earnings}
                  renderItem={renderList1}
                  keyExtractor={item=>item.sno}
                  />
                  <View style={{flexDirection:'row',justifyContent:'space-between',margin:8}}>
                  <View style={styles.btn}><TouchableOpacity onPress={sub5}><Text style={{color:'white'}}>Prev</Text></TouchableOpacity></View>

                  <View style={styles.btn1}><TouchableOpacity onPress={add5}><Text>Next</Text></TouchableOpacity></View>
                  </View>
                </View>

   </View>
   </ScrollView>
=======
        <View style={styles.container2}>
      <View style={{margin:15}}>
          <Text style={{fontWeight:"500",fontSize:17,color:'#872657'}}>Referral Earnings</Text>
        </View>
          <FlatList
          data={referral}
          renderItem={renderList2}
          keyExtractor={item=>item.sno}
          />
        </View>

        <View style={styles.container5}>
      <View style={{margin:15}}>
          <Text style={{fontWeight:"500",fontSize:17,color:'#FFA500'}}>Interest Earnings</Text>
        </View>
          <FlatList
          data={interestearnings}
          renderItem={renderList3}
          keyExtractor={item=>item.sno}
          />
        </View>


        <View style={styles.container6}>
      <View style={{margin:15}}>
          <Text style={{fontWeight:"500",fontSize:17,color:'#F75D59'}}>Principal Returned</Text>
        </View>
          <FlatList
          data={principal}
          renderItem={renderList4}
          keyExtractor={item=>item.sno}
          />
        </View>

        <View style={styles.container3}>
      <View style={{margin:15}}>
          <Text style={{fontWeight:"500",fontSize:17,color:'green'}}>Deals vs Earnings</Text>
        </View>
          <FlatList
          data={earnings}
          renderItem={renderList1}
          keyExtractor={item=>item.sno}
          />
        </View>
        </View>
              </ScrollView>

>>>>>>> Stashed changes
 )
}

export default Home;

const styles=StyleSheet.create({
 image:{
  height:80,width:80,marginLeft:10,marginTop:10
 },
//  view:{
//   flexDirection:'row',height:100,width:320,borderWidth:0.5,marginLeft:40,marginTop:10,borderRadius:20
//  },

 text1:{
  justifyContent:'flex-start',alignItems:'center',width:200,marginLeft:20
 },
 text:{
  marginLeft:10,fontSize:20,fontWeight:'bold'
 },
 txt:{
  marginLeft:8,marginBottom:10,marginTop:10
 },
 images:{
  borderRadius:20,
 },

  box1:{
    backgroundColor:'#40E0D0',
    width:180,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    display:'flex',
    marginLeft:60
  },

  box2:{
    backgroundColor:'#50C878',
    width:180,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },

  box3:{
    backgroundColor:'#F75D59',
    width:180,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },

  box4:{
    backgroundColor:'#FF8C00',
    width:180,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },

  txt1:{
    color:'white',
    fontSize:30,
    margin:2
  },
  txt2:{
    color:'white',
    fontSize:25,
    marginTop:5,
    paddingTop:5,
  },
  container2: {
    backgroundColor: '#fff',
    paddingTop:10,
    width:350,
    marginBottom:15,
    alignContent:'center'
  },
  Txt1:{
    fontWeight:'bold',
    color:'#2B547E',
    fontSize:15
},
Txt3:{
  fontWeight:'bold',
  color:'green',
  fontSize:15
},
Txt4:{
  fontWeight:'bold',
  color:'#FFA500',
  fontSize:15
},
Txt5:{
  fontWeight:'bold',
  color:'#F75D59',
  fontSize:15
},
Txt6:{
  fontWeight:'bold',
  color:'#872657',
  fontSize:15
},
Txt2:{
    fontWeight:'bold',
    color:'black',
    fontSize:15
},
flatmain:{
    flexDirection:"row",
    alignItems:'center',
    borderBottomColor:'grey',
    borderBottomWidth:1,
    paddingVertical:5
  },
  TxtView1:{
    width:150,
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
image:{
 width:10,
 height:10,
 borderRadius:100
}
})
