import { ContractInterface, ethers, Signer } from "ethers";
import { CojodiNetworkSwitcher } from "../BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../BackendCalls/chainRpcData";

let signer: ethers.Signer;

export async function isUnlocked() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  let unlocked;

  try {
    const accounts = await provider.listAccounts();

    unlocked = accounts.length > 0;
  } catch (e) {
    unlocked = false;
  }

  return unlocked;
}

export async function getConnectedSignerAddress() {
  let connectedAddress = await signer.getAddress();
  console.log("Signer public address:" + connectedAddress);
  return connectedAddress;
}
export async function getConnectedSigner() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  return signer;
}

export async function connectWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await CojodiNetworkSwitcher.switchToChain(chainRpcData.eth_mainnet);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
}

export async function pretendDisconnectWalletByReloading() {
  window.location.reload();
}

export async function createContractObject(
  contractAddress: string,
  contractAbi: ContractInterface,
  connectedSigner: Signer
) {
  console.log("Creating contract...");
  console.log("Contract ABI:" + JSON.stringify(contractAbi));
  console.log("Contract Address:" + contractAddress);
  console.log("Signer Address:" + (await getConnectedSignerAddress()));

  return new ethers.Contract(contractAddress, contractAbi, connectedSigner);
}
