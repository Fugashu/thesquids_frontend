const rpcData = {
  matic: {
    chainId: "0x89",
    rpcUrls: ["https://matic-mainnet.chainstacklabs.com"],
    chainName: "Matic Mainnet",
    currencyName: "MATIC",
    symbol: "MATIC",
    decimals: 18,
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  mumbai: {
    chainId: "0x13881",
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    chainName: "Mumbai Testnet",
    currencyName: "MATIC",
    symbol: "MATIC",
    decimals: 18,
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  ropsten: {
    chainId: "0x3",
  },
  rinkeby: {
    chainId: "0x4",
  },
  goerli: {
    chainId: "0x5",
  },
  eth_mainnet: {
    chainId: "0x1",
  },
};

export default rpcData;
