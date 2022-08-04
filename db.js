import mongoose from "mongoose";
import userSchema from "./schemas/user";
import productSchema from "./schemas/product";
import incidentSchema from "./schemas/incident";

const DBImporter = () => {
    const client = mongoose.createConnection('mongodb://root:SuperSecret@localhost:27017/track-trace');
    const users = client.model(userSchema.name, userSchema.schema);
    const products = client.model(productSchema.name, productSchema.schema);
    const incidents = client.model(incidentSchema.name, incidentSchema.schema);

    const bulkInsertUsers = async (objects = []) => {
        await users.insertMany(objects, err => console.log(err));
    }

    const bulkInsertProducts = async (objects = []) => {
        await products.insertMany(objects, err => console.log(err));
    }

    const bulkInsertIncidents = async (objects = []) => {
        await incidents.insertMany(objects, err => console.log(err));
    }

    const clear = async () => {
        await users.deleteMany({});
        await products.deleteMany({});
        await inc
        idents.deleteMany({});
    }

    const close = () => {
        client.close();
    }

    return {
        bulkInsertUsers,
        bulkInsertIncidents,
        bulkInsertProducts,
        clear,
        close
    }
}

const dbImporter = DBImporter();
export default dbImporter;