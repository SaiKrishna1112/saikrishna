import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'


import LenderProfileDetails from '../Lender/LenderProfileDetails'
import LenderEdit from '../Lender/LenderEdit'
import LenderBankDetails from '../Lender/LenderBankDetails'
import LenderKYCupload from '../Lender/LenderKYCupload'
import LenderNominee from '../Lender/LenderNominee'
import Login from '../BeforeLogin/Login'
import LenderTabs from '../Lender/LenderTabs'
import ForgotPassword from '../BeforeLogin/ForgotPassword'
import LoginWithOTP from '../BeforeLogin/LoginWithOTP'
import LenderHome from '../Lender/LenderHome'
import LenderWallets from '../Lender/LenderWallets'
import WalletSuccess from '../Lender/WalletSuccess'
import Withdrawalfromwallet from '../Lender/Withdrawalfromwallet'
import OngoingDeals from '../Lender/RunningDeals'
import ViewLenders from '../Lender/Viewlenders'
import ViewStatement from '../Lender/ViewStatement'
import ParticpatedDeals from '../Lender/ParticpatedDeals'
import SingleDeal from '../Lender/SingleDeal'
import PersonalDeals from '../Lender/PersonalDeals'
import EscrowDeals from '../Lender/EscrowDeals'
import MyClosedDeals from '../Lender/MyClosedDeals'
import EscrowClosedDeals from '../Lender/EscrowClosedDeals'
import PersonalClosedDeals from '../Lender/PersonalClosedDeals'
import Support from '../Lender/Support'
import Tickethistory from '../Lender/Tickethistory'
import ParticipateDetails from '../Lender/ParticipateDetails'




const Screen=()=> {
 const Stack = createStackNavigator();

  return (
        <Stack.Navigator initialRouteName = "Login"
        screenOptions = {{headerTintColor: 'black'}}>
           <Stack.Screen name = "Login" component = { Login } options={{headerShown: false}} />
           <Stack.Screen name = "ForgotPassword" component = { ForgotPassword } options={{headerShown: false}} />
           <Stack.Screen name = "LoginWithOTP" component = { LoginWithOTP } options={{headerShown: false}} />
           <Stack.Screen name = "Profile" component = { LenderProfileDetails } options={{headerShown: false}} />
           <Stack.Screen name = "Edit Profile Detail" component = { LenderEdit } />
           <Stack.Screen name = "Nomine Details" component = { LenderNominee } />
           <Stack.Screen name = "Bank Detail" component = { LenderBankDetails } />
           <Stack.Screen name = "KYC Upload" component = { LenderKYCupload } />
           <Stack.Screen name = "Lender Home" component = { LenderHome }/>
           <Stack.Screen name = "LenderWallets" component = { LenderWallets } />
           <Stack.Screen name = "WalletSuccess" component = { WalletSuccess } options={{headerShown: false}}/>
           <Stack.Screen name = "Wallet Withdrawal" component = { Withdrawalfromwallet } />
           <Stack.Screen name = "Running Deals"  component = { OngoingDeals } />
           <Stack.Screen name = "Deal Info" component = { SingleDeal } />
           <Stack.Screen name = "Participated Deals" component = { ParticpatedDeals } />
           <Stack.Screen name = "Participate Details" component = { ParticipateDetails} />
           <Stack.Screen name = "View Lenders" component = { ViewLenders } />
           <Stack.Screen name = "View Statement" component = { ViewStatement } />
           <Stack.Screen name = "Personal Deals" component = { PersonalDeals } />
           <Stack.Screen name = "Escrow Deals" component = { EscrowDeals } />
           <Stack.Screen name = "Closed Deals" component = { MyClosedDeals } />
           <Stack.Screen name = "Escrow Closed Deals" component = { EscrowClosedDeals } />
           <Stack.Screen name = "Personal Closed Deals" component = { PersonalClosedDeals } />
           <Stack.Screen name = "Write To Us" component = { Support } />
           <Stack.Screen name = "Ticket History" component = { Tickethistory } />

           <Stack.Screen name = "LenderTabs" component = { LenderTabs } options={{headerShown: false}}/>
      </Stack.Navigator>

  );
}

export default Screen;
