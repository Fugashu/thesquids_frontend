import tokensIcon from "../../assets/png/choose the coin/dna_icon.png";
import livesIcon from "../../assets/png/choose the coin/heart_icon.png";
import whitelistIcon from "../../assets/png/choose the coin/whitelist.png";
import nftIcon from "../../assets/gif/nft.gif";

import commonLootBox from "../../assets/png/icons/lootboxes/lootbox_common.png";
import rareLootBox from "../../assets/png/icons/lootboxes/lootbox_rare.png";
import epicLootBox from "../../assets/png/icons/lootboxes/lootbox_epic.png";
import legendaryLootBox from "../../assets/png/icons/lootboxes/lootbox_legendary.png";

export const boxes = [
  {
    image: commonLootBox,
    label: "Common",
    price: 1,
    quality: 10,
    contain: [{ icon: tokensIcon, name: "Tokens", percent: 20 }],
    quantity: 1,
  },
  {
    image: rareLootBox,
    label: "Rare",
    price: 2,
    quality: 5,
    contain: [
      { icon: tokensIcon, name: "Tokens", percent: 30 },
      { icon: livesIcon, name: "Lives", percent: 40 },
    ],
    quantity: 2,
  },
  {
    image: epicLootBox,
    label: "Epic",
    price: 3,
    quality: 1,
    contain: [
      { icon: tokensIcon, name: "Tokens", percent: 35 },
      { icon: livesIcon, name: "Lives", percent: 25 },
      { icon: whitelistIcon, name: "Whitelist", percent: 20 },
    ],
    quantity: 5,
  },
  {
    image: legendaryLootBox,
    label: "Legendary",
    price: 4,
    quality: 3,
    contain: [
      { icon: tokensIcon, name: "Tokens", percent: 35 },
      { icon: livesIcon, name: "Lives", percent: 25 },
      { icon: whitelistIcon, name: "Whitelist", percent: 20 },
      { icon: nftIcon, name: "NFT", percent: 35 },
    ],
    quantity: 8,
  },
];
