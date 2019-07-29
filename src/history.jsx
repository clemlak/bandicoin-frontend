import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import Web3Context from './web3Context';

import {
  shortenAddress,
} from './utils/formatting';

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
`;

const Td = styled.td`
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`;

const Th = styled.td`
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
`;

function History() {
  const {
    web3,
    bandicoin,
  } = useContext(Web3Context);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (bandicoin) {
      bandicoin.getPastEvents('StolenFunds', {
        fromBlock: 0,
      })
        .then((res) => {
          const newEvents = [];

          for (let i = 0; i < res.length; i += 1) {
            newEvents.push({
              key: res[i].transactionHash,
              from: res[i].returnValues.from,
              to: res[i].returnValues.to,
              amount: res[i].returnValues.amount.toString(),
              bandit: res[i].returnValues.bandit,
              victim: res[i].returnValues.victim,
              stolenAmount: res[i].returnValues.stolenAmount.toString(),
            });
          }

          setEvents(newEvents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [bandicoin]);

  return (
    <Wrapper>
      <Title>
        History
      </Title>
      <table>
        <thead>
          <tr>
            <Th>
              <span role="img" aria-label="Tx">🧾</span>
              {' '}
              Tx
            </Th>
            <Th>
              <span role="img" aria-label="Tx">📤</span>
              {' '}
              Sender
            </Th>
            <Th>
              <span role="img" aria-label="Tx">📥</span>
              {' '}
              Recipient
            </Th>
            <Th>
              <span role="img" aria-label="Tx">💵</span>
              {' '}
              Amount
            </Th>
            <Th>
              <span role="img" aria-label="Tx">🦹‍</span>
              {' '}
              Bandit
            </Th>
            <Th>
              <span role="img" aria-label="Tx">🤦🏽</span>
              {' '}
              Victim
            </Th>
            <Th>
              <span role="img" aria-label="Tx">💰</span>
              {' '}
              Stolen amount
            </Th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.key}>
              <Td>
                {shortenAddress(event.key)}
              </Td>
              <Td>
                {shortenAddress(event.from)}
              </Td>
              <Td>
                {shortenAddress(event.to)}
              </Td>
              <Td>
                {web3.utils.fromWei(event.amount)}
              </Td>
              <Td>
                {shortenAddress(event.bandit)}
              </Td>
              <Td>
                {shortenAddress(event.victim)}
              </Td>
              <Td>
                {web3.utils.fromWei(event.stolenAmount)}
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default History;
