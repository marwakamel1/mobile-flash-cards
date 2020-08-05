import React from 'react';
import { StyleSheet, Text, View ,  TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import { pink , white , gray} from '../utils/colors'


class Card extends React.Component {
    state= {
    	displayAnswer : false 
    }
    flip =() => {
    	this.setState((prevState) => ({displayAnswer : ! prevState.displayAnswer}))
    }
	submit = (answer) => {
		this.props.nextCard(answer)
	}
	render(){
		const {question} = this.props
		const display = this.state.displayAnswer === false ? question.question : question.answer
		const text = this.state.displayAnswer === false ? "Answer" : "Question"
      return(
             <View style={styles.container}> 
                 
                 <Text style={styles.header}>
                  {display}
                 </Text>
                 <TouchableOpacity onPress={this.flip}>
                    <Text style = {styles.flipBtn}>{text}</Text>
	             </TouchableOpacity>
                 <TouchableOpacity 
                  style={styles.correctBtn}
                 onPress={() => this.submit("right")}> 
	      	         <Text style={styles.BtnText}>Correct</Text>
	             </TouchableOpacity>
	             <TouchableOpacity 
                   style={styles.incorrectBtn}
	             onPress={() => this.submit("wrong") }> 
	      	         <Text style={styles.BtnText}>Incorrect</Text>
	             </TouchableOpacity>
                </View>
      	)
	}
}

export default Card

const styles = StyleSheet.create({
	container : {
		flex : 1 ,
		alignItems : 'center' , 
		justifyContent : 'center' , 
		margin : 10 ,
	},
    header :{
    	fontSize : 50 ,
    	padding : 7 ,
    	marginBottom : 4 ,
    	 textAlign: 'center',
    	 width : 350 
    },
    flipBtn : {
    	textAlign :"center",
		color : pink ,
		fontSize: 20
    },
    BtnText : {
     color: white,
    fontSize: 30,
    textAlign: "center"
  },
  correctBtn :{
  	backgroundColor: pink,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 25 ,
    padding :40
  },
  incorrectBtn :{
  	backgroundColor: gray,
  	height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 25 ,
    padding :30 ,
    paddingTop :40 ,
    paddingBottom :40 ,
  }

})