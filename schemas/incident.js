import mongoose from "mongoose";

const { Schema } = mongoose;

const incidentSchema = new Schema({
    type: String,
    name: String,
    product: String,
    description: String,
    chain_step: Number,
    reporter: {
        user: String,
        timestamp: Date
    }
});

export default {
    schema: incidentSchema,
    name: "Incident"
};