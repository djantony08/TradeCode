import React, { useState } from 'react';
import Web3 from 'web3'; // Import Web3.js or your preferred Ethereum library
import "../Contract/RegORG.sol"; // Import your smart contract ABI and address

const DeployContract = ({ account, central }) => {
  const [contractAddress, setContractAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const web3 = new Web3(window.ethereum); // Initialize Web3.js with the provider

  const showErrorMessage = (error) => {
    setLoading(false);
    alert(`An error occurred while connecting to MetaMask: ${error.message}`);
  };

  const fetchContractAddress = async () => {
    try {
      if (account) {
        const address = await central.getCompanySmartContractAddress(account);
        setContractAddress(address);
      } else {
        throw Error('Please check that you are connected to a wallet');
      }
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const createContract = async () => {
    try {
      if (account) {
        setUpdateStatus('Validate the transaction through your wallet');
        setLoading(true);

        // Initialize your smart contract instance
        const yourContractABI = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "organizationAddress",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "transactionAddress",
                  "type": "address"
                }
              ],
              "name": "OrganizationRegistered",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "registerOrganization",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "organizationAddress",
                  "type": "address"
                }
              ],
              "name": "getOrganizationTransactionAddress",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "organizations",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "isRegistered",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "transactionAddress",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ];
          const yourContractAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'; 
        const yourContract = new web3.eth.Contract(
            yourContractABI.abi,
            yourContractAddress.address
        );

        // Send a transaction to create a contract
        const transaction = yourContract.methods.createSmartContract().send({
          from: account,
        });

        const receipt = await transaction;

        if (receipt.status === true) {
          // Transaction successful, fetch contract address
          await fetchContractAddress();
          setUpdateStatus('Contract created. Address: ');
        } else {
          throw Error('Transaction failed');
        }
        setLoading(false);
      } else {
        throw Error('Please check that you are connected to a wallet');
      }
    } catch (error) {
      setLoading(false);
      showErrorMessage(error);
    }
  };

  return (
    <div className="DeployContract">
      <button className="button__toggle form__button" onClick={createContract}>
        Register Organization
      </button>
      {loading ? (
        <div>Transaction in progress... It can take a few minutes </div>
      ) : (
        <p>
          {updateStatus}
          {contractAddress}
        </p>
      )}
    </div>
  );
};

export default DeployContract;
