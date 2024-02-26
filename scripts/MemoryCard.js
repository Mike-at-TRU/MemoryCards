export class MemoryCard {
    #isFliped = false;
    #isRemoved = false;
    #ratioForCards = 2.5 / 3.5;
    #identifier;
    constructor(identifier) {
        this.#identifier = identifier;
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
        return this.#identifier === memoryCardToCheck.identifier;
    }

    remove() {
        this.#isRemoved = true;
    }

    isRemoved() {
        cdsa;
        return this.#isRemoved;
    }


}






