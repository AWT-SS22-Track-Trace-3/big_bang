import ProductGenerator from "./generator/ProductGenerator";
import UserGenerator from "./generator/UserGenerator";
import initialiser from "./generator/initialiser";
import fs from "fs";
import helpers from "./generator/helpers";
import IncidentGenerator from "./generator/IncidentGenerator";

initialiser();
const productNumber = 20;
const continents = ["EU", "NA", "SA", "AS", "AF"];

// Generate Users
let userGenerator = UserGenerator();
let productGenerator = new ProductGenerator();

let users = userGenerator.generate(continents);
let products = [];
let incidents = [];


for (let i = 0; i < productNumber; i++) {
    let manufacturer = users.manufacturers[helpers.getRandomArrayIndex(users.manufacturers.length)];
    let product = productGenerator.generateProduct([manufacturer]);
    let incidentDef;
    let dispensers;

    if (helpers.randomBool()) {
        // generate incident
        incidentDef = { ...IncidentGenerator().getRandomIncidentDefinition(), product: product.serial_number };

        if (helpers.randomBool()) dispensers = users.dispensers;
    } else {
        dispensers = users.dispensers;
    }

    let generatedChain = productGenerator.generateSupplyChain(manufacturer, users.wholesalers, users.repackagers, dispensers, users.postalServices, incidentDef);

    product["supply_chain"] = generatedChain.chain;

    if (generatedChain.incident)
        incidents.push(generatedChain.incident);

    products.push(product);
}

fs.writeFileSync("./output/users.json", JSON.stringify(users), err => console.log(err));
fs.writeFileSync("./output/products.json", JSON.stringify(products), err => console.log(err));
fs.writeFileSync("./output/incidents.json", JSON.stringify(incidents), err => console.log(err));

/*
let productGenerator = new ProductGenerator()

productGenerator.generate();
const users = UserGenerator().generate(["EU"]);

const dateGenerator = DateGenerator();
for (let i = 0; i < 5; i++) {
    console.log(dateGenerator.getNextDate());
}

*/