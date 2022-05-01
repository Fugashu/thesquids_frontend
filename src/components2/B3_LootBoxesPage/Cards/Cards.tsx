import * as React from "react";
import style from "./Cards.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import {desktopBreakPoint} from "../../../constants";
import {boxes} from "../constants";
import {useAppDispatch} from "../../../store/hooks";
import {setLootBox, setModal, setOpenBoxModal} from "../../../store/appSlice";

import cardMobile from "../../../assets/png/cards/loot boxes page/card/mobile.png";
import cardDesktop from "../../../assets/png/cards/loot boxes page/card/desktop.png";
import cardIcon from "../../../assets/png/icons/loot boxes page card icon.png";
import {ButtonCustom} from "../../common/ButtonCustom/ButtonCustom";

import imgMobileDefault from "../../../assets/png/buttons/loot boxes page/purchase/mobileDefault.png";
import imgMobileClick from "../../../assets/png/buttons/loot boxes page/purchase/mobileClick.png";
import imgDesktopDefault from "../../../assets/png/buttons/loot boxes page/purchase/desktopDefault.png";
import imgDesktopHover from "../../../assets/png/buttons/loot boxes page/purchase/desktopHover.png";
import imgDesktopClick from "../../../assets/png/buttons/loot boxes page/purchase/desktopClick.png";

export const Cards = () => {
    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);
    const dispatch = useAppDispatch();

    return (
        <div className={style.cards}>
            {
                boxes.map(({label, price, contain}, index) => (
                    <div key={index}
                         className={style.card}
                    >

                        <img className={style.back}
                             src={matchDesktop ? cardDesktop : cardMobile}
                             alt=""
                        />


                        <div className={style.content}>

                            <img  className={style.icon}
                                  src={cardIcon}
                                  alt=""
                            />

                            <p className={style.title}>{label}</p>
                            <div className={style.priceBox}>
                                <p>Price</p>
                                <p>{`${price} $DNA`}</p>
                            </div>

                            <ButtonCustom className={style.purchaseBtn}
                                          onClick={() => {
                                              dispatch(setLootBox(boxes[index]));
                                              dispatch(setModal(true));
                                              dispatch(setOpenBoxModal(true));
                                          }}
                                          widthMobile={240}
                                          heightMobile={40}
                                          widthDesktop={220}
                                          heightDesktop={40}
                                          imgMobileDefault={imgMobileDefault}
                                          imgMobileClick={imgMobileClick}
                                          imgDesktopDefault={imgDesktopDefault}
                                          imgDesktopHover={imgDesktopHover}
                                          imgDesktopClick={imgDesktopClick}
                            >
                                <p>purchase</p>
                            </ButtonCustom>


                            {/*<button className={style.purchaseBtn}*/}
                            {/*        onClick={() => {*/}
                            {/*            dispatch(setLootBox(boxes[index]));*/}
                            {/*            dispatch(setModal(true));*/}
                            {/*            dispatch(setOpenBoxModal(true));*/}
                            {/*        }}*/}
                            {/*>*/}
                            {/*    <img src={matchDesktop ? purchaseBtnDesktop : purchaseBtnMobile} alt=""/>*/}
                            {/*    <p>purchase</p>*/}
                            {/*</button>*/}

                            <p className={style.contain}>Can contain:</p>

                            <div className={style.items}>
                                {
                                    contain.map(({icon, name}, index) => (
                                        <div key={index}
                                             className={style.item}
                                        >
                                            <img src={icon} alt=""/>
                                            <p>{name}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}