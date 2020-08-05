import {AsyncStorage} from 'react-native'

const FLASH_CARDS_KEY = 'FlashCards:decks'

export function saveDeckTitle (key){
	return AsyncStorage.mergeItem(FLASH_CARDS_KEY,JSON.stringify({
		[key] : {
			title : key ,
			questions : []
		} 
	}))
}

export function DeleteDeck (key) {
  return AsyncStorage.getItem(FLASH_CARDS_KEY)
   .then ((results) => {
   	 const data = JSON.parse(results)
   	 data[key] = undefined
   	 delete data[key]
   	 AsyncStorage.setItem(FLASH_CARDS_KEY,JSON.stringify(data))
   })
}


export function getDecks () {
	return AsyncStorage.getItem(FLASH_CARDS_KEY)
	          .then((results) => {
                  return results === null ? decks: JSON.parse(results)})
}

export function getDeck (key) {
	return AsyncStorage.getItem(FLASH_CARDS_KEY)
	           .then ((results) => {
                  const data = JSON.parse(results)
                  return data[key]
	           })
}

export function addCardToDeck (title , question) {
	return AsyncStorage.getItem(FLASH_CARDS_KEY)
	        .then((results) => {
	        	 const data = JSON.parse(results)
	        	 data[title].questions.push(question)
	        	 AsyncStorage.setItem(FLASH_CARDS_KEY,JSON.stringify(data))
	        })
}

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
