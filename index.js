import ProductGenerator from "./generator/ProductGenerator";
import UserGenerator from "./generator/UserGenerator";
import initialiser from "./generator/initialiser";
import fs from "fs";
import helpers from "./generator/helpers";
import IncidentGenerator from "./generator/IncidentGenerator";
import serialNumberGenerator from "./generator/SerialNumberGenerator";
import dbImporter from "./db";

initialiser();

const productsPerBatch = 5;
const batches = 100;
const continents = ["EU", "NA", "AS", "AF"];

// Generate Users
let userGenerator = UserGenerator();
let productGenerator = new ProductGenerator();

let users = userGenerator.generate(continents);
let products = [];
let incidents = [];


for (let i = 0; i < batches; i++) {
    let manufacturer = users.manufacturers[helpers.getRandomArrayIndex(users.manufacturers.length)];
    let productTemplate = productGenerator.generateTemplate([manufacturer]);
    let batchNumber = serialNumberGenerator.generate(6);

    for (let j = 0; j < productsPerBatch; j++) {
        let dispenser = users.dispensers[helpers.getRandomArrayIndex(users.dispensers.length)];
        let incidentDef = null;

        let product = {
            ...productTemplate,
            batch_number: batchNumber,
            marketed_region: dispenser.address.country,
            serial_number: serialNumberGenerator.generate(12),
            expiry_date: productGenerator.getExpiryDate()
        };

        if (helpers.randomBool()) {
            // generate incident
            incidentDef = { ...IncidentGenerator().getRandomIncidentDefinition(), product: product.serial_number };
        }

        let generatedChain = productGenerator.generateSupplyChain(manufacturer, users.wholesalers, users.repackagers, dispenser, users.postalServices, incidentDef);

        product["supply_chain"] = generatedChain.chain;

        if (generatedChain.incident) {
            incidents.push(generatedChain.incident);
            product.reported = true
            product.used = false
        } else {
            product.reported = false
            product.used = true
        }

        products.push(product);
    }
}

let userArr = [];

for (let key in users) {
    userArr = userArr.concat(users[key]);
}

Date.prototype.toJSON = function () {
    return { "$date": this.toISOString() }
}

await fs.writeFileSync("./output/users.json", JSON.stringify(userArr), err => console.log(err));
await fs.writeFileSync("./output/products.json", JSON.stringify(products), err => console.log(err));
await fs.writeFileSync("./output/incidents.json", JSON.stringify(incidents), err => console.log(err));

console.log("-------------------------------");
console.log(`${userArr.length} users`);
console.log(`${incidents.length} incidents`);
console.log(`${products.length} products`);
console.log("-------------------------------");

dbImporter.connect()
    .then((results) => console.log("Database connection established. Clearing database and pushing generated items."))
    .then(() => dbImporter.clear())
    .then(() => dbImporter.bulkInsertUsers(userArr))
    .then(() => dbImporter.bulkInsertProducts(products))
    .then(() => dbImporter.bulkInsertIncidents(incidents))
    .then(() => dbImporter.close())
    .catch(err => {
        console.log(err);
    });
