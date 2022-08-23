import mongoose from "mongoose";
import userSchema from "./schemas/user";
import productSchema from "./schemas/product";
import incidentSchema from "./schemas/incident";

const DBImporter = () => {
    let users;
    let products;
    let incidents;

    const connect = () => {
        return mongoose.connect('mongodb://root:SuperSecret@localhost:27017/track-trace', {
            connectTimeoutMS: 3000,
            serverSelectionTimeoutMS: 3000
        }).then(
            () => {
                users = mongoose.connection.model(userSchema.name, userSchema.schema);
                products = mongoose.connection.model(productSchema.name, productSchema.schema);
                incidents = mongoose.connection.model(incidentSchema.name, incidentSchema.schema);

                return new Promise((resolve) => resolve("Successfully connected to database."));
            },
            (err) => {
                return new Promise((resolve, reject) => reject("Failed to connect to database. Please import files manually from /output."));
            }
        );
    }

    const bulkInsertUsers = (objects = []) => {
        return users.insertMany(objects);
    }

    const bulkInsertProducts = (objects = []) => {
        return products.insertMany(objects);
    }

    const bulkInsertIncidents = (objects = []) => {
        return incidents.insertMany(objects);
    }

    const deleteUsers = () => {
        return users.deleteMany({})
    }

    const deleteIncidents = () => {
        return incidents.deleteMany({})
    }

    const deleteProducts = () => {
        return products.deleteMany({})
    }

    const clear = () => {
        return deleteUsers()
            .then(() => deleteIncidents())
            .then(() => deleteProducts())

    }

    const close = () => {
        return mongoose.connection.close();
    }

    return {
        bulkInsertUsers,
        bulkInsertIncidents,
        bulkInsertProducts,
        clear,
        close,
        connect
    }
}

const dbImporter = DBImporter();
export default dbImporter;