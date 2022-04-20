import * as React from "react";
import style from "./Cards.module.scss";
import tokensIcon from "../../../assets/png/choose the coin/dna_icon.png";
import livesIcon from "../../../assets/png/choose the coin/heart_icon.png";
import whitelistIcon from "../../../assets/png/choose the coin/whitelist.png";
import nftIcon from "../../../assets/gif/nft.gif";
import {svgIcons} from "../../../assets/svg/svgIcons";
import useMediaQuery from "@mui/material/useMediaQuery";

const cards = [
    {
        title: "Common",
        price: 1,
        contain: [
            {icon: tokensIcon, name: "Tokens"},
        ]
    },
    {
        title: "Rare",
        price: 2,
        contain: [
            {icon: tokensIcon, name: "Tokens"},
            {icon: whitelistIcon, name: "Whitelist"},
        ]
    },
    {
        title: "Epic",
        price: 20,
        contain: [
            {icon: livesIcon, name: "Lives"},
            {icon: whitelistIcon, name: "Whitelist"},
            {icon: tokensIcon, name: "Tokens"},
        ]
    },
    {
        title: "Legendary",
        price: 50,
        contain: [
            {icon: livesIcon, name: "Lives"},
            {icon: whitelistIcon, name: "Whitelist"},
            {icon: nftIcon, name: "NFT"},
        ]
    },
]


export const Cards = () => {
    const matchDesktop = useMediaQuery('(min-width:1440px)');

    return (
        <div className={style.cards}>
            {
                cards.map(({title, price, contain}, index) => (
                    <div key={index}
                         className={style.card}
                    >
                        <div className={style.back}>
                            {matchDesktop ? svgIcons.lootBoxesCardDesktop : svgIcons.lootBoxesCardMobile}
                        </div>
                        <div className={style.content}>
                            <div className={style.icon}>{svgIcons.lootBoxesCardIcon}</div>
                            <p className={style.title}>{title}</p>
                            <div className={style.priceBox}>
                                <p>Price</p>
                                <p>{`${price} $DNA`}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}