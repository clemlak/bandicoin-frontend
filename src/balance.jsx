import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';

import Web3Context from './web3Context';

const Wrapper = styled.div`
  padding: 20px;
`;

const Amount = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #9c88ff;
`;

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  background-color: #9c88ff;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
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
    <Wrapper>
      <Amount>
        {`You have ${bndiBalance} BNDI`}
      </Amount>
      <Button type="button" onClick={() => moneyMoneyMoney()}>
        Get test tokens
      </Button>
    </Wrapper>
  );
}

export default Balance;
