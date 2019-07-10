import React, {
  useContext,
} from 'react';
import styled from 'styled-components';

import Web3Context from './web3Context';

import History from './history';
import Balance from './balance';

import {
  shortenAddress,
} from './utils/formatting';

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  background-color: #9c88ff;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
`;

const Title = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  font-size: 36px;
`;

function App() {
  const {
    web3,
    address,
    bandicoin,
  } = useContext(Web3Context);

  if (!web3) {
    return (
      <div>
        <h1>
          Please install MetaMask
        </h1>
      </div>
    );
  }

  function moneyMoneyMoney() {
    bandicoin.methods.moneyMoneyMoney().send({
      from: address,
    })
      .on('receipt', (receipt) => {
        console.log(receipt);
      })
      .on('error', (e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <Title>
        {`Hello ${address ? shortenAddress(address) : '...'}`}
      </Title>
      <Balance />
      <Button type="button" onClick={() => moneyMoneyMoney()}>
        Get tokens
      </Button>
      <History />
    </div>
  );
}

export default App;
