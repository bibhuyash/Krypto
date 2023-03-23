require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: {
    version: '0.8.18',
    defaultNetwork:'goerli',
    networks:{
      hardhat:{},
      goerli:{
        url:"https://eth-goerli.g.alchemy.com/v2/sMaWeFEMtxT_C-roUz8Vm7LfMnxs8e-0",
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }

    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
