import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { ethers } from "ethers";
import axios from "axios";
import {
  mintingContractAbiRinkeby,
  mintingContractAddressRinkeby,
} from "../ContractConfig";
import {
  createContractObject,
  getConnectedSigner,
  getConnectedSignerAddress,
} from "./MetamaskWallet";

export var mintingContract: ethers.Contract;
export var numSquidsMinted: number;

const apiUrl = "http://127.0.0.1:8000/wl";

export async function updateSupply() {
  try {
    await createMintingContract();
    numSquidsMinted = await mintingContract.totalSupply();
    console.log("Squid NFTs minted: " + numSquidsMinted);
    return numSquidsMinted;
  } catch (error) {
    console.log("Updating supply failed");
    return -1;
  }
}

async function createMintingContract() {
  if (mintingContract === undefined) {
    try {
      mintingContract = await createContractObject(
        mintingContractAddressRinkeby,
        mintingContractAbiRinkeby,
        await getConnectedSigner()
      );
    } catch (error) {
      console.log("Error while creating mint contract" + error);
    }
  }
}

export async function makeMinterProof(whitelistAddresses: any) {
  const leafNodes = whitelistAddresses.map((addr: any) => keccak256(addr));
  let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  console.log("Merkle Tree HexRoot:" + merkleTree.getHexRoot());
  return merkleTree.getHexProof(keccak256(await getConnectedSignerAddress()));
}

export default async function fetchAPI(apiString: string) {
  console.log("Fetching " + apiString);
  await axios
    .get(apiString)
    .then(async (res) => {
      console.log(res);
      const minterProof = await makeMinterProof(res.data);

      if (minterProof.length === 0) {
        alert("Your connected Account is not whitelisted.");
        return;
      }

      let overrides = { value: await mintingContract.price() };
      await mintingContract.mintWhitelist(minterProof, overrides);
      return;
    })
    .catch((error) => {
      console.log("Failed to fetch the API with error: " + error);
    });
}

export async function mint(amount: number) {
  await createMintingContract();
  if (amount === 0) {
    return;
  }
  let isWhitelistSale = false;
  try {
    isWhitelistSale = await mintingContract.isWhitelistSale();
  } catch (error) {
    alert("Please connect your Metamask wallet.");
    return;
  }

  console.log("WL Sale Status: " + isWhitelistSale);
  if (!isWhitelistSale) {
    alert("The whitelist sale is currently not active.");
    return;
  }

  const hasClaimed = await mintingContract.whitelistClaimed(
    await getConnectedSignerAddress()
  );
  if (hasClaimed) {
    alert("You have already successfully minted.");
    return;
  }

  await fetchAPI(apiUrl);
}
