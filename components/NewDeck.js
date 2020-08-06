import React from 'react';
import { StyleSheet, Text, View , TextInput ,TouchableOpacity , KeyboardAvoidingView ,Platform} from 'react-native';
import { pink , white } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import {connect} from 'react-redux'
import {addDeck} from '../actions'

class NewDeck extends React.Component {
 state ={
 	value :'mathmatics'
 }
 handleTextChange = (value) => {
    this.setState({value });
  }

  handleSubmit =() => {
  	const {value} = this.state
  	console.log(value)
    this.setState({value : ''})
    this.props.dispatch(addDeck(value))
    saveDeckTitle(value)
    this.props.navigation.navigate('DeckDetail',{item : value})
  }

	render (){

		return(
			<KeyboardAvoidingView behavior={(Platform.OS === 'ios')? "padding" : "margin"} style={styles.container}>
			    <Text style={styles.label}>
			     Deck Title
			    </Text>
			    <View style={{flexDirection : 'row' }}>
                <TextInput
	              style={styles.input}
	              onChangeText={(text) => this.handleTextChange(text)}
	              value={this.state.value}
                />
                </View>
                <TouchableOpacity
                    style={styles.Btn}
                    onPress={this.handleSubmit}
                    disabled = {this.state.value === ''}
                    >
                    <Text style={styles.BtnText}>Create Deck</Text>
                </TouchableOpacity>
            
			</KeyboardAvoidingView>
			)
	}
}

export default  connect()(NewDeck)
const styles = StyleSheet.create ({
  container : {
		flex : 1 ,
		alignItems : 'center' , 
		justifyContent : 'center' , 
		margin : 10 ,
	},
  BtnText : {
     color: white,
    fontSize: 20,
    textAlign: "center",
     height : (Platform.OS === 'ios') ? 25 : null
  },
  Btn :{
  	backgroundColor: pink,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 25 ,
    padding :35
  },
  input : {
  	 flex :1,
     marginTop : 25,   
  	 borderColor: 'gray',
  	 borderWidth: 1 ,
  	 borderRadius : 10 , 
  	 padding : 25 ,
  	 fontSize : 20
  }, 
  label : {
  	fontSize : 30 ,
  	color : pink , 
  	alignSelf : 'flex-start'
  }
})