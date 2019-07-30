import React from 'react';
import styled from 'styled-components';
import {
  Flex,
  Box,
} from '@rebass/grid';

const Hero = styled(Box)`
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
`;

function Home() {
  return (
    <>
      <Flex>
        <Box width={1}>
          <Title>
            BANDICOIN
          </Title>
        </Box>
      </Flex>
      <Flex>
        <Box width={1}>
          <Subtitle>
            Criminal record
          </Subtitle>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
