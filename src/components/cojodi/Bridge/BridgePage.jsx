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
  fetchUserNFTs,
  getImageUrlForTokenId,
} from "../BackendCalls/BackendCalls";

import { useAppDispatch } from "../../../store/hooks";
import { ethers } from "ethers";
const matic = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
const { FxPortalClient } = require("@fxportal/maticjs-fxportal");
export const BridgePage = () => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [isConnectedToEth, setIsConnectedToEth] = useState(false);
  const [txHashValue, setTxHashValue] = useState("");
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
    setIsConnectedToEth(true);
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

    matic.use(Web3ClientPlugin);
    // usefull when we have our own proof api
    // matic.setProofApi("https://apis.matic.network/");
    matic.setProofApi("localhost:3000/");

    let childProvider, parentProvider;
    parentProvider = new ethers.providers.JsonRpcProvider(
      "http://goerli.prylabs.net/"
    );
    childProvider = new ethers.providers.JsonRpcProvider(
      "https://matic-mumbai.chainstacklabs.com"
    );

    // const client = new matic.POSClient();
    const client = new FxPortalClient();
    /*await client.init({
      network: type,
      version: version,
      parent: {
        provider: new ethers.Wallet(privateKey, parentProvider),
        defaultConfig: {
          from: await getConnectedSignerAddress(),
        },
      },
      child: {
        provider: new ethers.Wallet(privateKey, childProvider),
        defaultConfig: {
          from: await getConnectedSignerAddress(),
        },
      },
    });*/

    // 4 not minted
    // availbel 6 7

    // token id 5
    // hash = "0x36c96c292aae9070a31356b67acd772344b1b91a4be69219f51fc2e95bc3138e"
    // hash = "0xdf3040152ed069c645525fe12c19dc672eea444506417f6958a4a9404e729cb3"

    // withdraw batch 36
    // hash = "0x51c954e90992cfeae12170a61dc0e6833c590c1ef5708ae9bdd49ebabf97b396";

    // withdraw batch 37
    // hash = "0x7048146fbe082b6b4d1b7cdf8b70da38f94db6cb45e921842634791995556a35";

    // withdraw batch 38,39,40
    //hash = "0xdc23dc98ef3a5250ea0772cd7b7dc53d4f9a2569eca6d68d1ec82a5908f3367c";

    let topic =
      "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036";
    const proof = await client.exitUtil.buildPayloadForExit(
      txHash,
      topic,
      false
    );

    console.log(proof);
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
            onClick={() =>
              CojodiNetworkSwitcher.switchToChain(chainRpcData.goerli)
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
          <div>
            <label>
              Claim Withdrawal:
              <input
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
              Claim Withdrawal
            </button>
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
