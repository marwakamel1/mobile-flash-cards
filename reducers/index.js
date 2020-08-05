import {RECIEVE_DECKS,ADD_DECK,ADD_CARD, DELETE_DECK} from '../actions'

function decks (state={},action) {
	switch (action.type) {
		case RECIEVE_DECKS :
		  return {
		  	...state,
		  	...action.decks
		  }
		case ADD_DECK : 
		  return {
		  	...state,
		  	[action.title] : {
		  		title : action.title ,
		  		questions : []
		  	}
		  }
		case ADD_CARD :
		  console.log(action)
		  return {
		  	...state ,
		  	[action.title] :{ ...state[action.title] ,
		  	 questions : state[action.title].questions.concat(action.card)
	           }
		  }
		case DELETE_DECK : 
         const { [action.title]: value, ...withoutDeck } = state;
		return {
           ...withoutDeck
		}
		default :
		  return state
	}
}

export default decks