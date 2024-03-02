export class MemoryCard extends HTMLElement {
    #isFliped = false;
    #isRemoved = false;

    constructor(id, image, cardValue) {
        super();
        this.id = id;
        this.image = image;
        this.cardValue = cardValue; //this was privite and I couldn't understand why it kept saying undefined 
    }

    // hide() {
    //     this.#isFliped = false;
    // }

    // reveal() {
    //     this.#isFliped = true;
    // }

    // isFilped() {
    //     return this.#isFliped;
    // }

    // isEqual(memoryCardToCheck) {
    //     return this.cardValue === memoryCardToCheck.cardValue;
    // }

    // remove() {
    //     this.#isRemoved = true;
    // }

    // isRemoved() {
    //     return this.#isRemoved;
    // }


}






