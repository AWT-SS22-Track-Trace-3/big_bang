import fs from "fs";
import SerialNumberGenerator from "./SerialNumberGenerator";

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

    generate() {
        console.log(`Drug Code: ${this.getDrugCode()}`);
        console.log(`Serial Number: ${this.getSerialNumber()}`);
        console.log(`Expiry Date: ${this.getExpiryDate()}`);
        console.log(`Product Form: ${this.getProductForm()}`);
        console.log(`Product Strength: ${this.getProductStrength()}`);
        console.log(`Product Name: ${this.getProductName("test", "test")}`);
        console.log(`Pack Size: ${this.getProductPackSize()}`);
    }
}

export default ProductGenerator;