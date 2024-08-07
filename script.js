let countries;
let quiz;
fetchCountries().then((json) => {
    countries = json;
    quiz = new Quiz();
});

async function fetchCountries() {
    const response = await fetch('includes/country_names.json');
    const json = await response.json();
    return json;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm. From https://stackoverflow.com/a/12646864/19703627 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


class Quiz {
    currentCountryIndex;
    countryCodes;
    originalCount;

    constructor() {
        this.countryCodes = Object.keys(countries);
        this.originalCount = this.countryCodes.length;
        this.setCount();
        this.setTotal();
        shuffleArray(this.countryCodes);

        // EVENT HANDLERS
        previousButton.addEventListener('click', () => {
            quiz.prevFlag();
        });
        nextButton.addEventListener('click', () => {
            quiz.nextFlag();
        });     
        guessBox.addEventListener('input', () => {
            this.checkGuess();
        }); 

        this.currentCountryIndex = 0;
        
        this.displayFlag();
    }

    nextFlag() {
        this.currentCountryIndex++;
        
        // handle overflow
        if (this.currentCountryIndex >= this.countryCodes.length) {
            this.currentCountryIndex = 0;
        }

        this.displayFlag();
    }

    prevFlag() {
        this.currentCountryIndex--;

        // handle underflow
        if (this.currentCountryIndex < 0) {
            this.currentCountryIndex = this.countryCodes.length - 1;
        }
        this.displayFlag();
    }

    displayFlag() {
        let currentCountryCode = this.countryCodes[this.currentCountryIndex];
        countryFlag.src = 'includes/flags/' + currentCountryCode + '.svg';
    }

    checkGuess() {
        let guess = guessBox.value.toLowerCase();

        // if guess is correct
        if (guess == countries[this.countryCodes[this.currentCountryIndex]].toLowerCase()) {
            
            // remove correct country from list
            this.countryCodes.splice(this.currentCountryIndex, 1);

            if (this.currentCountryIndex >= this.countryCodes.length) {
                this.currentCountryIndex = 0;
            }
            guessBox.value = '';
            this.setCount();
            this.displayFlag();
        }
    }

    setCount() {
        let count = this.originalCount - this.countryCodes.length;
        scoreCounter.innerHTML = count;
    }

    setTotal() {
        countriesTotal.innerHTML = this.originalCount;
    }
}

const previousButton = document.getElementById('prevFlagButton');
const nextButton = document.getElementById('nextFlagButton');
const countryFlag = document.getElementById('countryFlag');

const guessBox = document.getElementById('guessBox');

const scoreCounter = document.getElementById('score');
const countriesTotal = document.getElementById('countriesTotal');