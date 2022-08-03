import helpers, { accessLevels } from "./helpers"

const UserGenerator = () => {
    const postalServices = [{
        company: "Deutsche Post DHL Group",
        address: {
            street: "Charles-de-Gaulle-Straße",
            number: "20",
            zip_code: "53113",
            city: "Bonn",
            country: "DE",
            format: "EU"
        }
    },
    {
        company: "FedEx Corporation",
        address: {
            street: "Airways, Module H3 Department 4634",
            number: "3875",
            zip_code: "38116",
            city: "Memphis, TN",
            country: "US",
            format: "US"
        }
    },
    {
        company: "United Parcel Services of America, Inc.",
        username: "ups_inc",
        address: {
            street: "Glenlake Parkway NE",
            number: "55",
            zip_code: "30328",
            city: "Atlanta, GA",
            country: "US",
            format: "US"
        }
    }]
    const manufacturers = [{
        company: "Bayer AG",
        address: {
            street: "Kaiser-Wilhelm-Allee",
            number: "1",
            zip_code: "51373",
            city: "Leverkusen",
            country: "DE",
            format: "EU"
        },
        type: "manufacturer",
        access_lvl: accessLevels.manufacturer
    }, {
        company: "Sandoz GmbH",
        address: {
            street: "Biochemiestraße",
            number: "10",
            zip_code: "6250",
            city: "Kundl",
            country: "AT",
            format: "EU"
        },
        type: "manufacturer",
        access_lvl: accessLevels.manufacturer
    }, {
        username: "chartwell_pharmaceuticals_llc",
        company: "Chartwell Pharmaceuticals, LLC.",
        address: {
            street: "Brenner Dr",
            number: "77",
            zip_code: "10920-1307",
            city: "Congers, NY",
            country: "US",
            format: "US"
        },
        type: "manufacturer",
        access_lvl: accessLevels.manufacturer
    }, {
        company: "Hyphens Pharma",
        address: {
            street: "Tai Seng Street",
            number: "16",
            zip_code: "534138",
            city: "Singapore",
            country: "Singapore",
            format: "US"
        },
        type: "manufacturer",
        access_lvl: accessLevels.manufacturer
    }]
    const dispensers = [{
        company: "Charite – Universitätsmedizin Berlin",
        address: {
            street: "Charitéplatz",
            number: "1",
            zip_code: "10117",
            city: "Berlin",
            country: "DE",
            format: "EU"
        },
        "type": "dispenser",
        "access_lvl": accessLevels.dispenser
    },]
    const authorities = []

    const random_manufacturers = ["Re:Med Pharmaceutical", "Fortunas Medical", "Get.Health Corporation", "Victorias Pharma Corp."]
    const random_wholesalers = ["Re:Sales Corporation", "Metro Medical", "BIG Wholesales Corp.", "Brava Warehouses", "Keto Sales Medical"]
    const random_repackagers = ["RE:Pack Services Corp.", "Metro Medical Packaging", "Arlas Postage International"]
    const random_dispensers = ["Alios Hospitals International", "Relive Clinics Group", "Brawn Pharmacies Intl.", "Centurion International", "Drike Pharmacy Corp.", "Ex Ferris Medical Group"]

    const getPostalServices = () => {
        let result = []

        for (let service of postalServices) {

            let username = service.username
            if (!username) {
                username = getUsername(service.company)
            }

            result.push({
                company: service.company,
                username,
                password: "$2b$12$eqc6X3z2mvXtEoWhFTMpSupUoQ.Gm9MU2zOZUAzvjVwzjIbSuHEuu",
                address: service.address,
                type: "postal_service",
                access_lvl: accessLevels.postalService

            })
        }

        return result;
    }

    const getGenerics = (companies, continents = []) => {
        let result = []

        for (let continent of continents) {
            let countryList = helpers.getCountries(continent);

            for (let item of companies) {
                let company = `${item} ${continent}`;
                let address = helpers.genericAddress(countryList[Math.round(Math.random() * (countryList.length - 1))].alpha2, (continent == "EU" ? "EU" : "US"));

                result.push({
                    company,
                    address,
                    username: getUsername(company),
                    password: "$2b$12$eqc6X3z2mvXtEoWhFTMpSupUoQ.Gm9MU2zOZUAzvjVwzjIbSuHEuu"
                })
            }
        }
        return result;
    }

    const generateWholesalers = (includedContinents = []) => {
        let result = getGenerics(random_wholesalers, includedContinents);

        return result.map(x => {
            x.type = "wholesaler";
            x.access_lvl = accessLevels.wholesaler;

            return x;
        });
    }

    const generateRepackagers = (includedContinents = []) => {
        let result = getGenerics(random_repackagers, includedContinents);

        return result.map(x => {
            x.type = "repackager";
            x.access_lvl = accessLevels.repackager;

            return x;
        });
    }

    const generateManufacturers = (includedContinents = []) => {
        let result = getGenerics(random_manufacturers, includedContinents);

        result.map(x => {
            x.type = "manufacturer";
            x.access_lvl = accessLevels.manufacturer;

            return x;
        });

        return result.concat(manufacturers.map(x => enrichPredefinedUser(x)));
    }

    const generateDispensers = (includedContinents = []) => {
        let result = getGenerics(random_dispensers, includedContinents);

        result.map(x => {
            x.type = "dispenser";
            x.access_lvl = accessLevels.dispenser;

            return x;
        });

        return result.concat(dispensers.map(x => enrichPredefinedUser(x)));
    }

    const enrichPredefinedUser = (user) => {
        let username = user.username
        if (!username) username = getUsername(user.company)

        user.username = username;
        user.password = "$2b$12$eqc6X3z2mvXtEoWhFTMpSupUoQ.Gm9MU2zOZUAzvjVwzjIbSuHEuu";

        return user;
    }

    const getUsername = (company_name) => {
        return company_name.toLowerCase().replaceUmlaute().replace(/[^\w ]/g, "").replaceAll(" ", "_").replaceAll(/(_)\1+/g, "_");
    }

    const generate = (includedContinents = []) => {
        return {
            manufacturers: generateManufacturers(includedContinents),
            postalServices: getPostalServices(),
            wholesalers: generateWholesalers(includedContinents),
            repackagers: generateRepackagers(includedContinents),
            dispensers: generateDispensers(includedContinents)
        }
    }

    return {
        generate
    }
}

export default UserGenerator;