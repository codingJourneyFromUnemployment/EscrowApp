const express = require('express');
const router = express.Router();
const { getEscrowContracts, getEscrowContract, createEscrowContract, putEscrowContract } = require('../controllers/controller');

router.route('/').get(getEscrowContracts).post(createEscrowContract).put(putEscrowContract);
router.route('/:address').get(getEscrowContract);
module.exports = router;