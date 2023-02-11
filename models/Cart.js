"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: {
                type: String
            },
            size: {
                type: String
            },
            color: {
                type: String
            },
            quantity: {
                type: Number,
                "default": 1
            },
            img: {
                type: String
            },
            price: {
                type: Number
            }
        }
    ]
}, { timestamps: true });
module.exports = mongoose.model("Cart", CartSchema);
