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
  font-weight: 700;
`;

const Table = styled.table`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
`;

const Th = styled.td`
  font-weight: 800;
`;

const Amount = styled.span`
  color: ${props => (props.sub ? '#e74c3c' : '#2ecc71')};
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
      <Table>
        <thead>
          <tr>
            <Th>
              Tx
            </Th>
            <Th>
              Sender
            </Th>
            <Th>
              Recipient
            </Th>
            <Th>
              Bandit / Victim
            </Th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.key}>
              <td>
                {shortenAddress(event.key)}
              </td>
              <td>
                {shortenAddress(event.from)}
                <br />
                <Amount sub>
                  {'- '}
                  {web3.utils.fromWei(event.amount)}
                </Amount>
              </td>
              <td>
                {shortenAddress(event.to)}
                <br />
                <Amount>
                  {'+ '}
                  {event.bandit === event.from ? (
                    parseInt(web3.utils.fromWei(event.amount), 10) + parseInt(web3.utils.fromWei(event.stolenAmount), 10)
                  ) : (
                    parseInt(web3.utils.fromWei(event.amount), 10) / 2
                  )}
                </Amount>
              </td>
              <td>
                {event.bandit === event.from ? (
                  shortenAddress(event.victim)
                ) : (
                  shortenAddress(event.bandit)
                )}
                <br />
                {event.bandit === event.from ? (
                  <Amount sub>
                    {'- '}
                    {web3.utils.fromWei(event.stolenAmount)}
                  </Amount>
                ) : (
                  <Amount>
                    {'+ '}
                    {parseInt(web3.utils.fromWei(event.amount), 10) / 2}
                  </Amount>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default History;
