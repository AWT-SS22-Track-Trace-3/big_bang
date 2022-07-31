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
            country.alpha2 = x;

            return country;
        }).filter(x => x.continent === continent);
    } else {
        country_list = country_keys.map(x => {
            let country = countries[x];
            country.alpha2 = x;

            return country;
        });
    }

    return country_list;
}

export default {
    genericAddress,
    getCountries
}