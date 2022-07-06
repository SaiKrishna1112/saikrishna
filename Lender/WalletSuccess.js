import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Asset } from 'expo-asset';

const WalletSuccess = ({navigation}) =>{
  return (
        <View style={styles.container}>
            <View style={styles.logo}>
              <Image source={require('../assets/verifiedImage.png')} style={styles.img} />
            </View>
            <View>
            <Text style={styles.text}> You have Successfully Load Your Wallet <Text style={{alignSelf:'center',justifyContent:'center'}}>{username}</Text></Text></View>
            <View style={styles.bottom}>
            <TouchableOpacity style={styles.appButtonContainer}
            onPress={()=>{
                navigation.push('Home'); }}>
          <Text style={styles.appButtonText}>Back</Text>
      </TouchableOpacity>
            </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent:"center"
},
img:{
height:100,
width:100
},
logo: {
   top:100,
   justifyContent: 'center',
   alignItems: 'center',
},
bottom: {
   justifyContent: 'center',
   alignItems: 'center',
   bottom:40,
   color: '#dcdcdc',
   fontSize:30,
},
appButtonContainer: {
     marginTop:30,
     backgroundColor: "#569F40",
     borderRadius: 17,
     paddingVertical: 10,
     paddingHorizontal: 12,
     width:330,
     marginLeft:12
   },
   appButtonText: {
     fontSize: 19,
     color: "#fff",
     fontWeight: "bold",
     alignSelf: "center",
   },
   text:{
    marginTop:150,
    alignSelf:'center',
    width:300,
    height:70,
    fontSize:18,
    justifyContent:'center'
   },
});
export default WalletSuccess;
