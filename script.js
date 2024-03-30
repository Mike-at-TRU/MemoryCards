import { MemoryCard, getCardsForRound } from "./scripts/index.js";

document.addEventListener(`DOMContentLoaded`, async () => {

    startGame("HARD");

});


async function startGame(difficutly) {


    const cards = await getCardsForRound(difficutly); //an array regular object


    const memoryCards = cards.reduce((acc, nextCard, id) => {
        if (!acc.has(`memory-card${id}`)) {
            acc.set(`memory-card${id}`, new MemoryCard(id, nextCard.frontImage, nextCard.backImage, nextCard.value, nextCard.audio));
            return acc;
        }
        throw Error("this ID already has been used");
    }, new Map());; // a map of memory card objects 

    let memoryCardElements = Array.from(memoryCards).map(() => document.createElement("button")); //makes a memory-card-component for each memory card

    memoryCardElements.forEach((card, id) => {
        card.id = `memory-card${id}`;
        card.className = 'cards';
        card.innerHTML = `<img src='${memoryCards.get(card.id).backImage}' class="memoryCardImage">`;
    });

    const cardDiv = document.querySelector('#cards');
    memoryCardElements.forEach(x => { cardDiv.appendChild(x); }); //adds the card element to the document 

    let lastPickedCardID;
    let lastPickedCardID2;
    let bothCardsFlipped; //is a boolen but isn't set so that no cards being flipped (the start of the game or maybe a match being found) doesn't mess it up
    const numberOfMatchesToWin = cards.length / 2;
    let numberOfMatchesMade = 0;



    memoryCardElements.forEach(cardElement => cardElement.addEventListener('click', () => {
        const id = cardElement.id;
        const card = memoryCards.get(id);

        if (id === lastPickedCardID && !bothCardsFlipped) {
            console.log('Sorry, That last card was already chosen, please choose another card');
        }

        else if (!(card.isFilped())) {

            if (bothCardsFlipped) {
                flipLastCardsBack();

            }
            card.reveal();
            cardElement.innerHTML = `<img src='${card.frontImage}' class="memoryCardImage">`;
            //card.cardValue;
            bothCardsFlipped = returnNotBool(bothCardsFlipped);

            if (bothCardsFlipped) {
                checkForMatches(id, lastPickedCardID);
            }
            lastPickedCardID2 = lastPickedCardID;
            lastPickedCardID = id;


        }



    }));



    function checkForMatches(cardOneID, cardTwoID) {
        const cardOne = memoryCards.get(cardOneID);
        const cardTwo = memoryCards.get(cardTwoID);
        if (cardOne.isEqual(cardTwo)) {
            const cardButtons = [document.querySelector(`#${cardOneID}`), document.querySelector(`#${cardTwoID}`)];

            cardOne.remove();
            cardTwo.remove();
            numberOfMatchesMade++;
            cardButtons.forEach(x => {
                x.innerHTML = "";
                x.classList.add("REMOVED");
            });
            bothCardsFlipped = null;
            if (numberOfMatchesMade === numberOfMatchesToWin)
                appenedGameWonScreen();
        }

    }







    function flipLastCardsBack() {
        document.querySelector(`#${lastPickedCardID}`).innerHTML = `<img src='${memoryCards.get(lastPickedCardID).backImage}' class="memoryCardImage">`;
        document.querySelector(`#${lastPickedCardID2}`).innerHTML = `<img src='${memoryCards.get(lastPickedCardID2).backImage}' class="memoryCardImage">`;
        memoryCards.get(lastPickedCardID).hide();
        memoryCards.get(lastPickedCardID2).hide();



    }
    function appenedGameWonScreen() {
        console.log(numberOfMatchesMade, numberOfMatchesToWin);

        memoryCardElements.forEach(cardElement => cardElement.parentNode.removeChild(cardElement));
        const winscreenPlaceHolder = document.querySelector(`.winScreen`);
        const gameWonScreen = document.createElement(`h1`);
        gameWonScreen.textContent = "Congrats";
        winscreenPlaceHolder.appendChild(gameWonScreen);

    }
}

function returnNotBool(boolToCheck) {
    if (boolToCheck == null || boolToCheck === true) {
        return false; //null/undefined are no cards flipped false is one and true is 2
    }
    return true;
}