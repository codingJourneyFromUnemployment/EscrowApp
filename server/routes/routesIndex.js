const express = require('express');
const router = express.Router();
const { getEscrowContracts, getEscrowContract, createEscrowContract } = require('../controllers/controller');

router.route('/').get(getEscrowContracts).post(createEscrowContract);
router.route('/:address').get(getEscrowContract);
module.exports = router;