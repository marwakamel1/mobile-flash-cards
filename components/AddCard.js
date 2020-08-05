import React from 'react';
import { StyleSheet, Text, View ,  TouchableOpacity , TextInput , KeyboardAvoidingView} from 'react-native';
import { pink , white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import {connect} from 'react-redux'
import {addCard} from '../actions'


 class AddCard extends React.Component {
	 state ={
 	question :'' , 
 	answer :''
   }
 handleTextChange = (value , type) => {
    this.setState({[type] : value });
  }

  handleSubmit =() => {
  	const {question,answer} = this.state
  	const title = this.props.navigation.state.params.item
  	console.log(question)
    this.setState({question : '' , answer : ''})
    this.props.dispatch(addCard(title,{question,answer}))
    addCardToDeck(title,{question,answer})
    this.props.navigation.goBack()
  }
	render (){
		 const {question,answer} = this.state
		return (
               	<KeyboardAvoidingView behavior="margin" style={styles.container}>
			    <Text style={styles.label}>
			     Question : 
			    </Text>
			    <View style={{flexDirection : 'row' }}>
                <TextInput
	              style={styles.input}
	              onChangeText={(text) => this.handleTextChange(text,"question")}
	              value={question}
                />
                </View>
                <Text style={styles.label}>
			     Answer : 
			    </Text>
			     <View style={{flexDirection : 'row' }}>
                <TextInput
	              style={styles.input}
	              onChangeText={(text) => this.handleTextChange(text,"answer")}
	              value={answer}
                />
                </View>
                <TouchableOpacity
                    style={styles.Btn}
                    onPress={this.handleSubmit}
                    disabled = {question === '' || answer === ''}>        
                    <Text style={styles.BtnText}>Add Card</Text>
                </TouchableOpacity>
            
			</KeyboardAvoidingView>
			)
	}
}

export default  connect()(AddCard)

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
    textAlign: "center"
  },
  Btn :{
  	backgroundColor: pink,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 25 ,
    padding :30
  },
  input : {
  	 flex :1,
     marginTop : 20,   
  	 borderColor: 'gray',
  	 borderWidth: 1 ,
  	 borderRadius : 10 , 
  	 padding : 20 ,
  	 fontSize : 17
  }, 
  label : {
  	fontSize : 30 ,
  	color : pink , 
  	alignSelf : 'flex-start'
  }
})