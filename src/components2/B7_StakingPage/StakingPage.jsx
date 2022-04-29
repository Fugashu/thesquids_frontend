import * as React from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useMoralis } from "react-moralis";
import style from "./StakingPage.module.scss";
import { svgIcons } from "../../assets/svg/svgIcons";
import nftGif from "../../assets/gif/stacking.gif";

import btn from "../../assets/png/buttons/staking page button/desktop.png";

import slide0 from "../../assets/gif/ryu.gif";
import slide1 from "../../assets/gif/sherif.gif";
import slide2 from "../../assets/gif/megaman.gif";
import slide3 from "../../assets/gif/geisha.gif";
import slide4 from "../../assets/gif/female astraunaut.gif";
import slide5 from "../../assets/gif/demon.gif";
import slide6 from "../../assets/gif/tracksuit.gif";
import slide7 from "../../assets/gif/seach.gif";
import slide8 from "../../assets/gif/sorcerer.gif";
import { useEffect, useState } from "react";
import {
  createMintingContract,
  mintingContract,
} from "../../components/cojodi/Minting/Minting";
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiNFTContract,
  mumbaiTournamentContract,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import axios from "axios";
import { CojodiNetworkSwitcher } from "../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../components/cojodi/BackendCalls/chainRpcData";
import { mumbaiTournamentContractAddress } from "../../components/cojodi/ContractConfig";

export const StakingPage = () => {
  const [stakedCount, setStakedCount] = useState(0);
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  useEffect(async () => {
    await connectWallet();
    fetchNFTs();
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
  async function stake(id) {
    //todo stake
    console.log(`trying to stake token with id:${id}`);
    await setApprovalForAll();
    let tx = await mumbaiTournamentContract.stake([id]);
    await tx.wait();
    await fetchNFTs();
  }

  async function unstake(id) {
    //todo unstake
    console.log(`trying to unstake token with id:${id}`);
    await setApprovalForAll();
    let tx = await mumbaiTournamentContract.unstake([id]);
    await tx.wait();
    await fetchNFTs();
  }

  async function fetchNFTs() {
    setOwnedNFTs([]);
    setStakedCount(0);
    await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
    let signerAddr = await getConnectedSignerAddress();
    console.log("connected signer " + signerAddr);
    setStakedCount(
      await mumbaiTournamentContract.stakedBalance(
        await getConnectedSignerAddress()
      )
    );
    let stakedTokenIds = [];
    let stakedTokens = await mumbaiTournamentContract.getStake(
      await getConnectedSignerAddress()
    );
    stakedTokens.forEach((element) =>
      stakedTokenIds.push(parseInt(element._hex))
    );
    //todo 1 to 2000
    for (let i = 18; i < 38; ++i) {
      let ownerAddr = await mumbaiNFTContract.ownerOf(i);
      console.log(i);
      if (ownerAddr === signerAddr || stakedTokenIds.includes(i)) {
        console.log("owner of " + i);
        let imageSrc = "undefined";
        let stakeStatus;
        imageSrc = await mumbaiNFTContract.tokenURI(i);
        stakeStatus = await mumbaiTournamentContract.stakeIndexOf(
          await getConnectedSignerAddress(),
          i
        );

        stakeStatus = stakeStatus.toString();
        console.log("Stake status" + stakeStatus);
        try {
          console.log("test" + imageSrc);
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
          isStaked: stakeStatus,
        };
        setOwnedNFTs((old) => [...old, nft]);
      }
    }
  }

  return (
    <div className={style.stakingPage}>
      <div className={style.inner}>
        <div className={style.titleBlock}>
          <h2 className={style.title}>Staking:</h2>
          <p className={style.count}>{`${stakedCount} staked`}</p>
        </div>
        <div className={style.cards}>
          {ownedNFTs.map((nft) => (
            <div className={style.card} key={nft["id"]}>
              <div className={style.back}>{svgIcons.stackingPageCardBack}</div>
              <div className={style.content}>
                <img src={nft["image"]} alt="" />

                <div className={style.buttons}>
                  {nft.isStaked == "-1" ? (
                    <button onClick={() => stake(nft["id"])}>
                      <img src={btn} alt="" />
                      <p>Stake</p>
                    </button>
                  ) : (
                    <button onClick={() => unstake(nft["id"])}>
                      <img src={btn} alt="" />
                      <p>Unstake</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*        <div className={style.cards}>
          {nfts.map((nft) => (
            <div key={nft} className={style.card}>
              <div className={style.back}>{svgIcons.stackingPageCardBack}</div>
              <div className={style.content}>
                <img
                  src={slides[Math.floor(Math.random() * slides.length)]}
                  alt=""
                />
                <div className={style.buttons}>
                  <button>
                    <img src={btn} alt="" />
                    <p>Stake</p>
                  </button>
                  <button>
                    <img src={btn} alt="" />
                    <p>Unstake</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>*/}
      </div>
    </div>
  );
};
