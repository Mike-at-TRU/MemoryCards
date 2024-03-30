import { MemoryCard } from "./MemoryCard.js";
import { shuffle } from "./shuffle.js";

const fakeServerData = {
    "message": {
        frontImages: [],
        backImage: "./assets/Black_Cards/background.png",
        audio: undefined

    }
    , "status": "success"
};

const cardBackOptions = {
    message: {
        cardBacks: [`./assets/background.png`,
            `./assets/Black_Cards/background.png`]
    }, status: `success`
};


for (let index = 0; index < 52; index++) {
    fakeServerData.message.frontImages.push({
        frontImage: `./assets/Black_Cards/${index}.png`
    });
}

const fetchCards = async (_endpoint) => {
    return Promise.resolve(fakeServerData);
};

export const fetchCardBackOptions = async (_endpoint) => {
    const { message } = cardBackOptions;
    const { cardBacks } = message;
    return (cardBacks);
};


export const getCardsForRound = async (difficutly) => {
    const cardsFromServer = await fetchCards();
    console.log(cardsFromServer);
    let numberOfPairsWithMatches;
    let numberOfCardsFromServer;
    switch (difficutly) {
        case `EASY`:
            numberOfPairsWithMatches = 2;
            numberOfCardsFromServer = 2;
            break;
        case `NORMAL`:
            numberOfPairsWithMatches = 1;
            numberOfCardsFromServer = 8;
            break;
        case `HARD`:
            numberOfPairsWithMatches = 1;
            numberOfCardsFromServer = 16;
            break;
        default:
            //throw Error(`not a dificutly`)
            numberOfPairsWithMatches = 1000;
            numberOfCardsFromServer = 52;
    }
    const { message: cardData } = cardsFromServer;
    console.log({ cardData });
    const usedCards = cardData.frontImages.filter((_, index) => index < numberOfCardsFromServer); //random cards that will be used
    console.log({ usedCards });
    const allCardData = usedCards.flatMap(
        ({ frontImage }, index) => Array(numberOfPairsWithMatches * 2).fill(0).map(
            (_) => ({ frontImage: frontImage, backImage: cardData.backImage, value: index, audio: cardData.audio })
        )
    );
    console.log({ allCardData });

    return shuffle(allCardData);
};