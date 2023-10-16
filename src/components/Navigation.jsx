import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

function Navigation() {
  const [account, setAccount] = useState(null);

  // Define the connectToWallet function within the component scope
  async function connectToWallet() {
    // Check if Web3 provider (MetaMask) is available
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
        // Handle connection error
      }
    } else {
      console.error(
        "Web3 provider not detected. Please install MetaMask or a compatible wallet extension."
      );
      // Handle wallet not available
    }
  }

  useEffect(() => {
    // Call the connectToWallet function within the useEffect hook
    connectToWallet();
  }, []);

  return (
    <nav className="bg-gray-800 px-4 py-4">
      <a href="/" className="nav__logo">
        TradeCode
      </a>
      <div className="nav__menu">
        <ul className="nav__list grid">
          <li className="nav__item">
            <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="createcontract">
              Register Organization
            </Link>
          </li>
          <li className="nav__item">
            <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="mint">
              Mint Tokens
            </Link>
          </li>
          <li className="nav__item">
            <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="addproduct">
              Add Products
            </Link>
          </li>
          <li className="nav__item">
            <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="verify">
              Verify Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav__account">
        {account ? (
          <button type="button" className="button__toggle">
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </button>
        ) : (
          <button
            type="button"
            className="button__toggle"
            onClick={connectToWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
