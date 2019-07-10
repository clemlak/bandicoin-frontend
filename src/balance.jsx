import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';

import Web3Context from './web3Context';

const Title = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
`;

const Amount = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #9c88ff;
`;

function Balance() {
  const {
    web3,
    bandicoin,
    address,
  } = useContext(Web3Context);

  const [bndiBalance, setBndiBalance] = useState('0');

  useEffect(() => {
    if (address) {
      bandicoin.methods.balanceOf(address).call()
        .then((amount) => {
          setBndiBalance(web3.utils.fromWei(amount.toString()));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [address]);

  return (
    <>
      <Title>
        You have
      </Title>
      <Amount>
        {`${bndiBalance} BNDI`}
      </Amount>
    </>
  );
}

export default Balance;
