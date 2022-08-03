import mongoose from "mongoose";

const DBImporter = () => {
    const client = mongoose.createConnection('mongodb://root:SuperSecret@localhost:27017/track-trace');

    const bulkInsert = (objects = [], schema) => {

        let model = client.model(schema.name, schema.schema);
        model.insertMany(objects, err => console.log(err));
    }

    return {
        bulkInsert
    }
}

const dbImporter = DBImporter();
export default dbImporter;