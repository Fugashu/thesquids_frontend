import React from "react";
import { ethers } from "ethers";
import { CojodiNetworkSwitcher } from "./CojodiNetworkSwitcher";
import chainRpcData from "./chainRpcData";
import rpcData from "./chainRpcData";
import { mumbaiTokenContract } from "../MetamaskConnection/MetamaskWallet";
import { mumbaiTournamentContractAddress } from "../ContractConfig";
import { buyDNA, buyLives } from "./BackendCalls";
declare var window: any;
var signer: ethers.Signer;

const BackendCallsInterface = () => {
  const register = async () => {
    await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);

    await mumbaiTokenContract.approve(mumbaiTournamentContractAddress, 2);

    /**/
  };

  const claim = async () => {
    //nfts im besitz anzeigen, auswaehlbar machen
  };

  return (
    <div>
      <button
        onClick={() => CojodiNetworkSwitcher.switchToChain(chainRpcData.matic)}
      >
        SwitchToPolygon
      </button>
      <button
        onClick={() =>
          CojodiNetworkSwitcher.switchToChain(chainRpcData.eth_mainnet)
        }
      >
        SwitchToEthereum
      </button>
      <button
        onClick={() =>
          CojodiNetworkSwitcher.switchToChain(chainRpcData.ropsten)
        }
      >
        SwitchToRopsten
      </button>
      <button
        onClick={() =>
          CojodiNetworkSwitcher.switchToChain(chainRpcData.rinkeby)
        }
      >
        SwitchToRinkeby
      </button>
      <button
        onClick={() => CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai)}
      >
        SwitchToMumbai
      </button>

      <button onClick={register}>Register</button>
      <button onClick={async () => buyDNA}>Buy DNA</button>

      <button onClick={async () => buyLives}>Buy Lives</button>
      <button onClick={claim}>Claim</button>
    </div>
  );
};

export default BackendCallsInterface;
