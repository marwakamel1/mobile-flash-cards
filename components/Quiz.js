import React from 'react';
import { StyleSheet, Text, View ,  TouchableOpacity , ScrollView } from 'react-native';
import {connect} from 'react-redux'
import { pink , white , gray} from '../utils/colors'
import Card from './Card'
import { setLocalNotification , clearLocalNotification} from '../utils/helpers'

class Quiz extends React.Component {
	state = {
		index : 0,
		result : 0 ,
		remain : this.props.questions.length
	}
	nextCard =(answer)=> {
		this.setState((prevState) => { 
			return{
			remain : prevState.remain -1 ,
			index : prevState.index + 1,
			result : answer === 'right' ? prevState.result + 1 : prevState.result
		}})
		if(this.state.index === this.props.questions.length - 1) {
              clearLocalNotification()
               .then(setLocalNotification)
		}
	}
	reset = () => {
		this.setState({
	      index : 0,
		  result : 0 ,
		  remain : this.props.questions.length
		})
	}
	render (){
		 const {questions} = this.props
		 const {index , result , remain} = this.state
		 if(questions.length === 0) {
		 	return (
		 		<View style={styles.container}>
		 		<Text style={styles.header}>
		 	 	 Sorry , there is no cards in this deck 
		 		</Text>
		 		</View>)
		 }
		    return (
                <View style={styles.container}>
                 <ScrollView>
                 {index  < this.props.questions.length  &&
                 	(<Text  style ={{alignSelf : 'flex-start', fontSize : 20 , color : gray}}>
                  {index + 1}/{this.props.questions.length}
                 </Text>) }
                  { index  < this.props.questions.length ?  
                  	<Card key={index} nextCard={this.nextCard} question={questions[index]}/> : 
                  	(
                  		<View style={styles.container}>
                  	        <Text style={styles.header}>
                  	          Your Score is {result} out of {this.props.questions.length}
                  	        </Text>
                  	        <TouchableOpacity 
						        style={styles.correctBtn}
						        onPress={this.reset}> 
							    <Text style={styles.BtnText}>Restart Quiz</Text>
							</TouchableOpacity>
							<TouchableOpacity 
						        style={styles.incorrectBtn}
							    onPress={() => this.props.navigation.goBack() }> 
							    <Text style={styles.BtnText}>Back to Deck</Text>
							</TouchableOpacity>
                  	    </View>
                  )}    
                  </ScrollView>       
                </View>
			)
	}
}

function mapStateToProps (decks , {navigation}) {
   return {questions : decks[navigation.state.params.item].questions}
}
export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
	container : {
		flex : 1 ,
		alignItems : 'center' , 
		justifyContent : 'center' , 
		margin : 10 ,
	},
	header :{
    	fontSize : 50 ,
    	padding : 10 ,
    	marginBottom : 20 ,
    	 textAlign: 'center' ,
    	 width : 350
    },
	BtnText : {
     color: white,
    fontSize: 30,
    textAlign: "center",
        height : (Platform.OS === 'ios') ? 35 : null
  },
  correctBtn :{
  	backgroundColor: pink,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 15 ,
    padding :50
  },
  incorrectBtn :{
  	backgroundColor: pink,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 25 ,
    padding :40 ,
    paddingTop :50 ,
    paddingBottom :50 ,
  }

})