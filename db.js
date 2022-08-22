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
        try {
            await users.insertMany(objects, err => console.log(err));
        } catch (err) {
            console.log("There was an error running mongo bulk inserts. Please import files manually from /output.")
        }
    }

    const bulkInsertProducts = async (objects = []) => {
        try {
            await products.insertMany(objects, err => console.log(err));
        } catch (err) {
            console.log("There was an error running mongo bulk inserts. Please import files manually from /output.")
        }
    }

    const bulkInsertIncidents = async (objects = []) => {
        try {
            await incidents.insertMany(objects, err => console.log(err));
        } catch (err) {
            console.log("There was an error running mongo bulk inserts. Please import files manually from /output.")
        }
    }

    const clear = async () => {
        await users.deleteMany({});
        await products.deleteMany({});
        await incidents.deleteMany({});
    }

    const close = async () => {
        await client.close();
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