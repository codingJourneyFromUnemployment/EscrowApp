import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Escrow from './Escrow';
import axios from 'axios';
import { newContract, rebuildContract, approve } from './contractService';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  useEffect(() => {
    async function getExistingContracts() {
      const res = await axios.get('http://localhost:5000/api');
      console.log(res.data);
      
      const contracts = res.data.map(async (contractData) => {
        return {
          address: contractData.contractAddress,
          arbiter: contractData.arbiter,
          beneficiary: contractData.beneficiary,
          value: contractData.amount,
          beenApproved: contractData.beenApproved,

          handleApprove: async () => {
            const escrowContract = await rebuildContract(contractData.contractAddress);
            escrowContract.on('Approved', () => {
              document.getElementById(contractData.contractAddress).className = 'complete';
              document.getElementById(contractData.contractAddress).innerText = "✓ It's been approved!";
            });
            try {
              const payLoad = {
                contractAddress: contractData.contractAddress,
                beenApproved: true,
              };
              const res = await axios.put('http://localhost:5000/api', payLoad);
              console.log(`contract ${contractData.contractAddress} has been approved`);
              console.log(res.data);
              await approve(escrowContract, signer);
            } catch (err) {
              console.log(err);
            }
          },
        };
      });

      const contractsArray = await Promise.all(contracts);

      setEscrows(contractsArray);
    }

    getExistingContracts();
  }, [signer]);

  async function createNewContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = document.getElementById('eth').value;

    const newEscrow = await newContract(arbiter, beneficiary, value);
    setEscrows([...escrows, newEscrow]);
  }

  return (
    <>
      <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in eth)
          <input type="text" id="eth" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            createNewContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
