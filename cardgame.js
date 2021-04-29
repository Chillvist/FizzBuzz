/**
 * A single card object
 */
class Card {
  constructor(rank, suit, color, name) {
    this.rank = rank;
    this.suit = suit;
    this.color = color;
    this.name = name;
  }
}

/**
 * A pack of cards - 52 unique cards, fresh out of the packaging
 */
class PackOfCards {
  deck = this.createDeck();

  createCard(suit, rank) {
    let color = ["Hearts", "Diamonds"].includes(suit) ? "red" : "grey";

    let name = rank;
    if (rank === 11) {
      name = "Jack";
    } else if (rank === 12) {
      name = "Queen";
    } else if (rank === 13) {
      name = "King";
    } else if (rank === 14) {
      name = "Ace";
    }

    return new Card(rank, suit, color, name);
  }
  createDeck() {
    let deck = [];
    for (let index = 2; index <= 14; index++) {
      deck.push(this.createCard("Hearts", index));
      deck.push(this.createCard("Spades", index));
      deck.push(this.createCard("Diamonds", index));
      deck.push(this.createCard("Clubs", index));
    }
    return deck;
  }
}

/**
 * Dealer is in charge of holding the deck, shuffling (randomizing) and passing out cards to the players
 */
class Dealer {
  constructor() {
    this.newDeck();
  }
  newDeck() {
    this.deck = new PackOfCards().deck;
  }
  getCard() {
    return this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
  }
  getHand(size = 5) {
    let hand = [];
    for (let count = 0; count < size; count++) {
      hand.push(this.getCard());
    }
    return hand;
  }
}

/**
 * Something that collects points and tracks a score
 */
class PointCollector {
  numberOfWins = 0;

  addPoint() {
    this.numberOfWins++;
  }
  getPoints() {
    return this.numberOfWins;
  }
}

/**
 * Players hold their hand and decide how they play their game.
 * They also keep score by extending the PointCollector class.
 */
class Player extends PointCollector {
  setHand(hand) {
    this.hand = hand;
  }
  getHighestCard() {
    return this.hand.reduce(
      (card, highest) => (card.rank > highest?.rank ? card : highest),
      this.hand[0]
    );
  }
  getScore() {
    return this.getHighestCard().rank;
  }
}

/**
 * The mechanics of running our card game is done with the Game class
 */
class Game {
  dealer = new Dealer();

  play(iterations = 1) {
    let player1 = new Player();
    let player2 = new Player();
    let ties = new PointCollector(); // just to keep track of ties

    for (let index = 0; index < iterations; index++) {
      // New deck for each round
      this.dealer.newDeck();

      // pass out the cards
      player1.setHand(this.dealer.getHand(5));
      player2.setHand(this.dealer.getHand(5));

      if (player1.getScore() > player2.getScore()) {
        player1.addPoint();
      } else if (player2.getScore() > player1.getScore()) {
        player2.addPoint();
      } else {
        ties.addPoint();
      }
    }

    console.log("Player 1 wins:", player1.getPoints(), "times");
    console.log("Player 2 wins:", player2.getPoints(), "times");
    console.log("Tied:", ties.getPoints(), "times");
  }
}

// To play the game from the command line, uncomment these 2 lines:
// let game = new Game();
// game.play(100);

//
//
// To integrate it somewhere else, you need something like this:
//
//
/**
 *
 * // Get a card dealer:
 * let dealer = new Dealer();
 *
 * // Get some cards:
 * dealer.getCard();
 * // or...
 * dealer.getHand();
 *
 * // If you want to determine a highest card or anything, you have to give the hand to a player:
 * let player = new Player();
 * player.setHand(dealer.getHand())
 * let highestCard = player.getHighestCard();
 *
 */
