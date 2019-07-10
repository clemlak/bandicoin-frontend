import React, {
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';

import Web3Context from './web3Context';

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
`;

const Amount = styled.input`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
`;

const Recipient = styled.input`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
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

function Transfer() {
  const {
    web3,
    bandicoin,
    address,
  } = useContext(Web3Context);

  const [amountToTransfer, setAmountToTransfer] = useState();
  const [recipient, setRecipient] = useState('');

  function transfer() {
    console.log(`Transfering ${amountToTransfer} to ${recipient}`);

    if (bandicoin) {
      bandicoin.methods.transfer(
        recipient,
        web3.utils.toWei(amountToTransfer.toString()),
      ).send({
        from: address,
      })
        .on('receipt', (receipt) => {
          console.log(receipt);
        })
        .on('error', (error) => {
          console.log(error);
        });
    }
  }

  return (
    <Wrapper>
      <Title>
        Transfer
      </Title>
      <Amount
        value={amountToTransfer}
        onChange={e => setAmountToTransfer(e.target.value)}
        placeholder="Amount"
      />
      <Recipient
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        placeholder="Recipient"
      />
      <Button
        type="button"
        onClick={() => transfer()}
      >
        Transfer
      </Button>
    </Wrapper>
  );
}

export default Transfer;
