import React from 'react';
import { StyleSheet, Text, View ,  TouchableOpacity} from 'react-native';
import Quiz from './Quiz'
import AddCard from './AddCard'
import {pink , white , gray} from '../utils/colors'
import {deleteDeck} from '../actions'
import {DeleteDeck} from '../utils/api'
import {connect} from 'react-redux'

 class DeckDetail extends React.Component {

	delete =() => {
	  const {item} = this.props.navigation.state.params
      this.props.dispatch(deleteDeck(item))
      DeleteDeck(item)
      this.props.navigation.goBack()
	}
	render (){
		 const {item} = this.props.navigation.state.params
		 const {decks} = this.props
		return (
                <View style={styles.container}> 
                 <Text style={styles.header}>
                   {item}
                 </Text>
                 <Text style={{fontSize : 20 , color : gray}}>
                   {decks[item].questions.length}  cards
                 </Text>
                 <TouchableOpacity 
                  style={styles.addCardBtn}
                 onPress={() => this.props.navigation.navigate('AddCard',{item : item})}> 
	      	         <Text style={styles.BtnText}>Add Card</Text>
	             </TouchableOpacity>
	             <TouchableOpacity 
                   style={styles.quizBtn}
	             onPress={() => this.props.navigation.navigate('Quiz',{item : item})}> 
	      	         <Text style={styles.BtnText}>Start Quiz</Text>
	             </TouchableOpacity>
	             <TouchableOpacity onPress={this.delete}>
                    <Text style = {styles.deleteBtn}>Delete Deck</Text>
	             </TouchableOpacity>
                </View>
			)
	}
}
function mapStateToProps(decks) {
  return {decks}
}
export default connect(mapStateToProps)(DeckDetail)

const styles = StyleSheet.create({
	container : {
		flex : 1 ,
		alignItems : 'center' , 
		justifyContent : 'center' , 
		margin : 10 ,
	},
    header :{
    	width : 350 ,
    	fontSize : 50 ,
    	padding : 5 ,
    	marginBottom : 10 ,
    	textAlign : 'center'
    },
    BtnText : {
     color: white,
    fontSize: 30,
    textAlign: "center"
  },
  addCardBtn :{
  	backgroundColor: pink,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 35 ,
    padding :50
  },
  quizBtn :{
  	backgroundColor: gray,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 25 ,
    padding :48
  },
      deleteBtn : {
    	textAlign :"center",
		color : pink ,
		fontSize: 20 ,
		marginTop : 20
    }
})