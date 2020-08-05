import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, FlatList} from 'react-native';
import DeckDetail from './DeckDetail'
import { pink , white , gray} from '../utils/colors'
import {getDecks} from '../utils/api'
import {recieveDecks} from '../actions'
import {connect} from 'react-redux'


function Deck ({item , decks}) {
	
	return (
        <View style={styles.container}>
          <Text style={{fontSize : 35}}>
            {item}
          </Text>
           <Text style={{fontSize : 20 , color : gray}}>
            {decks[item].questions.length}  cards
          </Text>
        </View>
		)
}
 class Decks extends React.Component {

	componentDidMount () {
		getDecks()
		.then((decks) => 
           { console.log (decks)
			return this.props.dispatch(recieveDecks(decks))
		})
	}
	renderItem = ({item}) => {
      return (
	      <TouchableOpacity 
            style={styles.item}
	      onPress={() => this.props.navigation.navigate('DeckDetail',{item : item})}> 
	      	<Deck  item={item} decks={this.props.decks}/>
	      </TouchableOpacity>
      	)
	}
	render (){
		const {decks} = this.props
		if (decks === null) {return (<View><Text>No decks have found</Text></View>)}
		return(
			<View style={styles.container}>
			<FlatList 
			 data = {Object.keys(decks)}
			 renderItem = {this.renderItem}
			 keyExtractor={(item, index) => index.toString()}
            />
			</View>
			)
	}
}

function mapStateToProps (decks) {
  return {decks : decks ? decks : null}
}
export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
	container : {
		flex : 1 ,
		alignItems : 'center' , 
		justifyContent : 'center' , 
		margin : 10
	},
	item : {
      backgroundColor : white , 
      borderRadius : Platform.OS === "ios" ? 16 :2 ,
      borderBottomColor : pink ,
      borderBottomWidth : 5 ,
      padding : 10 ,
      width : 350 ,
      height : 200 ,
      marginLeft : 5,
      marginRight : 5,
      marginTop : 17 ,
      justifyContent : 'center',
      shadowRadius : 3,
      shadowOpacity : 0.8,
      shadowColor : 'rgba(0,0,0,0.24)',
      shadowOffset : {
      	width :0,
      	height : 3
      } 
	},
})