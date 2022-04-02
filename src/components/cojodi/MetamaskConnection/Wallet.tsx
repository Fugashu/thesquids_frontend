import keccak256 from "keccak256";
import {MerkleTree} from "merkletreejs";
import {ethers, Signer} from "ethers";
export const contractABI = [
    {
        inputs: [
            { internalType: "address", name: "projectOwner_", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            { indexed: false, internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "baseURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isPublicSale",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isWhitelistSale",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "merkleRoot",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "receiver", type: "address" },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mintOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "mintPublic",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32[]", name: "merkleProof_", type: "bytes32[]" },
        ],
        name: "mintWhitelist",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "price",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "uri_", type: "string" }],
        name: "setBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "merkleRoot_", type: "bytes32" }],
        name: "setMerkleRoot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "price_", type: "uint256" }],
        name: "setPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "togglePublicSale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "toggleWhitelistSale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "whitelistClaimed",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
//export const contractAddr = "0x15Db12b6CC801d12e23fa1eE9a2C822A360b927d";
export const contractAddr = "0xaC3D006f6332981fD1a0CE2055Fa42786aAF16F9";

export var isWalletConnected = false;
export var contract:ethers.Contract;
declare var window:any;
export var signer:ethers.Signer;
export var connectedAddress:string;
export var numSquidsMinted:number;


export async function updateSupply(){
    try {

        numSquidsMinted = await contract.totalSupply();
        return numSquidsMinted;
    }
    catch (error){
        return -1;
    }
}

export async function makeMinterProof(whitelistAddresses:any) {
    console.log(whitelistAddresses);
    const leafNodes = whitelistAddresses.map((addr:any) => keccak256(addr));
    let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    console.log('hexroot');
    console.log(merkleTree.getHexRoot());
    return merkleTree.getHexProof(keccak256(await signer.getAddress()));
}

export default async function fetchAPI(apiString:string){
    console.log('Fetching '+ apiString);


    await fetch(apiString)
        .then((response) => {response.json()})
        .then((data) => {
                return(data);
            }
        )
        .catch((error) => {
            console.log('Failed to fetch the API with error: '+ error)
        });

}

export async function connectWallet(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    signer= await provider.getSigner()

    console.log(signer);
    console.log(contractABI);
    console.log(contractAddr);
    console.log(await signer.getAddress())
    await loadContract(signer);
    isWalletConnected = true;
}
export async function disconnectWallet(){
    window.location.reload();
}
export async function loadContract(signer:Signer) {

    contract = await new ethers.Contract(
        contractAddr,
        contractABI,
        signer
    );
    console.log(contract);

    try{
        let price = await contract.price();
        let wlon  =await contract.isWhitelistSale();
        console.log("testing contract call")
        console.log("The price of one squid is "+ price);
        console.log("Whitelist sale on "+ wlon);
    }
    catch (err){
        console.error(err);
        console.error("Fetching the price from the contract failed.");
    }
}
function getWhitelistAddresses(){
   // return await fetchAPI(apiURL);
    return ['0x82F1CaA00a11b9C0A7508808232455F4C3B6c9Bf', '0xf75050fB5685AEC8387a18AEA8ECc7aC941f40E6', '0x1a17C85E86415c51d3481Af0A06Ae7fa812e5137'];
}
export async function mint(amount:number) {
    if (amount === 0){
        return;
    }
    let isWhitelistSale = false;
    try{
    isWhitelistSale = await contract.isWhitelistSale();
    }
    catch (error){
        alert("Please connect your Metamask wallet.")
        return;
    }

    console.log('WL Sale Status: ' + isWhitelistSale);
    if (!isWhitelistSale){
        alert("The whitelist sale is currently not active.");
        return;
    }

        const hasClaimed = await contract.whitelistClaimed(await signer.getAddress());
        if (hasClaimed) {
            alert("You have already successfully minted.");
            return;
        }

        const wladdrs:any = getWhitelistAddresses();

    const minterProof = await makeMinterProof(wladdrs);
        if (minterProof.length === 0) {
            alert("Your connected Account is not whitelisted.");
            return;
        }

        let overrides = { value: await contract.price() };
        await contract.mintWhitelist(minterProof, overrides);
        return;
}