import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Escrow from './Escrow';
import axios from 'axios';
import newContract from './contractService';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [network, setNetwork] = useState();
  const [existingContracts, setExistingContracts] = useState([]);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
      setNetwork(await provider.getNetwork());
    }

    getAccounts();
  }, [account]);

  useEffect(() => {
    async function getExistingContracts() {
      const res = await axios.get('http://localhost:5000/api');
      console.log(res.data);
      setExistingContracts(res.data);
    }

    getExistingContracts();
  }, []);

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
