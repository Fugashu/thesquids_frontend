import React, { useEffect, useState } from "react";
import style from "./homeNew.module.scss";

import minusDefault from "../../assets/svg/buttons/minus-d.svg";
import minusHover from "../../assets/svg/buttons/minus-h.svg";
import minusClick from "../../assets/svg/buttons/minus-c.svg";

import plusDefault from "../../assets/svg/buttons/plus-d.svg";
import plusHover from "../../assets/svg/buttons/plus-h.svg";
import plusClick from "../../assets/svg/buttons/plus-c.svg";

import total from "../../assets/png/home-total.png";

import connectD from "../../assets/png/buttons/metamaskBtnIdle.png";
import connectH from "../../assets/png/buttons/metamaskBtnHover.png";
import connectC from "../../assets/png/buttons/metamaskBtnIPressed.png";

import { dateStart } from "./helpers";
import { ButtonLink } from "../common/ButtonLink/ButtomLink";
import { MetaMaskButton } from "../cojodi/MetamaskConnection/connectToMetamaskButton";

const texts = [""];

export const HomeNew = () => {
  const max = 1;
  const price = 0.1;
  const [count, setCount] = useState(1);

  const [timeIsOver, setTimeIsOver] = useState(false);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [amountMintedText, setAmountMintedText] = useState("2000/2000 Minted");
  /*
  async function updateSupplyText() {
    let minted = await updateSupply();
    if (minted === -1) {
      return;
    }
    setAmountMintedText(minted + "/2000 minted");
  }

  const REFRESH_SUPPL_MS = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      updateSupplyText();
    }, REFRESH_SUPPL_MS);

    return () => clearInterval(interval);
  }, []);
*/
  useEffect(() => {
    const time = new Date(dateStart.getTime() - new Date().getTime()).getTime();
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
          setTime((time) => time - 1000);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [time, start]);

  return (
    <section className={style.homeNew}>
      <div className={style.innerWrapper}>
        <div className={style.leftBlock}>
          <h1 className={style.title}>THE SQUIDS Minting: SOLD OUT!</h1>
          <div className={style.texts}>
            {texts.map((text, index) => (
              <p key={index} className={style.text}>
                <span>{text[0]}</span>
                <span>{text[1]}</span>
              </p>
            ))}
          </div>

          <div className={style.icons}>
            <MetaMaskButton
              connectH={connectH}
              connectC={connectC}
              connectD={connectD}
            />
          </div>
        </div>

        <div className={style.rightBlock}>
          <div className={style.card}>
            <p className={style.minted}>{amountMintedText}</p>

            <div className={style.countWrapper}>
              <p className={style.mint}>MINT</p>

              <div className={style.countBlock}>
                <div className={style.countButtons}>
                  <ButtonLink
                    imgDefault={minusDefault}
                    imgHover={minusHover}
                    imgClick={minusClick}
                    onClickHandler={() => setCount(count - 1)}
                    className={style.countButton}
                    disabled={count === 0}
                  />

                  <p className={style.count}>{count}</p>

                  <ButtonLink
                    imgDefault={plusDefault}
                    imgHover={plusHover}
                    imgClick={plusClick}
                    onClick={() => setCount(count + 1)}
                    className={style.countButton}
                    disabled={count === max}
                  />
                </div>

                <div className={style.max}>{`${max} max`}</div>
              </div>
            </div>

            <div className={style.totalBlock}>
              <div className={style.texts}>
                <p>total</p>
                <p>{price * count}</p>
              </div>
              <img src={total} alt="" className={style.arrow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
