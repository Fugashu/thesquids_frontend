import * as React from "react";

import style from "./StakingPage.module.scss";
import { svgIcons } from "../../assets/svg/svgIcons";

import btn from "../../assets/png/buttons/staking page button/desktop.png";

import { useEffect, useState } from "react";
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiNFTContract,
  mumbaiTournamentContract,
  waitForTransactionWithModal,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { CojodiNetworkSwitcher } from "../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../components/cojodi/BackendCalls/chainRpcData";
import { mumbaiTournamentContractAddress } from "../../components/cojodi/ContractConfig";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";
import imgDefault from "../../assets/png/buttons/staking page button/default.png";
import imgClick from "../../assets/png/buttons/staking page button/click.png";
import imgHover from "../../assets/png/buttons/staking page button/click.png";
import {
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
} from "../../store/appSlice";
import { useAppDispatch } from "../../store/hooks";
import {
  displayPopUpModal,
  EPopUpModal,
  getImageUrlForTokenId,
} from "../../components/cojodi/BackendCalls/BackendCalls";
import { PRODUCTION } from "../../constants";

export const StakingPage = () => {
  const [stakedCount, setStakedCount] = useState(0);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(async () => {
    await connectWallet();
    if (PRODUCTION) {
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.matic);
    }
    await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
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
    await waitForTransactionWithModal(tx);
  }
  async function stake(id) {
    console.log(`trying to stake token with id:${id}`);
    await setApprovalForAll();
    try {
      let tx = await mumbaiTournamentContract.stake([id]);
      await waitForTransactionWithModal(tx);
      await fetchNFTs();
    } catch (e) {
      displayPopUpModal(
        EPopUpModal.Error,
        `Error while trying to stake token ${id}.`
      );
    }
  }

  async function unstake(id) {
    console.log(`trying to unstake token with id:${id}`);
    await setApprovalForAll();
    try {
      let tx = await mumbaiTournamentContract.unstake([id]);
      await waitForTransactionWithModal(tx);
      await fetchNFTs();
    } catch (e) {
      displayPopUpModal(
        EPopUpModal.Error,
        `Error while trying to unstake token ${id}. Wrong tournament phase.`
      );
    }
  }

  async function fetchNFTs() {
    if (PRODUCTION) {
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.matic);
    }
    await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
    setOwnedNFTs([]);
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
    console.log(stakedTokenIds);

    for (const element of stakedTokenIds) {
      const nft = {
        id: element,
        image: await getImageUrlForTokenId(element),
        isStaked: true,
      };
      setOwnedNFTs((old) => [...old, nft]);
    }

    let endOfLoop = await mumbaiNFTContract.balanceOf(
      await getConnectedSignerAddress()
    );

    for (let i = 0; i < endOfLoop; ++i) {
      let tokenId = await mumbaiNFTContract.tokenOfOwnerByIndex(
        await getConnectedSignerAddress(),
        i
      );
      console.log("owner of " + tokenId);

      const nft = {
        id: tokenId,
        image: await getImageUrlForTokenId(tokenId),
        isStaked: false,
      };
      setOwnedNFTs((old) => [...old, nft]);
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
                <img src={nft["image"]} alt="" className={style.nftGif} />
                <div className={style.buttons}>
                  {nft.isStaked ? (
                    <ButtonCustom
                      className={style.btnStaking}
                      onClick={() => unstake(nft["id"])}
                      widthMobile={139}
                      heightMobile={40}
                      widthDesktop={139}
                      heightDesktop={40}
                      imgMobileDefault={imgDefault}
                      imgMobileClick={imgClick}
                      imgDesktopDefault={imgDefault}
                      imgDesktopHover={imgHover}
                      imgDesktopClick={imgClick}
                    >
                      <p>Unstake</p>
                    </ButtonCustom>
                  ) : (
                    <ButtonCustom
                      className={style.btnStaking}
                      onClick={() => stake(nft["id"])}
                      widthMobile={139}
                      heightMobile={40}
                      widthDesktop={139}
                      heightDesktop={40}
                      imgMobileDefault={imgDefault}
                      imgMobileClick={imgClick}
                      imgDesktopDefault={imgDefault}
                      imgDesktopHover={imgHover}
                      imgDesktopClick={imgClick}
                    >
                      <p>Stake</p>
                    </ButtonCustom>
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
