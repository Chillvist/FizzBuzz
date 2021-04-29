class VisualCard {
  constructor(card) {
    this.card = card;
  }
  //♥ ♦ ♠ ♣
  x = 150;
  y = 10;
  isDragging = false;
  xOffset = 0;
  yOffset = 0;

  dragging() {
    if (
      mouseX > this.x &&
      mouseX < this.x + 150 &&
      mouseY > this.y &&
      mouseY < this.y + 200
    ) {
      this.isDragging = true;
      this.xOffset = mouseX - this.x;
      this.yOffset = mouseY - this.y;
      return true;
    } else {
      return false;
    }
  }

  drag() {
    if (this.isDragging) {
      this.x = mouseX - this.xOffset;
      this.y = mouseY - this.yOffset;
    }
  }

  getIcon() {
    //  this.card.suit
    if (this.card.suit === "Diamonds") {
      return "♦";
    }
    if (this.card.suit === "Hearts") {
      return "♥";
    }
    if (this.card.suit === "Clubs") {
      return "♣";
    }
    if (this.card.suit === "Spades") {
      return "♠";
    }
  }

  draw() {
    this.drag();
    push();
    {
      translate(this.x, this.y);

      fill("black");
      rect(0, 0, 150, 200, 7);

      fill(this.card.color);
      textSize(100);
      textAlign(CENTER);
      text(this.getIcon(), 75, 130);

      textSize(30);
      textAlign(LEFT);
      text(this.card.name, 10, 30);

      textAlign(RIGHT);
      text(this.card.name, 140, 180);
      pop();
    }
  }
}

let dealer = new Dealer();

let visHand = [];

let hand = dealer.getHand();
for (let index = 0; index < hand.length; index++) {
  let card = hand[index];
  let visCard = new VisualCard(card);
  visCard.x = 170 * index + 20;
  visHand.push(visCard);
}

//♥ ♦ ♠ ♣
var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  for (let index = 0; index < visHand.length; index++) {
    const visCard = visHand[index];

    visCard.draw();
  }
};
window.mousePressed = function () {
  for (let index = 0; index < visHand.length; index++) {
    const vc = visHand[index];
    vc.dragging();
  }
  //visHand[0].isDragging = true;
  //visualHand.forEach((vc) => vc.dragging());
};

window.mouseReleased = function () {
  // visHand[0].isDragging = false;
  // for (let index = 0; index < visHand.length; index++) {
  //   const vc = visHand[index];
  for (let index = 0; index < visHand.length; index++) {
    const vc = visHand[index];
    vc.isDragging = false;
  }
};
