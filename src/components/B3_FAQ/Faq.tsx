import React, {useState} from "react";
import style from "./faq.module.scss";
import barrels from "../../assets/gif/barrels.gif";
import clsx from "clsx";
import {Btn} from "./Btn/Btn";

const items = [
    {
        title: "What are The Squids?",
        text: "The Squids are a species consisting of 1,000 humans with altered DNA, and they love to play games. Each individual has an equal chance at winning the games and earning rewards.",
    },
    {
        title: "How can I get a Squid?",
        text: "The entirety of the collection will be available for purchase through our website. More details will be announced on our Discord and Twitter. Ensure your MetaMask wallet is connected to purchase a Squid during mint.",
    },
    {
        title: "What are the Genesis Squids?",
        text: "These are a collection of 1,000 Squids wielding unique powers. Some of those powers include having a discount when joining tournaments, 3x the voting power when choosing games, and the responsibility to ensure security by watching game replays.",
    },
    {
        title: "What are the tournaments?",
        text: "Tournaments_new last for 10 days and consist of 5 mini games. Each Squid has an equal potential to win the games and holds the ability to share winnings with other players. A Squid is disqualified when they run out of lives, and a life is lost when they lose a mini game. Games will continue until there is only one remaining player.",
    },
    {
        title: "More NFTs = Higher chance of winning?",
        text: "You have an equal number of lives as you do Squids. You also gain an entry fee discount that grows as you stack Squids. If you have more questions, feel free to contact us on Discord!",
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