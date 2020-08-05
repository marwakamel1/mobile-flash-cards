export const RECIEVE_DECKS ='RECIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export function recieveDecks (decks) {
  return {
  	type :RECIEVE_DECKS,
  	decks
  }
}

export function addDeck(title) {
	
	return {
		type :ADD_DECK,
		title
	}
}

export function addCard (title,card) {
   return {
   	type : ADD_CARD , 
   	title,
   	card
   }
}

export function deleteDeck(title) {
  
  return {
    type :DELETE_DECK,
    title
  }
}