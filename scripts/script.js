document.addEventListener(`DOMContentLoaded`, () => {
    class MemoryCard {
        #isFliped = false;
        #isRemoved = false;
        #ratioForCards = 2.5 / 3.5;

        constructor(cardValue) {
            this.cardValue = cardValue; //this was privite and I couldn't understand why it kept saying undefined 
        }

        hide() {
            this.#isFliped = false;
        }

        reveal() {
            this.#isFliped = true;
        }

        isFilped() {
            return this.#isFliped;
        }

        isEqual(memoryCardToCheck) {
            return this.cardValue === memoryCardToCheck.cardValue;
        }

        remove() {
            this.#isRemoved = true;
        }

        isRemoved() {
            return this.#isRemoved;
        }


    }


    const allTheCardElements = document.querySelectorAll(".cards");

    let lastPickedCardID;
    let bothCardsFlipped;
    let gameWon = false;
    allTheCardElements.forEach(cardElement => cardElement.textContent = `?`);

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

        console.log(id);
        if (id === lastPickedCardID) {
            console.log('Sorry, That last card was already chosen, please choose another card');
        }

        else if (!(card.isFilped())) {

            if (bothCardsFlipped) {
                flipLastCardsBack();

            }
            card.reveal();
            cardElement.textContent = card.cardValue;
            console.log(cardElement.textContent);
            bothCardsFlipped = returnNotBool(bothCardsFlipped);

            if (bothCardsFlipped) {
                checkForMatches(id, lastPickedCardID);
            }
            lastPickedCardID = id;


        }
        console.log(card);
        console.log(bothCardsFlipped);


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