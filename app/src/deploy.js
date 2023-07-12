import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

export default async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  const valueInEth = ethers.utils.parseEther(value);
  return factory.deploy(arbiter, beneficiary, { value: valueInEth });
}

//0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//0xE084C2D6258bf4F6276849a4c2D4582A16135b99