import { ContractInterface, ethers, Signer } from "ethers";
import {
  goerliBridgeContractAbi,
  goerliBridgeContractAddress,
  mintingContractAbi,
  mintingContractAddress,
  mumbaiBridgeContractAbi,
  mumbaiBridgeContractAddress,
  mumbaiNFTContractAbi,
  mumbaiNFTContractAddress,
  mumbaiTokenContractAbi,
  mumbaiTokenContractAddress,
  mumbaiTournamentContractAbi,
  mumbaiTournamentContractAddress,
  mumbaiWethContractAbi,
  mumbaiWethContractAddress,
} from "../ContractConfig";
import {
  setModal,
  setOnPopUpModal,
  setShowChooseTheCoinModal,
} from "../../../store/appSlice";
import { store } from "../../../store/store";
import { displayPopUpModal, EPopUpModal } from "../BackendCalls/BackendCalls";
let stringify = require("json-stable-stringify");

export var signer: ethers.Signer;
export var mumbaiNFTContract: ethers.Contract;
export var mumbaiTournamentContract: ethers.Contract;
export var mumbaiTokenContract: ethers.Contract;
export var mintingContract: ethers.Contract;
export var goerliBridgeContract: ethers.Contract;
export var mumbaiBridgeContract: ethers.Contract;
export var mumbaiWethContract: ethers.Contract;
let provider: ethers.providers.Web3Provider;

export async function isUnlocked() {
  try {
    await getConnectedSignerAddress();
  } catch (e) {
    return false;
  }

  return true;
}
export async function getConnectedSignerAddress() {
  let connectedAddress = await signer.getAddress();
  //console.log("Signer public address:" + connectedAddress);
  return connectedAddress;
}
window.onload = async function () {
  await connectWallet();
};

export async function connectWallet() {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  provider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    if (oldNetwork) {
      console.log("reloading");
      window.location.reload();
    }
  });
  signer = provider.getSigner();

  mintingContract = await createContractObject(
    mintingContractAddress,
    mintingContractAbi,
    signer
  );

  mumbaiNFTContract = await createContractObject(
    mumbaiNFTContractAddress,
    mumbaiNFTContractAbi,
    signer
  );

  mumbaiTournamentContract = await createContractObject(
    mumbaiTournamentContractAddress,
    mumbaiTournamentContractAbi,
    signer
  );

  mumbaiTokenContract = await createContractObject(
    mumbaiTokenContractAddress,
    mumbaiTokenContractAbi,
    signer
  );

  goerliBridgeContract = await createContractObject(
    goerliBridgeContractAddress,
    goerliBridgeContractAbi,
    signer
  );

  mumbaiBridgeContract = await createContractObject(
    mumbaiBridgeContractAddress,
    mumbaiBridgeContractAbi,
    signer
  );

  mumbaiWethContract = await createContractObject(
    mumbaiWethContractAddress,
    mumbaiWethContractAbi,
    signer
  );
}

export async function pretendDisconnectWalletByReloading() {
  window.location.reload();
}

export async function getCurrentChainId() {
  return provider.getNetwork();
}
export async function createContractObject(
  contractAddress: string,
  contractAbi: ContractInterface,
  connectedSigner: Signer
) {
  console.log("Creating contract...");
  // console.log("Contract ABI:" + JSON.stringify(contractAbi));
  console.log("Contract Address:" + contractAddress);
  // console.log("Signer Address:" + (await getConnectedSignerAddress()));

  return new ethers.Contract(contractAddress, contractAbi, connectedSigner);
}

export async function setApprovalForAll(
  rootContract: ethers.Contract,
  targetContractAddress: string
) {
  let isAlreadyApproved = await rootContract.isApprovedForAll(
    await getConnectedSignerAddress(),
    targetContractAddress
  );

  if (isAlreadyApproved) {
    return;
  }
  let tx = await rootContract.setApprovalForAll(targetContractAddress, true);

  await tx.wait();
}

export async function signMessage(incomingMessage: Object) {
  console.log(Math.floor(Date.now() / 1000));
  // @ts-ignore
  incomingMessage["timestamp"] = Math.floor(new Date().getTime() / 1000);
  // @ts-ignore
  incomingMessage["addr"] = await getConnectedSignerAddress();
  let signpayload = stringify(
    incomingMessage,
    Object.keys(incomingMessage).sort()
  );

  let sig = await signer.signMessage(signpayload);
  // @ts-ignore
  incomingMessage["signature"] = sig;

  return incomingMessage;
}

export async function waitForTransactionWithModal(transaction: {
  wait: () => any;
}) {
  store.dispatch(setModal(false));
  store.dispatch(setShowChooseTheCoinModal(false));
  displayPopUpModal(EPopUpModal.Waiting);
  await transaction.wait();
  store.dispatch(setModal(false));
  store.dispatch(setOnPopUpModal(false));
}
