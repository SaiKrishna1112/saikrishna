import { NavigationContainer } from '@react-navigation/native';
// import 'react-native-gesture-handler';
//import { createDrawerNavigator } from '@react-navigation/drawer';

import LenderProfileDetails from './Lender/LenderProfileDetails'
import Screen from './navigation/Screens'
import { LogBox } from "react-native";
import { createStore } from 'redux';
import allReducers from './src/reducers';
import { Provider } from 'react-redux';


LogBox.ignoreLogs(["EventEmitter.removeListener","ViewPropTypes",'VirtualizedLists','Warning:...']);

const store = createStore(
               allReducers
              );

const App =()=>{
 return(
    <Provider store={store}>
       <NavigationContainer>
           <Screen />
       </NavigationContainer>
    </Provider>
)
}

export default App;
