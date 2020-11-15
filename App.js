import React from 'react';
import { createAppContainer} from 'react-navigation'
import { createStackNavigator,HeaderBackButton } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import InitiateRWScreen from './src/screens/InitiateRWScreen'
import InitiateRTScreen from './src/screens/InitiateRTScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalcScreen from './src/screens/CalcScreen';
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    InitiateRW: { screen: InitiateRWScreen,  navigationOptions: ({navigation}) => ({ 
      title: 'Initiate RW',
      })
    },
    InitiateRT: { screen: InitiateRTScreen, 
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.name,
        headerLeft: ()=> <HeaderBackButton onPress={() => navigation.state.params.onBack(navigation,navigation.state.params.data.results.RWs)}/>,
      })
    },
    Calc: CalcScreen,
  },
  {
    initialRouteName: 'InitiateRW',
    defaultNavigationOptions:{
      title: 'InitiateRW',
    }
  }
);

export default createAppContainer(navigator);
