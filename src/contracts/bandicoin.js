import BandicoinBuild from './Bandicoin.json';

const contractAbi = BandicoinBuild.abi;
const contractAddress = BandicoinBuild.networks['3'].address;

export {
  contractAbi,
  contractAddress,
};
