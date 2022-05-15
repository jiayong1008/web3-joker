require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/NgKJQV-DnOnf5DGapm89E6R7-yrbJfSB',
      // test account with ropsten eth only
      accounts: ['7c9bb4cc5e08c2e8c289e98d9951cd69ceac76ec1ec63d257ad490d43c21b308'],
      // gasPrice: 8000000000,
    },
  },
};
