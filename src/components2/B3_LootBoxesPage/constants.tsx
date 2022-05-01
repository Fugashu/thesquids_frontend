import tokensIcon from "../../assets/png/choose the coin/dna_icon.png";
import livesIcon from "../../assets/png/choose the coin/heart_icon.png";
import whitelistIcon from "../../assets/png/choose the coin/whitelist.png";
import nftIcon from "../../assets/gif/nft.gif";

export const boxes = [
    {
        label: "Common",
        price: 1,
        quality: 10,
        contain: [
            {icon: tokensIcon, name: "Tokens", percent: 20},
        ],
        quantity: 1,
    },
    {
        label: "Rare",
        price: 2,
        quality: 5,
        contain: [
            {icon: tokensIcon, name: "Tokens", percent: 30},
            {icon: whitelistIcon, name: "Whitelist", percent: 40},
        ],
        quantity: 2,
    },
    {
        label: "Legendary",
        price: 3,
        quality: 1,
        contain: [
            {icon: livesIcon, name: "Lives", percent: 25},
            {icon: whitelistIcon, name: "Whitelist", percent: 20},
            {icon: tokensIcon, name: "Tokens", percent: 35},
        ],
        quantity: 5,
    },
    {
        label: "Epic",
        price: 4,
        quality: 3,
        contain: [
            {icon: livesIcon, name: "Lives", percent: 40},
            {icon: whitelistIcon, name: "Whitelist", percent: 25},
            {icon: nftIcon, name: "NFT", percent: 35},
        ],
        quantity: 8,
    },
];