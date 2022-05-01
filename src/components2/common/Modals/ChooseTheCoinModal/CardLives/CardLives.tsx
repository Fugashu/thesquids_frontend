import {FC, useState} from "react";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {desktopBreakPoint} from "../../../../../constants";
import style from "./CardLives.module.scss";
import {ICardLives} from "../ChooseTheCoinModal";
import btnMobile from "../../../../../assets/png/buttons/choose the coins/buyNowMobile.png";
import btnDesktop from "../../../../../assets/png/buttons/choose the coins/buyNowDesktop.png";
import compass from "../../../../../assets/png/icons/compass.png";
import cardMobile from "../../../../../assets/png/cards/choose the coins modal card/mobile.png";
import cardDesktopDefault from "../../../../../assets/png/cards/choose the coins modal card/desktopDefault.png";
import cardDesktopHover from "../../../../../assets/png/cards/choose the coins modal card/desktopHover.png";
import cardDesktopClick from "../../../../../assets/png/cards/choose the coins modal card/desktopClick.png";
import {ButtonCustom} from "../../../ButtonCustom/ButtonCustom";

import mobileDefault from "../../../../../assets/png/buttons/choose the coin - lives - buy now/mobileDefault.png";
import mobileClick from "../../../../../assets/png/buttons/choose the coin - lives - buy now/mobileClick.png";
import desktopDefault from "../../../../../assets/png/buttons/choose the coin - lives - buy now/desktopDefault.png";
import desktopHover from "../../../../../assets/png/buttons/choose the coin - lives - buy now/desktopHover.png";
import desktopClick from "../../../../../assets/png/buttons/choose the coin - lives - buy now/desktopClick.png";

export const CardLives: FC<ICardLives> = ({lives, value}) => {
    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);
    const [hover, setHover] = useState(false);
    const [click, setClick] = useState(false);

    return (
        <div className={style.cardLives}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             onMouseDown={() => setClick(true)}
             onMouseUp={() => setClick(false)}
        >
            <img className={style.back}
                 src={
                     click
                         ? (matchDesktop ? cardDesktopClick : cardMobile)
                         : hover
                             ? (matchDesktop ? cardDesktopHover : cardMobile)
                             : (matchDesktop ? cardDesktopDefault : cardMobile)
                 }
                 alt=""
            />

            <div className={style.cardContent}>
                <p className={style.cardTitle}>{`${lives} lives`}</p>

                <div className={style.compassBlock}>
                    <p>{value}</p>
                    <img src={compass} alt=""/>
                </div>



                <ButtonCustom className={style.buyBtn}
                              widthMobile={233}
                              heightMobile={40}
                              widthDesktop={157}
                              heightDesktop={40}
                              imgMobileDefault={mobileDefault}
                              imgMobileClick={mobileClick}
                              imgDesktopDefault={desktopDefault}
                              imgDesktopHover={desktopHover}
                              imgDesktopClick={desktopClick}
                >
                    <p>Buy Now</p>
                </ButtonCustom>

            </div>
        </div>
    )
}