const asyncHandler = require('express-async-handler');
const express = require('express');
const {default : mongoose} = require('mongoose');
const escrowContract = require('../models/escrowContract');

//@desc Get escrow contracts
//@route GET /api/escrow
//@access Public
const getEscrowContracts = asyncHandler(async (req, res) => {
    const escrowContracts = await escrowContract.find({});
    if (!escrowContracts) {
        res.status(404);
        console.log('No escrow contracts found');
        throw new Error('No escrow contracts found');
    } else {
        res.status(200).json(escrowContracts);
    }
});

//@desc Get escrow contract by contract address
//@route GET /api/escrow/:address
//@access Public
const getEscrowContract = asyncHandler(async (req, res) => {
});

//@desc Create escrow contract
//@route POST /api/escrow
//@access Public
const createEscrowContract = asyncHandler(async (req, res) => {

});