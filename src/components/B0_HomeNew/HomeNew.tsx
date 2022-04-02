import React, {useEffect, useState} from "react";
import style from "./homeNew.module.scss";

import minusDefault from "../../assets/svg/buttons/minus-d.svg";
import minusHover from "../../assets/svg/buttons/minus-h.svg";
import minusClick from "../../assets/svg/buttons/minus-c.svg";

import plusDefault from "../../assets/svg/buttons/plus-d.svg";
import plusHover from "../../assets/svg/buttons/plus-h.svg";
import plusClick from "../../assets/svg/buttons/plus-c.svg";

import total from "../../assets/png/home-total.png";

import mintNowDefault from "../../assets/svg/buttons/mint-now-d.svg";
import mintNowHover from "../../assets/svg/buttons/mint-now-h.svg";
import mintNowClick from "../../assets/svg/buttons/mint-now-c.svg";

import connectD from "../../assets/png/buttons/metamaskBtnIdle.png";
import connectH from "../../assets/png/buttons/metamaskBtnHover.png";
import connectC from "../../assets/png/buttons/metamaskBtnIPressed.png";

import {convertToTwoDigit, dateStart, getHours, getMins} from "./helpers";
import {ButtonLink} from "../common/ButtonLink/ButtomLink";
import {mint, updateSupply} from "../cojodi/MetamaskConnection/Wallet";
import {MetaMaskButton} from "../cojodi/MetamaskConnection/connectToMetamaskButton";

const texts = [
    ["Starts: ", "00am EST on 00.00.2022"],
    ["Starting Price: 0 ", "Eth"],
    ["Price Drops By: ", "000 until sold out or reaches 0 Eth floor"],
    ["Price Drop Frequency: ", "Every 30 Minutes"],
    ["Max Mint Quantity: ", "1 per wallet"],
    ["End Time: ", "00 hours"],
]


export const HomeNew = () => {
    const max = 1;
    const price = 0.15;
    const [count, setCount] = useState(1);

    const [timeIsOver, setTimeIsOver] = useState(false);
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(false);
    const [amountMintedText, setAmountMintedText] = useState('????/1000 Minted')

    async function updateSupplyText(){
        let minted = await updateSupply();
        if (minted=== -1){
            return;
        }
        setAmountMintedText(minted+'/1000 minted');
    }

    const REFRESH_SUPPL_MS = 10000;

    useEffect(() => {
        const interval = setInterval(() => {

                updateSupplyText();

        }, REFRESH_SUPPL_MS);

        return () => clearInterval(interval);
    }, [])


    useEffect(() => {
        const time = new Date(14 * 24 * 60 * 60 * 1000 + dateStart.getTime() - new Date().getTime()).getTime();
        if (time > 0 && !timeIsOver) {
            setTime(time);
            setStart(true);
        }
    }, [timeIsOver]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (start) {
                if (time <= 60000) {
                    setTimeIsOver(true);
                    clearTimeout(timeId);
                } else {
                    setTime(time => time - 1000);
                }
            }
        }, 1000);
        return () => {
            clearTimeout(timeId);
        }
    }, [time, start]);


    return (
        <section className={style.homeNew}>
            <div className={style.innerWrapper}>
                <div className={style.leftBlock}>
                    <h1 className={style.title}>THE SQUIDS Auction</h1>
                    <div className={style.texts}>
                        {
                            texts.map((text, index) => (
                                <p key={index} className={style.text}><span>{text[0]}</span><span>{text[1]}</span></p>
                            ))
                        }
                    </div>

                    <div className={style.timerBlock}>
                        <span>{convertToTwoDigit(getHours(time))}</span>
                        <span>:</span>
                        <span>{convertToTwoDigit(getMins(time))}</span>
                    </div>

                    <p className={style.until}>Until the close of sales</p>

                    <div className={style.icons}>
                        <MetaMaskButton     connectH = {connectH}
                                            connectC = {connectC}
                                            connectD = {connectD}/>
                    </div>
                </div>

                <div className={style.rightBlock}>
                    <div className={style.card}>
                        <p className={style.minted}>{amountMintedText}</p>

                        <div className={style.countWrapper}>

                            <p className={style.mint}>MINT</p>

                            <div className={style.countBlock}>

                                <div className={style.countButtons}>

                                    <ButtonLink imgDefault={minusDefault}
                                                imgHover={minusHover}
                                                imgClick={minusClick}
                                                onClickHandler={() => setCount(count - 1)}
                                                className={style.countButton}
                                                disabled={count === 0}
                                    />

                                    <p className={style.count}>{count}</p>

                                    <ButtonLink imgDefault={plusDefault}
                                                imgHover={plusHover}
                                                imgClick={plusClick}
                                                onClick={() => setCount(count + 1)}
                                                className={style.countButton}
                                                disabled={count === max}
                                    />

                                </div>

                                <div className={style.max}>
                                    {`${max} max`}
                                </div>

                            </div>

                        </div>

                        <div className={style.totalBlock}>
                            <div className={style.texts}>
                                <p>total</p>
                                <p>{price * count}</p>
                            </div>
                            <img src={total} alt="" className={style.arrow}/>
                        </div>

                        <ButtonLink imgDefault={mintNowDefault}
                                    imgHover={mintNowHover}
                                    imgClick={mintNowClick}
                                    className={style.mintNow}
                                    onClick={()=>{mint(count)}}
                         />

                    </div>
                </div>
            </div>
        </section>
    )
}