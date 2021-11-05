let cardArray = [
  {
    name: "fries",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/fries_t5rfhy.png",
  },
  {
    name: "fries",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/fries_t5rfhy.png",
  },
  {
    name: "pizza",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/pizza_bmge3a.png",
  },
  {
    name: "pizza",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/pizza_bmge3a.png",
  },
  {
    name: "milkshake",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/milkshake_emts11.png",
  },
  {
    name: "milkshake",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/milkshake_emts11.png",
  },
  {
    name: "ice-cream",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/ice-cream_olhaql.png",
  },
  {
    name: "ice-cream",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/ice-cream_olhaql.png",
  },
  {
    name: "hotdog",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/hotdog_ng2hna.png",
  },
  {
    name: "hotdog",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/hotdog_ng2hna.png",
  },
  {
    name: "cheeseburger",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/cheeseburger_ju7b3t.png",
  },
  {
    name: "cheeseburger",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/cheeseburger_ju7b3t.png",
  },
];
//define variables and get DOM element

let grid = document.querySelector(".grid");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardSelected = [];
let cardsWon = 0;
let clicks = 0;

//add an event handler to the document
// this event listener holds the function that start the game
document.addEventListener("DOMContentLoaded", function () {
  //createBoard 
  createBoard(grid, cardArray);
  arrangeCard();
// console.log(JSON.stringify(sorted))
// console.log(sorted)
    playAgain.addEventListener("click", replay)

  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));
});

// createBoard function
//createBoard function create the image and its takes in two parameters
function createBoard(grid, array) {
  popup.style.display = "none";
  array.forEach((arr, index) => {
    //create an img element and add some attribute to it
    let img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png"
    );
    img.setAttribute("data-id", index);
    grid.appendChild(img);
  });
}

//arrangeCard function rearrange the array for difficulty
function arrangeCard() {
  sorted = cardArray.sort(() => 0.5 - Math.random());
//   return sorted
  
}

//flip card function
//this function add .flip to the images and change the imgs from the cover to the real image
//it also push the name and the id of the images to the respective arrays
function flipCard() {
  let selected = this.dataset.id;
  cardSelected.push(cardArray[selected].name);
  cardsId.push(selected);
  this.classList.add("flip");
  this.setAttribute("src", cardArray[selected].img);
  if (cardsId.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

//checkForMatch function
//this is the most important function of this project
//this function check for the matching pictures and records the results
function checkForMatch() {
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardSelected[0] === cardSelected[1] && firstCard !== secondCard) {
    alert("you have found a match");
    cardsWon += 1;
    scoreBoard.innerHTML = cardsWon;
    setTimeout(checkWon,500)
  } else {
    imgs[firstCard].setAttribute("src", "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png")
    imgs[secondCard].setAttribute("src", "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png")
    alert("wrong, please try again")
    imgs[firstCard].classList.remove("flip")
    imgs[secondCard].classList.remove("flip")
  }
  cardSelected =[]
  cardsId = []
  clicks += 1
  clickBoard.innerHTML = clicks
}

//check won
// this function check the if the game is complete and  display the popup on the screen
function checkWon(){
    if(cardsWon == cardArray.length/2){
        alert("you won")
        setTimeout(()=>
            popup.style.display = "flex", 300)
    }
}

// the replay function
// this function starts the game over again
function replay(){
    arrangeCard();
    grid.innerHTML = "";
    createBoard(grid, cardArray)
    cardsWon = 0;
    clicks = 0;
    clickBoard.innerHTML = 0;
    scoreBoard.innerHTML = 0;
    popup.style.display = "none"
}