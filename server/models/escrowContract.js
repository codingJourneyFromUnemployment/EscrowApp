const mongoose = require('mongoose');
const escrowContractSchema = mongoose.Schema({
    contractAddress: {
        type: String,
        required: true,
    },
    depositor: {
        type: String,
        required: true,
    },
    beneficiary: {
        type: String,
        required: true,
    },
    arbiter: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    network: {
        type: String,
        required: true,
    },
    beenApproved: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = mongoose.model('escrowContract', escrowContractSchema, 'escrowContract');