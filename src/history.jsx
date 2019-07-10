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
              success: res[i].returnValues.success,
              from: res[i].returnValues.from,
              to: res[i].returnValues.to,
              amount: res[i].returnValues.amount.toString(),
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
              Tx
            </Th>
            <Th>
              Bandit success?
            </Th>
            <Th>
              From
            </Th>
            <Th>
              To
            </Th>
            <Th>
              Amount
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
                {event.success ? '✔️' : '❌'}
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
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default History;
