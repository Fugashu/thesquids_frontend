import * as React from "react";

import style from "./Bridge.module.scss";
import { svgIcons } from "../../../assets/svg/svgIcons";

import btn from "../../../assets/png/buttons/staking page button/desktop.png";

import { useEffect, useState } from "react";

import {
  connectWallet,
  getConnectedSignerAddress,
  getCurrentChainId,
  mumbaiNFTContract,
  mumbaiTournamentContract,
  mintingContract,
} from "../MetamaskConnection/MetamaskWallet";
import axios from "axios";
import { CojodiNetworkSwitcher } from "../BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../BackendCalls/chainRpcData";
import { mumbaiTournamentContractAddress } from "../ContractConfig";

export const BridgePage = () => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  useEffect(async () => {
    await connectWallet();
    await fetchNFTs();
  }, []);

  async function setApprovalForAll() {
    let isAlreadyApproved = await mumbaiNFTContract.isApprovedForAll(
      await getConnectedSignerAddress(),
      mumbaiTournamentContractAddress
    );

    if (isAlreadyApproved) {
      return;
    }
    let tx = await mumbaiNFTContract.setApprovalForAll(
      mumbaiTournamentContractAddress,
      true
    );

    await tx.wait();
  }
  async function deposit(id) {
    //todo deposit
    console.log(`trying to stake token with id:${id}`);
    await setApprovalForAll();
    let tx = await mumbaiTournamentContract.stake([id]);
    await tx.wait();
    await fetchNFTs();
  }

  async function withdraw(id) {
    //todo withdraw
    console.log(`trying to unstake token with id:${id}`);
    await setApprovalForAll();
    let tx = await mumbaiTournamentContract.unstake([id]);
    await tx.wait();
    await fetchNFTs();
  }

  async function fetchETHNfts() {
    let signerAddr = await getConnectedSignerAddress();
    console.log("connected signer " + signerAddr);

    //todo 1 to 2000
    for (let i = 1; i <= 20; ++i) {
      let ownerAddr = await mintingContract.ownerOf(i);
      console.log(i);
      if (ownerAddr === signerAddr) {
        console.log("owner of " + i);
        let imageSrc = "undefined";
        imageSrc = await mintingContract.tokenURI(i);
        console.log(imageSrc);

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
          chain: "eth",
        };
        setOwnedNFTs((old) => [...old, nft]);
      }
    }
  }

  async function fetchNFTs() {
    setOwnedNFTs([]);
    //we are in eth
    if ((await getCurrentChainId()).chainId === 4) {
      await fetchETHNfts();
      return;
    }

    let signerAddr = await getConnectedSignerAddress();
    console.log("connected signer " + signerAddr);

    //todo 1 to 2000
    for (let i = 1; i <= 20; ++i) {
      let ownerAddr = await mumbaiNFTContract.ownerOf(i);
      console.log(i);
      if (ownerAddr === signerAddr) {
        console.log("owner of " + i);
        let imageSrc = "undefined";
        imageSrc = await mumbaiNFTContract.tokenURI(i);

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
          chain: "poly",
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
              CojodiNetworkSwitcher.switchToChain(chainRpcData.rinkeby)
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
