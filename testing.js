const testIDS = [0, 1, 2, 3, 4, 5, 6, 7];

const numberOfElements = testIDS.length;

const numberOfMatches = 1;


const allTheCards = testIDS.reduce((cardElements, next, id) => {
    let number = 0;
    if (!cardElements.has(next)) {
        cardElements.set(next, (Math.floor(id / (numberOfMatches * 2)) + 1));
        return cardElements;
    }
    throw Error("this ID already has been used");
}, new Map());

console.log(allTheCards);

let testArray = Array.from(allTheCards, ([id, value]) => value);

console.log(testArray);

testArray = shuffle(testArray);

console.log(testArray);

testArray.forEach((number, index) => allTheCards.set(index, number));

console.log(allTheCards);

function shuffle(array) {
    let length = array.length;
    let randomPositionToSwap;
    let tempPosition;
    let imutableArray = [...array];


    for (let i = 0; i < length; i++) {


        randomPositionToSwap = Math.floor(Math.random() * length);
        tempPosition = imutableArray[randomPositionToSwap];
        imutableArray[randomPositionToSwap] = imutableArray[i];
        imutableArray[i] = tempPosition;
    }

    return imutableArray;
}