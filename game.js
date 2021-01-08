const suites = ["red", "yellow", "black"]
const maxCardNumber = 10
class card{
    constructor(colour, number) { //creates a new card
        this.suite = colour
        this.number = number
    }

    get suiteNumberID() { //returns a number of the card for maths purposes
        return suites.indexOf(this.suite)
    }

    beats(card = new card("red", 1)) { //checks if one card beats another
        if(this.suite === card.suite) {//if the colours are the same, check the numbers else
            return (this.number > card.number)
        } else {//else checks the colours (checks if the other suite is one less than its own suite)
            return ((this.suiteNumberID - 1) % 3 === card.suiteNumberID)
        }
    }
}

class player{ //class for player
    constructor() { //creates a deck
        this.deck = []
        this.wins = 0
    }
    resetScore() {
        this.deck = []
    }

    get score() { //gives him a player
        return this.deck.length
    }
}


/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) { //StackOverflow user: ashleedawg at https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let i = array.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function createDeck() {
    let deck = []
    for(let i = 0; i < suites.length; i++) { //add cards to deck
        for(let j = 0; j < maxCardNumber; j++) {
            deck.push(new card(suites[i],j + 1))
        }
    }
    shuffleArray(deck) //shuffles the deck
    shuffleArray(deck)
    return deck
}

function newGame() {
    deck = createDeck() //creates a deck
    players[0].resetScore() //resets the score
    players[1].resetScore()
}

let deck //deck array


let players = [new player, new player] //adds the players for scores

function game() {
    newGame() //creates a deck
    for (let i = 0; i < (suites.length * maxCardNumber); i += 2) { //checks who wins and adds the cards to their deck
        if (deck[i].beats(deck[i + 1])) {
            players[0].deck.push(deck[i], deck[i + 1])
        } else {
            players[1].deck.push(deck[i], deck[i + 1])
        }
    }

    if (players[0].score > players[1].score) {//outputs the winner and their deck
        console.log("Players 1 Wins with:")
        console.log(players[0].deck)
        players[0].wins++
    } else {
        console.log("Players 2 Wins with:")
        console.log(players[1].deck)
        players[1].wins++
    }
}

for (let i = 1; i < 1000; ++i) {
    game()
}

console.log(players[1].wins)
console.log(players[0].wins)