import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    common_name: { type: String, default: "" },
    form: String,
    strength: String,
    drug_code: String,
    pack_size: Number,
    pack_type: { type: String, default: "" },
    serial_number: String,
    reimbursement_number: { type: String, default: "" },
    batch_number: String,
    expiry_date: Date,
    coding: { type: String, default: "" },
    marketed_region: String,
    reported: Boolean,
    used: Boolean,
    sellers: Array,
    manufacturers: Array,
    supply_chain: Array
});

export default {
    schema: productSchema,
    name: "Product"
};