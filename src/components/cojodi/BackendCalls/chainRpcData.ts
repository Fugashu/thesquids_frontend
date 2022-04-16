const rpcData = {
  matic: {
    chainId: "0x89",
    rpcUrls: ["https://rpc-mainnet.matic.network/"],
    chainName: "Matic Mainnet",
    currencyName: "MATIC",
    symbol: "MATIC",
    decimals: 18,
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  mumbai: {
    chainId: "0x13881",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    chainName: "Mumbai Testnet",
    currencyName: "MATIC",
    symbol: "MATIC",
    decimals: 18,
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  ropsten: {
    chainId: "0x03",
  },
  rinkeby: {
    chainId: "0x04",
  },
  eth_mainnet: {
    chainId: "0x01",
  },
};

export default rpcData;
