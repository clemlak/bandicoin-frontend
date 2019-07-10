import React, {
  useState,
  useEffect,
} from 'react';
import Web3 from 'web3';

import App from './App';
import Web3Context from './web3Context';

import {
  contractAbi,
  contractAddress,
} from './contracts/bandicoin';

function Web3Wrapper() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const [bandicoin, setBandicoin] = useState();

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        try {
          await window.ethereum.enable();
          setWeb3(new Web3(window.web3.currentProvider));
        } catch (e) {
          console.log(e);
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        setWeb3(new Web3(window.web3.currentProvider));
      }
    }

    loadWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts()
        .then((accounts) => {
          setAddress(accounts[0]);
        })
        .catch((err) => {
          console.log(err);
        });

      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      setBandicoin(contract);
    }
  }, [web3]);

  return (
    <Web3Context.Provider value={{
      web3,
      address,
      bandicoin,
    }}
    >
      <App />
    </Web3Context.Provider>
  );
}


export default Web3Wrapper;
