import * as React from "react";
import style from "./Bridge.module.scss";
import { svgIcons } from "../../../assets/svg/svgIcons";
import btn from "../../../assets/png/buttons/staking page button/desktop.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { CojodiNetworkSwitcher } from "../BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../BackendCalls/chainRpcData";
import {
  goerliBridgeContractAddress,
  maxSupply,
  mumbaiBridgeContractAddress,
} from "../ContractConfig";
import {
  connectWallet,
  getConnectedSignerAddress,
  getCurrentChainId,
  setApprovalForAll,
  mumbaiNFTContract,
  mintingContract,
  goerliBridgeContract,
  mumbaiBridgeContract,
} from "../MetamaskConnection/MetamaskWallet";
import BackendCallsInterface from "../BackendCalls/BackendCallsInterface";

export const BridgePage = () => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  useEffect(async () => {
    await connectWallet();
    await fetchNFTs();
  }, []);

  async function deposit(id) {
    //todo deposit
    console.log(`trying to deposit token with id:${id}`);
    await setApprovalForAll(mintingContract, goerliBridgeContractAddress);
    let tx = await goerliBridgeContract.deposit([id]);
    await tx.wait();
    await fetchNFTs();
  }

  async function withdraw(id) {
    //todo withdraw
    console.log(`trying to withdraw token with id:${id}`);
    await setApprovalForAll(mumbaiNFTContract, mumbaiBridgeContractAddress);
    let tx = await mumbaiBridgeContract.withdraw([id]);
    await tx.wait();
    await fetchNFTs();
  }

  async function fetchNFTs() {
    setOwnedNFTs([]);
    let currentChainId = (await getCurrentChainId()).chainId;
    let signerAddr = await getConnectedSignerAddress();
    let rootContract = mumbaiNFTContract;
    let chainString = "matic";

    //we are in eth
    if (currentChainId === 1 || currentChainId === 4) {
      console.log("we are in eth");
      rootContract = mintingContract;
      chainString = "eth";
    }

    //todo 1 to 2000
    for (let i = 1; i <= maxSupply; ++i) {
      let ownerAddr = await rootContract.ownerOf(i);
      console.log(i);
      if (ownerAddr === signerAddr) {
        console.log("owner of " + i);
        let imageSrc = await rootContract.tokenURI(i);

        try {
          imageSrc = imageSrc.split("ipfs://");
          imageSrc = "https://infura-ipfs.io/ipfs/" + imageSrc[1];
          console.log(imageSrc);

          imageSrc = await axios.get(imageSrc).then((response) => {
            let imgLink = response.data.image;
            imgLink = imgLink.split("ipfs://");
            imgLink = "https://infura-ipfs.io/ipfs/" + imgLink[1];
            console.log(imgLink);
            return imgLink;
          });
        } catch (e) {
          console.log("Error while fetching token URI");
        }

        const nft = {
          id: i,
          image: imageSrc,
          chain: chainString,
        };
        setOwnedNFTs((old) => [...old, nft]);
      }
    }
  }

  return (
    <div className={style.stakingPage}>
      <div className={style.inner}>
        <div className={style.titleBlock}>
          <h2 className={style.title}>Bridge:</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() =>
              CojodiNetworkSwitcher.switchToChain(chainRpcData.eth_mainnet)
            }
          >
            <p style={{ color: "red" }}>Switch To Ethereum</p>
          </button>
          <button
            onClick={() =>
              CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai)
            }
          >
            <p style={{ color: "red" }}>Switch To Polygon</p>
          </button>
        </div>
        <div className={style.cards}>
          {ownedNFTs.map((nft) => (
            <div className={style.card} key={nft["id"]}>
              <div className={style.back}>{svgIcons.stackingPageCardBack}</div>
              <div className={style.content}>
                <img src={nft["image"]} alt="" />

                <div className={style.buttons}>
                  {nft.chain === "eth" ? (
                    <button onClick={() => deposit(nft["id"])}>
                      <img src={btn} alt="" />
                      <p>Deposit</p>
                    </button>
                  ) : (
                    <button onClick={() => withdraw(nft["id"])}>
                      <img src={btn} alt="" />
                      <p>Withdraw</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
