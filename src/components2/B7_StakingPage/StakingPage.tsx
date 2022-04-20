import * as React from "react";
import style from "./StakingPage.module.scss";
import { svgIcons } from "../../assets/svg/svgIcons";
import nftGif from "../../assets/gif/stacking.gif";

import btn from "../../assets/png/buttons/staking page button/desktop.png";

import slide0 from "../../assets/gif/ryu.gif";
import slide1 from "../../assets/gif/sherif.gif";
import slide2 from "../../assets/gif/megaman.gif";
import slide3 from "../../assets/gif/geisha.gif";
import slide4 from "../../assets/gif/female astraunaut.gif";
import slide5 from "../../assets/gif/demon.gif";
import slide6 from "../../assets/gif/tracksuit.gif";
import slide7 from "../../assets/gif/seach.gif";
import slide8 from "../../assets/gif/sorcerer.gif";

export const StakingPage = () => {
  const stakedCount = 3;

  const slides = [
    slide0,
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
  ];
  const nfts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={style.stakingPage}>
      <div className={style.inner}>
        <div className={style.titleBlock}>
          <h2 className={style.title}>Staking:</h2>
          <p className={style.count}>{`${stakedCount} staked`}</p>
        </div>

        <div className={style.cards}>
          {nfts.map((nft) => (
            <div key={nft} className={style.card}>
              <div className={style.back}>{svgIcons.stackingPageCardBack}</div>
              <div className={style.content}>
                <img
                  src={slides[Math.floor(Math.random() * slides.length)]}
                  alt=""
                />
                <div className={style.buttons}>
                  <button>
                    <img src={btn} alt="" />
                    <p>Stake</p>
                  </button>
                  <button>
                    <img src={btn} alt="" />
                    <p>Unstake</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
