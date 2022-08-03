import fs from "fs";
import DateGenerator from "./DateGenerator";
import helpers from "./helpers";
import IncidentGenerator from "./IncidentGenerator";
import SerialNumberGenerator from "./SerialNumberGenerator";
import SupplyChainBuilder from "./SupplyChainBuilder";

class ProductGenerator {
    productNames = ["Krötol", "Carvacrol", "Petrabol", "Agicin", "Allicin", "Metformin", "Ibuprofen", "Penicillin", "Paracetamol", "Ritalin", "Mangaten", "Hepten", "Hydrargyrum"]
    productForms = ["tablet", "capsule", "phial", "powder"]

    getProductName(manufacturer, strength) {
        const random = Math.floor(Math.random() * this.productNames.length)

        return `${manufacturer} ${this.productNames[random]} - ${strength}`
    }

    getProductForm() {
        const random = Math.floor(Math.random() * this.productForms.length)

        return this.productForms[random]
    }

    getProductPackSize() {
        return Math.floor((Math.random() * 101) / 10) * 10
    }

    getProductStrength() {
        const random = Math.ceil((Math.random() * 60) / 10) * 10
        return `${random} mg`
    }

    getSerialNumber() {
        let numberGenerator = SerialNumberGenerator().getInstance();
        return numberGenerator.generate(12);
    }

    getDrugCode() {
        let numberGenerator = SerialNumberGenerator().getInstance();
        return numberGenerator.generate(6);
    }

    getExpiryDate() {
        let date = new Date();
        date.setDate(date.getDate() + Math.ceil(Math.random() * 700))

        return date
    }

    generateSupplyChain(manufacturer, wholesalers = [], repackagers = [], dispenser, shipmentServices = [], incident) {
        let numberOfOwners = Math.ceil(Math.random() * 3) + 1;

        let intermediateOwners = wholesalers.concat(repackagers);
        let chainOwners = helpers.getRandomNumberSequence(numberOfOwners, intermediateOwners.length - 1).map(x => intermediateOwners[x]);

        if (!incident || (helpers.randomBool() && incident))
            chainOwners.push(dispenser);

        const builder = SupplyChainBuilder();
        const dateGenerator = DateGenerator();

        //create product
        builder.addCreation({
            username: manufacturer.username,
            transaction_date: dateGenerator.getNextDate()
        }, chainOwners[0].username);

        for (let i = 0; i < chainOwners.length; i++) {
            if (!(incident && incident.noPriorShipment && i >= chainOwners.length - 1)) {
                builder.addShipment({
                    username: shipmentServices[helpers.getRandomArrayIndex(shipmentServices.length)].username,
                    shipment_date: dateGenerator.getNextDate(),
                    delivery_date: dateGenerator.getNextDate(),
                })
            }

            let owner = {
                username: chainOwners[i].username,
                transaction_date: dateGenerator.getNextDate(),
                checkin_date: dateGenerator.getNextDate(),
                checkout_date: dateGenerator.getNextDate()
            }

            //wholesaler or repackager
            if (i < chainOwners.length - 1)
                builder.addOwnership(owner, chainOwners[i + 1].username)
            else
                builder.addOwnership(owner)

        }
        console.log(!incident, chainOwners[chainOwners.length - 1].type === "dispenser")

        if (!incident && chainOwners[chainOwners.length - 1].type === "dispenser") {

            console.log("adding termination");
            builder.addTermination({
                username: chainOwners[chainOwners.length - 1].username,
                transaction_date: dateGenerator.getNextDate()
            });
        }
        else
            builder.addIncident(incident)

        return {
            chain: builder.build(),
            incident: IncidentGenerator().generateIncident(incident, dateGenerator.getNextDate(), builder.getLastIndex())
        };
    }

    generateProduct(manufacturers = []) {
        let strength = this.getProductStrength();
        let manufacturer_username = manufacturers[0].username;
        let manufacturer_name = manufacturers[0].company;

        return {
            drug_code: this.getDrugCode(),
            serial_number: this.getSerialNumber(),
            expiry_date: this.getExpiryDate(),
            form: this.getProductForm(),
            strength,
            pack_size: this.getProductPackSize(),
            name: this.getProductName(manufacturer_name, strength),
            manufacturers: [
                manufacturer_username
            ]
        }
    }
}

export default ProductGenerator;