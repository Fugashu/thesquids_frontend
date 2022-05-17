import * as React from "react";
import style from "./Bridge.module.scss";
import { svgIcons } from "../../../assets/svg/svgIcons";
import btn from "../../../assets/png/buttons/staking page button/desktop.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { CojodiNetworkSwitcher } from "../BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../BackendCalls/chainRpcData";
import imgSwitchEth from "../../../assets/png/buttons/staking page button/switchToEthereum.png";
import imgSwitchPoly from "../../../assets/png/buttons/staking page button/switchToPolygon.png";

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
  waitForTransactionWithModal,
} from "../MetamaskConnection/MetamaskWallet";
import imgDefault from "../../../assets/png/buttons/staking page button/default.png";
import imgClick from "../../../assets/png/buttons/staking page button/click.png";
import imgHover from "../../../assets/png/buttons/staking page button/click.png";
import { ButtonCustom } from "../../../components2/common/ButtonCustom/ButtonCustom";
import { getImageUrlForTokenId } from "../BackendCalls/BackendCalls";
import {
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
} from "../../../store/appSlice";
import { useAppDispatch } from "../../../store/hooks";

export const BridgePage = () => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [isConnectedToEth, setIsConnectedToEth] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(async () => {
    await connectWallet();
    await fetchNFTs();
  }, []);

  async function deposit(id) {
    console.log(`trying to deposit token with id:${id}`);
    await setApprovalForAll(mintingContract, goerliBridgeContractAddress);
    let tx = await goerliBridgeContract.deposit([id]);
    await waitForTransactionWithModal(tx);
    await fetchNFTs();
  }

  async function withdraw(id) {
    console.log(`trying to withdraw token with id:${id}`);
    await setApprovalForAll(mumbaiNFTContract, mumbaiBridgeContractAddress);
    let tx = await mumbaiBridgeContract.withdraw([id]);
    await waitForTransactionWithModal(tx);
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
      setIsConnectedToEth(true);
    }

    //todo 1 to 2000
    for (let i = 1; i <= maxSupply; ++i) {
      let ownerAddr = await rootContract.ownerOf(i);
      console.log(i);
      if (ownerAddr === signerAddr) {
        const nft = {
          id: i,
          image: getImageUrlForTokenId(i),
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
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <ButtonCustom
            className={isConnectedToEth ? null : style.trans}
            onClick={() =>
              CojodiNetworkSwitcher.switchToChain(chainRpcData.eth_mainnet)
            }
            widthMobile={136}
            heightMobile={50}
            widthDesktop={136}
            heightDesktop={50}
            imgMobileDefault={imgSwitchEth}
            imgMobileClick={imgSwitchEth}
            imgDesktopDefault={imgSwitchEth}
            imgDesktopHover={imgSwitchEth}
            imgDesktopClick={imgSwitchEth}
          />

          <ButtonCustom
            className={isConnectedToEth ? style.trans : null}
            onClick={() =>
              CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai)
            }
            widthMobile={136}
            heightMobile={50}
            widthDesktop={136}
            heightDesktop={50}
            imgMobileDefault={imgSwitchPoly}
            imgMobileClick={imgSwitchPoly}
            imgDesktopDefault={imgSwitchPoly}
            imgDesktopHover={imgSwitchPoly}
            imgDesktopClick={imgSwitchPoly}
          />
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
