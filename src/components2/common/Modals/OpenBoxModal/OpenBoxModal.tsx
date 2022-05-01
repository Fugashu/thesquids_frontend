import {useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectLootBox, setModal, setOpenBoxModal} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import style from "./OpenBoxModal.module.scss"
import * as React from "react";
import {CloseButton} from "../CloseButton/CloseButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import {desktopBreakPoint} from "../../../../constants";
import clsx from "clsx";
import purchaseMobile from "../../../../assets/png/buttons/open box modal purchase/mobile.png";
import purchaseDesktop from "../../../../assets/png/buttons/open box modal purchase/desktop.png";

import modalMobile from "../../../../assets/png/modal/open box/mobile.png";
import modalDesktop from "../../../../assets/png/modal/open box/desktop.png";
import lootBoxIcon from "../../../../assets/png/icons/loot boxes page card icon.png";
import btnMinus from "../../../../assets/png/icons/buttonMinus.png";
import btnPlus from "../../../../assets/png/icons/buttonPlus.png";
import {ButtonCustom} from "../../ButtonCustom/ButtonCustom";

import imgMobileDefault from "../../../../assets/png/buttons/open box modal/purchase/mobileDefault.png";
import imgMobileClick from "../../../../assets/png/buttons/open box modal/purchase/mobileClick.png";
import imgDesktopDefault from "../../../../assets/png/buttons/open box modal/purchase/desktopDefault.png";
import imgDesktopHover from "../../../../assets/png/buttons/open box modal/purchase/desktopHover.png";
import imgDesktopClick from "../../../../assets/png/buttons/open box modal/purchase/desktopClick.png";

export const OpenBoxModal = () => {
    const lootBox = useAppSelector(selectLootBox);
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setOpenBoxModal(false));
    }

    useOutsideClick(ref, onClose);

    const [quantity, setQuantity] = useState(lootBox?.quantity || 1);

    return (
        <div className={style.openBoxModal}>
            {
                lootBox &&
                <div className={style.content} ref={ref}>

                    <img className={style.back}
                        src={matchDesktop ? modalDesktop : modalMobile}
                        alt=""
                    />

                    <CloseButton onClick={onClose} className={style.closeButton}/>

                    <div className={style.cardContent}>
                        <p className={style.title}>{`${lootBox.label} box`}</p>

                        <img className={style.icon}
                             src={lootBoxIcon}
                             alt=""
                        />

                        <div className={style.infoBox}>

                            <div className={style.row}>
                                <p>Quality:</p>
                                <p>{lootBox.label}</p>
                            </div>

                            <div className={style.row}>
                                <p>Price:</p>
                                <p>{`${lootBox.price} $DNA`}</p>
                            </div>

                            <div className={style.row}>
                                <p>Quantity:</p>
                                <div className={style.buttonBlock}>

                                    <button onClick={() => setQuantity(quantity - 1)}
                                            disabled={quantity === 1}
                                    >
                                        <img src={btnMinus} alt=""/>
                                    </button>

                                    <p className={style.count}>{quantity}</p>

                                    <button onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <img src={btnPlus} alt=""/>
                                    </button>

                                </div>
                            </div>

                            <div className={clsx(style.row, style.row_total)}>
                                <p>Total price:</p>
                                <p>{`${lootBox.price * quantity} $DNA`}</p>
                            </div>

                            <ButtonCustom className={style.purchaseBtn}
                                          widthMobile={288}
                                          heightMobile={75}
                                          widthDesktop={436}
                                          heightDesktop={75}
                                          imgMobileDefault={imgMobileDefault}
                                          imgMobileClick={imgMobileClick}
                                          imgDesktopDefault={imgDesktopDefault}
                                          imgDesktopHover={imgDesktopHover}
                                          imgDesktopClick={imgDesktopClick}
                            >
                                <p>Purchase</p>
                            </ButtonCustom>

                        </div>
                    </div>


                </div>
            }
        </div>
    )
}