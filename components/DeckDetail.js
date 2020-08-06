import React from 'react';
import { StyleSheet, Text, View ,  TouchableOpacity} from 'react-native';
import Quiz from './Quiz'
import AddCard from './AddCard'
import {pink , white , gray} from '../utils/colors'
import {deleteDeck} from '../actions'
import {DeleteDeck} from '../utils/api'
import {connect} from 'react-redux'

 class DeckDetail extends React.Component {
  shouldComponentUpdate (nextProps){
    
    return nextProps.deck !== undefined
  }
	delete =() => {
	  const {deck} = this.props
      this.props.dispatch(deleteDeck(deck.title))
      DeleteDeck(deck.title)
      this.props.navigation.goBack()
	}
	render (){
		 const {deck} = this.props
		return (
                <View style={styles.container}> 
                 <Text style={styles.header}>
                   {deck.title}
                 </Text>
                 <Text style={{fontSize : 20 , color : gray}}>
                   {deck.questions.length}  cards
                 </Text>
                 <TouchableOpacity 
                  style={styles.addCardBtn}
                 onPress={() => this.props.navigation.navigate('AddCard',{item : deck.title})}> 
	      	         <Text style={[styles.BtnText,{color : white}]} >Add Card</Text>
	             </TouchableOpacity>
	             <TouchableOpacity 
                   style={styles.quizBtn}
	             onPress={() => this.props.navigation.navigate('Quiz',{item : deck.title})}> 
	      	         <Text style={styles.BtnText}>Start Quiz</Text>
	             </TouchableOpacity>
	             <TouchableOpacity onPress={this.delete}>
                    <Text style = {styles.deleteBtn}>Delete Deck</Text>
	             </TouchableOpacity>
                </View>
			)
	}
}
function mapStateToProps(decks, {navigation}) {
  return {deck : decks[navigation.state.params.item]}
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
    	textAlign : 'center',
    },
    BtnText : {
    color: white,
    fontSize: 30,
    textAlign: "center",
        height : (Platform.OS === 'ios') ? 35 : null
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