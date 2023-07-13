import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  const valueInEth = ethers.utils.parseEther(value);
  const escrowContract = await factory.deploy(arbiter, beneficiary, { value: valueInEth });
  await escrowContract.deployTransaction.wait();
  console.log('contract deployed to:', escrowContract.address);
  return escrowContract;
}

export default deploy;
