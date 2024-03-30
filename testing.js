import { Test } from "./scripts/test.js";
import { fetchCardBackOptions } from "./scripts/fetchCards.js";

customElements.define("test-modual", Test);
document.addEventListener(`DOMContentLoaded`, async () => {


    const start = document.querySelector(`#start`);
    const difficutlySelections = document.querySelector(`#difficulty`);
    const difficutlies = [`EASY`, `NORMAL`, `HARD`];
    const cardBackOptions = await fetchCardBackOptions("endpoint goes here");
    const cardBackSelection = document.querySelector(`#cardBack`);
    console.log(cardBackOptions);
    cardBackOptions.forEach((x) => {
        const button = document.createElement(`button`);
        console.log(x);
        button.innerHTML = `<img src='${x}'/>`;
        button.classList.add(`cardBackOptions`);
        cardBackSelection.appendChild(button);

    }
    );
    difficutlies.forEach((x) => {
        const button = document.createElement(`button`);
        button.textContent = x;
        difficutlySelections.appendChild(button);
    });
    const startButton = document.createElement(`button`);
    startButton.classList.add(`startButton`);
    startButton.textContent = "Start";
    start.appendChild(startButton);

    startButton.addEventListener(`click`, () => {
        console.log(`starting`);
        start.innerHTML = "";
        const selections = document.querySelector(`#selections`);
        console.log(selections);
        selections.innerHTML = "";
        console.log(start, selections);

    });


});