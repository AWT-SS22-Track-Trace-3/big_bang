import ProductGenerator from "./generator/ProductGenerator";
import UserGenerator from "./generator/UserGenerator";
import initialiser from "./generator/initialiser";
import fs from "fs";
import helpers from "./generator/helpers";
import IncidentGenerator from "./generator/IncidentGenerator";
import SerialNumberGenerator from "./generator/SerialNumberGenerator";
import dbImporter from "./db";
import userSchema from "./schemas/user";
import productSchema from "./schemas/product";
import incidentSchema from "./schemas/incident";

initialiser();
await dbImporter.clear();
const productsPerBatch = 10;
const batches = 50;
const continents = ["EU", "NA", "AS"];

// Generate Users
let userGenerator = UserGenerator();
let productGenerator = new ProductGenerator();

let users = userGenerator.generate(continents);
let products = [];
let incidents = [];


for (let i = 0; i < batches; i++) {
    let manufacturer = users.manufacturers[helpers.getRandomArrayIndex(users.manufacturers.length)];
    let batchNumber = SerialNumberGenerator().generate(6);

    for (let j = 0; j < productsPerBatch; j++) {
        let dispenser = users.dispensers[helpers.getRandomArrayIndex(users.dispensers.length)];
        let product = productGenerator.generateProduct([manufacturer]);
        let incidentDef;

        if (helpers.randomBool()) {
            // generate incident
            incidentDef = { ...IncidentGenerator().getRandomIncidentDefinition(), product: product.serial_number };
        }

        let generatedChain = productGenerator.generateSupplyChain(manufacturer, users.wholesalers, users.repackagers, dispenser, users.postalServices, incidentDef);

        product["supply_chain"] = generatedChain.chain;
        product["marketed_region"] = dispenser.address.country;
        product["batch_number"] = batchNumber;


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

console.log(products.length);

await dbImporter.bulkInsertUsers(userArr);
await dbImporter.bulkInsertProducts(products);
await dbImporter.bulkInsertIncidents(incidents);

//fs.writeFileSync("./output/users.json", JSON.stringify(users), err => console.log(err));
//fs.writeFileSync("./output/products.json", JSON.stringify(products), err => console.log(err));
//fs.writeFileSync("./output/incidents.json", JSON.stringify(incidents), err => console.log(err));

console.log("done")
