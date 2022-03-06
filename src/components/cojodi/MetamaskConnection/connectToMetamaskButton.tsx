import React from 'react';
import {ethers, Signer} from "ethers";
import {useState} from "react";
import connectD from "../../../assets/png/buttons/connect-d.png";
import connectH from "../../../assets/png/buttons/connect-h.png";
import connectC from "../../../assets/png/buttons/connect-c.png";

import connectedD from "../../../assets/png/buttons/connected-d.png";
import connectedH from "../../../assets/png/buttons/connected-h.png";
import connectedC from "../../../assets/png/buttons/connected-c.png";

import style from "../../A1_Header/header.module.scss";
import {ButtonLink} from "../../common/ButtonLink/ButtomLink";



const contractAddr = "0x15Db12b6CC801d12e23fa1eE9a2C822A360b927d";
const contractABI = [
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

declare let window:any;
export let contract:ethers.Contract;

const MetaMaskButton = () => {

    async function connectWallet(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        let signer:ethers.Signer= await provider.getSigner()
        await loadContract(signer);
        setConnectionActive(true);
        fetchAPI();
    }

    async function disconnectWallet(){
        window.location.reload(false);
    }

    async function loadContract(signer:Signer) {

        contract = await new ethers.Contract(
            contractAddr,
            contractABI,
            signer
        );

        try{
            let price = await contract.price();

            //alert("testing contract call")
            console.log("The price of one squid is"+ price);
        }
        catch (err){
            //alert("Fetching the price from the contract failed.");
        }
    }

    async function fetchAPI(){
        //alert("Trying to fetch the API: (not online yet)");
        await fetch("https://minting.dns.army/thesquids/api/whitelist")

            .then((response) => {response.json()})
            .then((data) => {console.log(data)})
            .catch((error) => {
                console.log('Failed to fetch the API with error: '+ error)});
    }


    const [isConnectionActive, setConnectionActive] = useState(false);
    return (
        <div>
            {isConnectionActive ?
            <ButtonLink imgDefault={connectedD}
                        imgHover={connectedH}
                        imgClick={connectedC}
                        className={style.connectBtn}
                        onClick={disconnectWallet}
            />:
                <ButtonLink imgDefault={connectD}
                            imgHover={connectH}
                            imgClick={connectC}
                            className={style.connectBtn}
                            onClick={connectWallet}
                />
            }


        </div>

    );
};

export default MetaMaskButton;
