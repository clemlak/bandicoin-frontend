import React, {
  useContext,
} from 'react';
import styled from 'styled-components';

import Web3Context from './web3Context';

import History from './history';
import Balance from './balance';
import Transfer from './transfer';

import {
  shortenAddress,
} from './utils/formatting';

const Title = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  font-size: 36px;
`;

function App() {
  const {
    web3,
    address,
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

  return (
    <>
      <Title>
        {`Hello ${address ? shortenAddress(address) : '...'}`}
      </Title>
      <Balance />
      <Transfer />
      <History />
    </>
  );
}

export default App;
