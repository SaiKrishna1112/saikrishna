import React from 'react'
import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions // optional
} from 'react-native-animated-nav-tab-bar'
import {Image} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack'
import Icons from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome'

import LenderProfileDetails from '../Lender/LenderProfileDetails'
import LenderBankDetails from '../Lender/LenderBankDetails'
import LenderKYCupload from '../Lender/LenderKYCupload'
import LenderHome from '../Lender/LenderHome'
import LenderWallets from '../Lender/LenderWallets'
import OngoingDeals from '../Lender/RunningDeals'

const Tabs = AnimatedTabBarNavigator();
const HomeStack = createStackNavigator();
const WalletStack = createStackNavigator();
const DealsStack = createStackNavigator();

const LenderTabs=()=>(
 <Tabs.Navigator
 tabBarOptions={{
   activeTintColor: "#2F7C6E",
   inactiveTintColor: "#222222"
 }}
 barStyle={{ backgroundColor: '#98c1d9' }}
>
<Tabs.Screen
  name="Home"
  component={HomeStackScreen}
  options={{
   tabBarLabel: 'Dashboard',
    tabBarIcon: ({ focused, color, size }) => (
        <Icons
            name="home"
            size={size ? size : 30}
            color={focused ? color : "#222222"}
            focused={focused}
            color={color}
        />

    )
  }}
/>
<Tabs.Screen
  name="Wallet"
  component={WalletStackScreen}
  options={{
   tabBarLabel: 'Wallet',
    tabBarIcon: ({ focused, color, size }) => (
        <Icons
            name="wallet"
            size={size ? size : 30}
            color={focused ? color : "#222222"}
            focused={focused}
            color={color}
        />

    )
  }}
/>
<Tabs.Screen
  name="Deals"
  component={DealsStackScreen}
  options={{
   tabBarLabel: 'Deals',
    tabBarIcon: ({ focused, color, size }) => (
        <Icon1
            name="gavel"
            size={size ? size : 30}
            color={focused ? color : "#222222"}
            focused={focused}
            color={color}
        />

    )
  }}
/>
 <Tabs.Screen
   name="Profile"
   component={LenderProfileDetails}
   options={{
     tabBarIcon: ({ focused, color, size }) => (
         <Icons
             name="person"
             size={size ? size : 30}
             color={focused ? color : "#222222"}
             focused={focused}
             color={color}
         />

     )
   }}
 />
 </Tabs.Navigator>
);

export default LenderTabs;


const HomeStackScreen = ({navigation})=>(

    <HomeStack.Navigator screenOptions={{
     headerStyle: {
       backgroundColor : '#98c1d9',
     },
   headerTintColor:'#000000',
   headerTitleStyle:{
     fontWeight:'bold'
   }
 }}>
   <HomeStack.Screen name="Dashboard" component={LenderHome} />

 </HomeStack.Navigator>
);

const WalletStackScreen = ({navigation})=>(
    <WalletStack.Navigator screenOptions={{
   headerStyle: {
     backgroundColor : '#98c1d9',
   },
   headerTintColor:'#000000',
   headerTitleStyle:{
     fontWeight:'bold'
   }
 }}>
   <WalletStack.Screen name="Wallet" component={LenderWallets} options={{
     headerLeft:()=>(
     <Icons.Button name="" size={35} backgroundColor="#98c1d9" onPress={()=>navigation.toggleDrawer()}></Icons.Button>
    ),
   }}/>

 </WalletStack.Navigator>
);

const DealsStackScreen = ({navigation})=>(
    <DealsStack.Navigator screenOptions={{
   headerStyle: {
     backgroundColor : '#98c1d9',
   },
   headerTintColor:'#000000',
   headerTitleStyle:{
     fontWeight:'bold'
   }
 }}>
   <DealsStack.Screen name="Running Deals" component={OngoingDeals} options={{
     headerLeft:()=>(
     <Icons.Button name="" size={35} backgroundColor="#98c1d9" onPress={()=>navigation.toggleDrawer()}></Icons.Button>
    ),
   }}/>

 </DealsStack.Navigator>
);
