import style from "./MarketplacePage.module.scss";
import * as React from "react";
import {cards} from "./constants";
import useMediaQuery from "@mui/material/useMediaQuery";
import {desktopBreakPoint} from "../../constants";
import clsx from "clsx";

import cardMobile from "../../assets/png/cards/marketplace page/mobile.png";
import cardDesktop from "../../assets/png/cards/marketplace page/desktop.png";
import {ButtonCustom} from "../common/ButtonCustom/ButtonCustom";

import imgMobileDefault from "../../assets/png/buttons/marketplace page/purchase/mobileDefault.png";
import imgMobileClick from "../../assets/png/buttons/marketplace page/purchase/mobileClick.png";
import imgDesktopDefault from "../../assets/png/buttons/marketplace page/purchase/desktopDefault.png";
import imgDesktopHover from "../../assets/png/buttons/marketplace page/purchase/desktopHover.png";
import imgDesktopClick from "../../assets/png/buttons/marketplace page/purchase/desktopClick.png";

export const MarketplacePage = () => {
    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

    return (
        <div className={style.marketplacePage}>
            <div className={style.inner}>
                <h2 className={style.title}>Whitelist Marketplace</h2>

                <div className={style.cards}>
                    {
                        cards.map(({img, name, price, left}, index) => (
                            <div key={index}
                                 className={style.card}
                            >

                                <img className={style.back}
                                     src={matchDesktop ? cardDesktop : cardMobile}
                                     alt=""
                                />

                                <div className={style.cardContent}>

                                    <img src={img} alt="" className={style.avatar}/>

                                    <p className={style.name}>{name}</p>

                                    <div className={clsx(style.row, style.row_first)}>
                                        <p>Price</p>
                                        <p>{`${price} $DNA`}</p>
                                    </div>

                                    <div className={clsx(style.row, style.row_second)}>
                                        <p>Left</p>
                                        <p>{left}</p>
                                    </div>

                                    <ButtonCustom className={style.purchaseBtn}
                                                  widthMobile={152}
                                                  heightMobile={75}
                                                  widthDesktop={206}
                                                  heightDesktop={75}
                                                  imgMobileDefault={imgMobileDefault}
                                                  imgMobileClick={imgMobileClick}
                                                  imgDesktopDefault={imgDesktopDefault}
                                                  imgDesktopHover={imgDesktopHover}
                                                  imgDesktopClick={imgDesktopClick}
                                    >
                                        <p>purchase</p>
                                    </ButtonCustom>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}