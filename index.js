import ProductGenerator from "./generator/ProductGenerator";
import helpers from "./generator/helpers";

let productGenerator = new ProductGenerator()

productGenerator.generate();

console.log(helpers.getCountries("EU"));
