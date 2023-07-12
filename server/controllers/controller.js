const asyncHandler = require('express-async-handler');
const express = require('express');
const {default : mongoose} = require('mongoose');

//@desc Get escrow contracts
//@route GET /api/escrow
//@access Public
const getEscrowContracts = asyncHandler(async (req, res) => {

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