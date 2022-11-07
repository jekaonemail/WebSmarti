const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    clientName: {
        type: String,
        required: true
    },

    clientPhone: {
        type: String,
        required: true,
        unique: true
    },

    clientEmail: {
        type: String,
        unique: true
    },

    clientType: {
        type: String
    },

    isWait: {
        type: Boolean,
        default: true
    },

    inWork: {
        type: Boolean,
        default: false
    },

    isFinish: {
        type: Boolean,
        default: false
    },

    isNew: {
        type: Boolean,
        default: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);