import React, {useState} from "react";
import style from "./faq.module.scss";
import barrels from "../../assets/gif/barrels.gif";
import clsx from "clsx";
import {Btn} from "./Btn/Btn";

const items = [
    {
        title: "What are the SQUIDS ?",
        text: "The squids are a collection of 1000 Genesis NFTs. Made out of modified human DNA, this enhanced specie is capable of playing all sorts of games on the metaverse. Each of those unique characters have an equal chance at winning the games and live debt free.",
    },
    {
        title: "How can I get a Squid ?",
        text: "The whole collection will be available for purchase on our website through the initial sale. More details will be announced on our Discord and Twitter. Make sure to connect your metamask wallet to have a chance at getting a Squid during the mint.",
    },
    {
        title: "What are the Genesis Squids ?",
        text: "The Genesis Squids are part of the Squid collection. 1000 Genesis Squids will be available to mint. They will hold some special power. You will be able to have a discount for the tournaments. As well as 3x more voting power when choosing games. And finally, being able to watch replays of the games to insure the security of the tournaments.",
    },
    {
        title: "What are the tournaments ?",
        text: "After getting your hand on a SQUID nft, you will have access to a special section called “Tournaments”. Each tournament will last 10 Days with 5 mini games in total. You will have an equal chance at winning the games and a possibility to split the winning money prize after each game or eliminate each player until only 1 remains.",
    },
    {
        title: "More NFTs = Higher success ?",
        text: "Each NFTs have an equal chance at winning a tournament. You will however get certain discounts by stacking multiple of them as well as be able to play as many times as the number of NFTs you hold. Make sure to contact us on discord if you have more questions.",
    },
];

export const Faq = () => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(-1);


    return (
        <section className={style.faq}
        >
            <div className={style.inner}>
                <img src={barrels} alt="" className={style.barrels}/>
                

                <h2 className={style.title} id="Faq">FAQ</h2>
                <div className={style.items}>
                    {
                        items.map((item, index) => (
                            <div key={index}
                                 className={clsx({
                                     [style.card]: true,
                                     [style.card_open]: index === selectedCardIndex,
                                 })}
                            >
                                <Btn key={index}
                                     index={index}
                                     selectedCardIndex={selectedCardIndex}
                                     onClick={() => {
                                         if (index !== selectedCardIndex) {
                                             setSelectedCardIndex(index)
                                         } else {
                                             setSelectedCardIndex(-1)
                                         }
                                     }}
                                />

                                <p className={style.title}>{item.title}</p>
                                {
                                    index === selectedCardIndex &&
                                    <p className={style.text}>{item.text}</p>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}