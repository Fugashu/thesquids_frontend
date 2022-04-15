import React from 'react';
import {ethers, Signer} from "ethers";
import {CojodiNetworkSwitcher} from "./CojodiNetworkSwitcher";
import chainRpcData from './chainRpcData'
declare var window:any;
var signer:ethers.Signer;


const BackendCallsInterface = () => {

    const connectWallet = async () =>
    {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner()
        console.log(signer);
        console.log(await signer.getAddress())
    }




    const stake = async () =>
    {
        //nfts im besitz anzeigen, auswaehlbar machen

    }

    const unstake = async () =>
    {
        //nfts im besitz anzeigen, auswaehlbar machen

    }

    const register = async () =>
    {
        //nfts im besitz anzeigen, auswaehlbar machen


    }

    const buyLives = async () =>
    {
        //nfts im besitz anzeigen, auswaehlbar machen


    }

    const claim = async () =>
    {
        //nfts im besitz anzeigen, auswaehlbar machen


    }

    return (
        <div>
            <button onClick={connectWallet}>ConnectWallet</button>
            <button onClick={()=>CojodiNetworkSwitcher.switchToChain(chainRpcData.matic)}>SwitchToPolygon</button>
            <button onClick={()=>CojodiNetworkSwitcher.switchToChain(chainRpcData.eth_mainnet)}>SwitchToEthereum</button>
            <button onClick={()=>CojodiNetworkSwitcher.switchToChain(chainRpcData.ropsten)}>SwitchToRopsten</button>
            <button onClick={()=>CojodiNetworkSwitcher.switchToChain(chainRpcData.rinkeby)}>SwitchToRinkeby</button>
            <button onClick={()=>CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai)}>SwitchToMumbai</button>

            <button onClick={stake}>Stake</button>
            <button onClick={stake}>Unstake</button>
            <button onClick={stake}>Register</button>
            <button onClick={stake}>Buy Lives</button>
            <button onClick={stake}>Claim</button>


        </div>
    );
};

export default BackendCallsInterface;


