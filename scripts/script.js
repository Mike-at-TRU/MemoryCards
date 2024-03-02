import { MemoryCard } from "./MemoryCard.js";

customElements.define("memory-cards", MemoryCard);

const testMeomoryCards = [{
    image: `./assets/Black_Cards/AceOfHearts.png`
}, { image: `./assets/Black_Cards/Background.png` }];
function shuffle(array) {
    const length = array.length;
    let randomPositionToSwap;
    let tempPosition;
    const imutableArray = JSON.parse(JSON.stringify(array));


    for (let i = 0; i < length; i++) {


        randomPositionToSwap = Math.floor(Math.random() * length);
        tempPosition = imutableArray[randomPositionToSwap];
        imutableArray[randomPositionToSwap] = imutableArray[i];
        imutableArray[i] = tempPosition;
    }

    return imutableArray;
}


document.addEventListener(`DOMContentLoaded`, () => {

    let cardImgPicked = `./assets/Black_Cards/`;

    const cardTemplate = document.querySelector("#cardTemplate");

    const numberOfPairsWithMatches = 1;

    const allCardData = testMeomoryCards.flatMap(
        ({ image }, index) => Array(numberOfPairsWithMatches * 2).fill(0).map(
            (_) => ({ image, value: index })
        )
        //[{ image, value: index }, { image, value: index }]
    );
    console.log(allCardData);
    const shuffledCardData = shuffle(allCardData);
    console.log(shuffledCardData);

    const cardMap = shuffledCardData.reduce((acc, nextCard, id) => {
        if (!acc.has(id)) {
            acc.set(id, new MemoryCard(id, nextCard.image, nextCard.value));
            return acc;
        }
        throw Error("this ID already has been used");
    }, new Map());
    console.log({ cardMap });
    let lastPickedCardID;
    let bothCardsFlipped;
    let gameWon = false;
    allTheCardElements.forEach(cardElement => cardElement.innerHTML = `<img src='${cardImgPicked + 'Background.png'}' class="memoryCardImage">`);

    const allTheCards = Array.from(allTheCardElements).reduce((cardElements, next) => {
        if (!cardElements.has(next.id)) {
            cardElements.set(next.id, new MemoryCard(1));
            return cardElements;
        }
        throw Error("this ID already has been used");
    }, new Map());



    allTheCardElements.forEach(cardElement => cardElement.addEventListener('click', () => {
        const id = cardElement.id;
        const card = allTheCards.get(id);


        if (id === lastPickedCardID) {
            console.log('Sorry, That last card was already chosen, please choose another card');
        }

        else if (!(card.isFilped())) {

            if (bothCardsFlipped) {
                flipLastCardsBack();

            }
            card.reveal();
            cardElement.innerHTML = `<img src='${cardImgPicked + 'AceOfHearts.png'}' class="memoryCardImage">`;
            //card.cardValue;
            bothCardsFlipped = returnNotBool(bothCardsFlipped);

            if (bothCardsFlipped) {
                checkForMatches(id, lastPickedCardID);
            }
            lastPickedCardID = id;


        }



    }));


    function returnNotBool(boolToCheck) {
        if (boolToCheck == null || boolToCheck === true) {
            return false;
        }
        return true;
    }

    function checkForMatches(cardOneID, cardTwoID) {
        const cardOne = allTheCards.get(cardOneID);
        const cardTwo = allTheCards.get(cardTwoID);
        if (cardOne.isEqual(cardTwo)) {
            cardOne.remove();
            cardTwo.remove();
            checkForGameOne();
        }

    }

    function flipLastCardsBack() {


    }
    function checkForGameOne() {
        allTheCards.forEach(card => {
            if (!card.isRemoved) {
                return false;
            }
        });
        gameWon = true;
        if (gameWon = true) {
            allTheCardElements.forEach(cardElement => cardElement.parentNode.removeChild(cardElement));
            const winscreenPlaceHolder = document.querySelector(`.winScreen`);
            const gameWonScreen = document.createElement(`h1`);
            gameWonScreen.textContent = "Congrats";
            winscreenPlaceHolder.appendChild(gameWonScreen);
        }
    }












});