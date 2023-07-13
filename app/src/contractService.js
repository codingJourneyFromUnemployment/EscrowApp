import deploy from './deploy';
import { ethers } from 'ethers';
import axios from 'axios'

async function approve(escrowContract, signer) {
    const approveTxn = await escrowContract.connect(signer).approve();
    await approveTxn.wait();
  }

const provider = new ethers.providers.Web3Provider(window.ethereum);

async function newContract(arbiter, beneficiary, value) {
    const signer = provider.getSigner();
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    const contractAddress = escrowContract.address;
    const depositor = await signer.getAddress();
    const networkName = (await provider.getNetwork()).name;
    const amount = Number(value);
    const payLoad = {
        contractAddress,
        depositor,
        beneficiary,
        arbiter,
        amount,
        network: networkName,
    };
    await axios.post('http://localhost:5000/api', payLoad);

    const handleApprove = async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(contractAddress).className = 'complete';
          document.getElementById(contractAddress).innerText = "✓ It's been approved!";
        });
    
        await approve(escrowContract, signer);
      };

    return {
        address: contractAddress,
        arbiter,
        beneficiary,
        value: amount.toString(),
        handleApprove,
    };
}

export default newContract;