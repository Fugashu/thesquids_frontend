import React from "react";
import { ethers } from "ethers";
import { CojodiNetworkSwitcher } from "./CojodiNetworkSwitcher";
import chainRpcData from "./chainRpcData";
import rpcData from "./chainRpcData";
import {
  mumbaiTokenContract,
  mumbaiTournamentContract,
} from "../MetamaskConnection/MetamaskWallet";
import { mumbaiTournamentContractAddress } from "../ContractConfig";
declare var window: any;
var signer: ethers.Signer;

const BackendCallsInterface = () => {
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log(signer);
    console.log(await signer.getAddress());
  };

  const register = async () => {
    await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);

    await mumbaiTokenContract.approve(mumbaiTournamentContractAddress, 2);

    /*try {
      let tx = await mumbaiTokenContract.approve(
        mumbaiTournamentContractAddress,
        2
      );
      tx.wait();
    } catch (e) {
      console.log(`Error while approving DNA: ${e}`);
      alert("Error: DNA approval failed.");
    }

    try {
      let tx = await mumbaiTournamentContract.register();
      tx.wait();
    } catch (e) {
      console.log(`Error while registering for tournament: ${e}`);
      alert("Error: Registration failed.");
    }*/
  };

  const buyDNA = async () => {
    /*
    await CojodiNetworkSwitcher.switchToChain(rpcData.mumbai);
    let dnaPrice = await mumbaiTokenContract.price();
    console.log(dnaPrice);
    let overrides = { value: await mintingContract.price() };
    await mintingContract.mintWhitelist(minterProof, overrides);
    //todo wieviel dna will ich kaufen
    let dnaAmount = 1;
    await mumbaiTokenContract.buy();*/
  };

  const buyLives = async () => {
    await CojodiNetworkSwitcher.switchToChain(rpcData.mumbai);
    let lifePrice = await mumbaiTournamentContract.lifeFee();
    console.log(lifePrice);
  };

  const claim = async () => {
    //nfts im besitz anzeigen, auswaehlbar machen
  };

  return (
    <div>
      <button onClick={connectWallet}>ConnectWallet</button>
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
      <button onClick={buyDNA}>Buy DNA</button>

      <button onClick={buyLives}>Buy Lives</button>
      <button onClick={claim}>Claim</button>
    </div>
  );
};

export default BackendCallsInterface;
