import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    company: String,
    address: {
        street: String,
        number: String,
        city: String,
        zip_code: String,
        country: String,
        format: String
    },
    type: String,
    access_lvl: Number
});

export default {
    schema: userSchema,
    name: "User"
};