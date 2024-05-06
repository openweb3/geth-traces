import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// 0xf0ac7640c1ea93837898c427092e35c2374bd1442e85d64bc76351e6937c5ddf 
// 0x990d24fBB60c16584fB4f204F64417C6F1bf58D5

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: 'holesky',
  networks: {
    holesky: {
        chainId: 17000,
        url: 'https://rpc.holesky.ethpandaops.io',
        accounts: ['0xf0ac7640c1ea93837898c427092e35c2374bd1442e85d64bc76351e6937c5ddf']
    }
  }
};

export default config;
