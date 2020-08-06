import React from 'react';
import { StyleSheet, Text, View , StatusBar , Platform} from 'react-native';
import {createStackNavigator ,  HeaderBackButton} from 'react-navigation-stack'
import { NavigationActions } from 'react-navigation'
import { FontAwesome, Ionicons , AntDesign} from '@expo/vector-icons'
import {createAppContainer } from 'react-navigation'
import {  createBottomTabNavigator ,createMaterialTopTabNavigator  } from 'react-navigation-tabs'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { pink , white } from './utils/colors'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import  Constants  from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import reducer from './reducers'
import middleWare from './middleware'
import { setLocalNotification } from './utils/helpers'

const router = {
  Decks : {
    screen : Decks ,
    navigationOptions : {
      tabBarLabel : 'Decks' , 
      tabBarIcon : (({tintColor}) => <Ionicons name='ios-bookmarks'  size={30} color={tintColor}/>)
    }
  },
  NewDeck :{
       screen : NewDeck , 
       navigationOptions : {
        tabBarLabel : 'Add Deck',
        tabBarIcon : (({tintColor})=> <AntDesign name="plussquare" size={28} color={tintColor} />)
       }
  }
}

const options = {
  navigationOptions: {
   headerShown: false
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? pink : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : pink,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNav =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(router, options)
    : createMaterialTopTabNavigator(router, options);

const TopNav = createStackNavigator({
  Home :{
    screen : TabNav,
    navigationOptions :({navigation}) => ({
      headerShown: false
    }),
  },
  DeckDetail : {
    screen : DeckDetail ,
    navigationOptions : ({navigation}) => ({
      title : 'Deck Details' ,
      headerTintColor : white ,
      headerLeft:  () =>  <AntDesign name="arrowleft" size={25} color={white} onPress={ () => navigation.goBack()  }  style={{marginLeft:5,marginTop:3}} /> ,
      headerStyle :{
        backgroundColor : pink ,
        
      }
    })
  },
  AddCard : {
    screen : AddCard ,
    navigationOptions : ({navigation}) => ({
      title : 'Add Card',
      headerTintColor : white ,
      headerLeft: () =>  <AntDesign name="arrowleft" size={25} color={white} onPress={ () => navigation.goBack()  }  style={{marginLeft:5,marginTop:3}} /> ,
      headerStyle :{
        backgroundColor : pink ,        
      }
    })
  },
   Quiz : {
    screen : Quiz ,
    navigationOptions : ({navigation}) => ({
      headerTintColor : white ,
      headerLeft:  () =>  <AntDesign name="arrowleft" size={25} color={white} onPress={ () => navigation.goBack()  }  style={{marginLeft:5,marginTop:3}} /> ,
      headerStyle :{
        backgroundColor : pink ,        
      }
    })
  }
})

const MainNav = createAppContainer(TopNav) 
function CustStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
export default class App extends React.Component {
   
 componentDidMount () {
     setLocalNotification()
    }

 render(){
  return (
  <Provider store={createStore(reducer,middleWare)} >
    <View style={styles.container}>
       <CustStatusBar backgroundColor = {pink} barStyle="light-content" />
       <MainNav/>
    </View>
  </Provider>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
