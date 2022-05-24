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
  mintingContractAddress,
  mumbaiBridgeContractAddress,
  mumbaiNFTContractAddress,
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
import {
  displayPopUpModal,
  EPopUpModal,
  fetchUserNFTs,
  getImageUrlForTokenId,
} from "../BackendCalls/BackendCalls";

import { useAppDispatch } from "../../../store/hooks";
import { ethers, Wallet } from "ethers";
import { PRODUCTION } from "../../../constants";
const matic = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
const { FxPortalClient } = require("@fxportal/maticjs-fxportal");

export const BridgePage = () => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [isConnectedToEth, setIsConnectedToEth] = useState(false);
  const [txHashValue, setTxHashValue] = useState("");
  const dispatch = useAppDispatch();
  useEffect(async () => {
    await connectWallet();
    await fetchNFTs();
  }, []);

  async function deposit(id) {
    console.log(`trying to deposit token with id:${id}`);
    await setApprovalForAll(mintingContract, goerliBridgeContractAddress);
    let tx = await goerliBridgeContract.deposit(mintingContractAddress, [id]);
    await waitForTransactionWithModal(tx);
    await fetchNFTs();
  }

  async function withdraw(id) {
    console.log(`trying to withdraw token with id:${id}`);
    await setApprovalForAll(mumbaiNFTContract, mumbaiBridgeContractAddress);
    let tx = await mumbaiBridgeContract.withdraw(mumbaiNFTContractAddress, [
      id,
    ]);
    downloadTxHashFile(tx.hash);
    await waitForTransactionWithModal(tx);
    await fetchNFTs();
  }
  const downloadTxHashFile = (txHash) => {
    const element = document.createElement("a");
    const file = new Blob([txHash], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "TransactionHash.txt";
    document.body.appendChild(element);
    element.click();
  };

  async function getNFTsOnETH() {
    let ownedTokenIds = await fetchUserNFTs(await getConnectedSignerAddress());

    console.log(ownedTokenIds);

    for (const tokenId of ownedTokenIds) {
      console.log(tokenId);
      const nft = {
        id: tokenId,
        image: await getImageUrlForTokenId(tokenId),
        chain: "eth",
      };
      setOwnedNFTs((old) => [...old, nft]);
    }
  }
  async function fetchNFTs() {
    setOwnedNFTs([]);
    let currentChainId = (await getCurrentChainId()).chainId;
    let rootContract = mumbaiNFTContract;
    let chainString = "matic";

    //we are on eth
    if (currentChainId === 1 || currentChainId === 4 || currentChainId === 5) {
      setIsConnectedToEth(true);
      await getNFTsOnETH();
      return;
    }

    //we are on polygon
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

  async function claimWithdrawal(txHash) {
    console.log(`trying to claim withdrawal for tx ${txHash}`);

    console.log(window.ethereum);
    matic.use(Web3ClientPlugin);
    matic.setProofApi("https://apis.matic.network/");
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let childProvider, parentProvider;
    parentProvider = new ethers.providers.JsonRpcProvider(
      "https://rpc.goerli.mudit.blog/"
    );
    childProvider = new ethers.providers.JsonRpcProvider(
      "https://matic-mumbai.chainstacklabs.com"
    );

    //const type = 'mainnet';
    //const version = "polygon";
    const type = "testnet";
    const version = "mumbai";

    const client = new FxPortalClient();
    await client.init({
      log: true,
      network: type,
      version: version,
      parent: {
        provider: new ethers.Wallet(
          "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
          parentProvider
        ),
        defaultConfig: {
          from: await getConnectedSignerAddress(),
        },
      },
      child: {
        provider: new ethers.Wallet(
          "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
          childProvider
        ),
        defaultConfig: {
          from: await getConnectedSignerAddress(),
        },
      },
    });

    console.log(txHash);

    let topic =
      "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036";
    try {
      const proof = await client.exitUtil.buildPayloadForExit(
        txHash,
        topic,
        false
      );
      let tx = await goerliBridgeContract.receiveMessage(proof);
      await waitForTransactionWithModal(tx);
    } catch (error) {
      console.log(error);
      displayPopUpModal(
        EPopUpModal.Error,
        "Invalid hash or hash has not been checkpointed yet."
      );
    }
  }
  const handleChangeTxHash = (event) => {
    setTxHashValue(event.target.value);
  };
  return (
    <div className={style.stakingPage}>
      <div className={style.inner}>
        <div className={style.titleBlock}>
          <h2 className={style.title}>Bridge:</h2>
        </div>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <ButtonCustom
            className={isConnectedToEth ? null : style.trans}
            onClick={async () => {
              if (PRODUCTION) {
                await CojodiNetworkSwitcher.switchToChain(
                  chainRpcData.eth_mainnet
                );
              }
              await CojodiNetworkSwitcher.switchToChain(chainRpcData.goerli);
            }}
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
            onClick={async () => {
              if (PRODUCTION) {
                await CojodiNetworkSwitcher.switchToChain(chainRpcData.matic);
              }
              await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
            }}
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
          <div>
            {isConnectedToEth ? (
              <div className={style.buttonClaim}>
                <label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="name"
                    placeholder="TX HASH"
                    value={txHashValue}
                    onChange={handleChangeTxHash}
                  />
                </label>

                <button
                  onClick={() => claimWithdrawal(txHashValue)}
                  value="Claim Withdrawal"
                >
                  <img src={btn} alt="" />
                  <p>Claim</p>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.cards}>
          {ownedNFTs.map((nft) => (
            <div className={style.card} key={nft.id}>
              <div className={style.back}>{svgIcons.stackingPageCardBack}</div>
              <div className={style.content}>
                <img src={nft.image} alt="" />

                <div className={style.buttons}>
                  {nft.chain === "eth" ? (
                    <button onClick={() => deposit(nft.id)}>
                      <img src={btn} alt="" />
                      <p>Deposit</p>
                    </button>
                  ) : (
                    <button onClick={() => withdraw(nft.id)}>
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
