export const CojodiNetworkSwitcher = {
  switchToChain: async (chainprops: any) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainprops.chainId }],
      });
    } catch (switchError: any) {
        try {
          console.log('error')
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainprops.chainId,
                chainName: chainprops.chainName,
                rpcUrls: chainprops.rpcUrls,
                nativeCurrency: {
                  name: chainprops.currencyName,
                  symbol: chainprops.symbol,
                  decimals: chainprops.decimals,
                },
                blockExplorerUrls: chainprops.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          console.log("Chain switch failed:" + addError);
        }
      console.log("Error during chain switch.");

      return;

    }
  },
};
