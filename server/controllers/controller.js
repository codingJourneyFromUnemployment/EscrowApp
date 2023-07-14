const asyncHandler = require('express-async-handler');
const express = require('express');
const {default : mongoose} = require('mongoose');
const escrowContract = require('../models/escrowContract');
const colors = require('colors');

//@desc Get escrow contracts
//@route GET /api
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
//@route GET /api/:address
//@access Public
const getEscrowContract = asyncHandler(async (req, res) => {
    const escrow = await escrowContract.findOne({contractAddress: req.params.address});
    if (!escrow) {
        res.status(404);
        console.log('No escrow contract found');
        throw new Error('No escrow contract found');
    } else {
        res.status(200).json(escrow);
    }
});

//@desc Create escrow contract
//@route POST /api
//@access Public
const createEscrowContract = asyncHandler(async (req, res) => {
    const contractAdded = await escrowContract.findOne({contractAddress:req.body.contractAddress});
    if (contractAdded) {
        res.status(400).json({
            success: false,
            message: 'Contract already added'
        })
        console.log(`Contract already added: ${req.body.contractAddress}`)
        return
    }
    const createdAt = Date.now()
    const escrowcontract = new escrowContract({
        contractAddress: req.body.contractAddress,
        depositor: req.body.depositor,
        beneficiary: req.body.beneficiary,
        arbiter: req.body.arbiter,
        amount: req.body.amount,
        network: req.body.network,
        beenApproved: req.body.beenApproved,
        createdAt
    });
    await escrowcontract.save();
    res.status(201).json({
        contractAddress: escrowcontract.contractAddress,
        success: true,
    })
    console.log(`Escrow contract created: ${escrowcontract.contractAddress}`)
});


//@desc Put escrow contract
//@route Put /api
//@access Public
const putEscrowContract = asyncHandler(async (req, res) => {
    const contractPut = await escrowContract.findOne({contractAddress:req.body.contractAddress});
    if (!contractPut) {
        res.status(400).json({
            success: false,
            message: 'Contract not found'
        })
        console.log(`Contract not found: ${req.body.contractAddress}`)
        return
    } else {
        contractPut.beenApproved = req.body.beenApproved
        await contractPut.save();
        res.status(201).json({
            contractAddress: contractPut.contractAddress,
            success: true,
        })
        console.log(`Escrow contract approved: ${contractPut.contractAddress}`)
    }
});

module.exports = { getEscrowContracts, getEscrowContract, createEscrowContract, putEscrowContract };