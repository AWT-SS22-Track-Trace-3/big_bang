import pkg from "countries-list"
const { countries, continents } = pkg;

const genericAddress = (country, format) => {
    return {
        street: "Example Street",
        number: "42",
        zip_code: "26942",
        city: "Example City",
        country,
        format
    }
}

const getCountries = (continent = undefined) => {
    let country_keys = Object.keys(countries);
    let country_list = [];

    if (continent) {
        country_list = country_keys.map(x => {
            let country = countries[x];
            country["alpha2"] = x;

            return country;
        }).filter(item => item.continent === continent);
    } else {
        country_list = country_keys.map(x => {
            let country = countries[x];
            country["alpha2"] = x;

            return country;
        });
    }
    return country_list;
}

const randomBool = () => {
    return Math.random() > 0.4;
}

const umlautMap = {
    '\u00fc': 'ue',
    '\u00e4': 'ae',
    '\u00f6': 'oe',
    '\u00df': 'ss',
}

export const replaceUmlaut = (string) => {
    return string.replace(/[\u00fc|\u00e4|\u00f6|\u00df]/g, (a) => umlautMap[a]);
}

export const accessLevels = {
    postalService: 0,
    repackager: 0,
    wholesaler: 0,
    dispenser: 1,
    manufacturer: 2,
    authority: 3,
    admin: 4
}

const getRandomNumberSequence = (length, limit) => {
    let result = [];

    for (let i = 0; i < length; i++) {
        let newNumber;

        do {
            newNumber = Math.round(Math.random() * limit);
        } while (result.includes(newNumber));

        result.push(newNumber);
    }

    return result;
}

const getRandomArrayIndex = (arrayLength) => {
    return Math.round(Math.random() * (arrayLength - 1));
}

export default {
    genericAddress,
    getCountries,
    replaceUmlaut,
    randomBool,
    getRandomNumberSequence,
    getRandomArrayIndex
}