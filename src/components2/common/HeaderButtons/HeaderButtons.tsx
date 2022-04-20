import React, {FC} from "react";
import style from "./HeaderButtons.module.scss";
import clsx from "clsx";
import {useAppDispatch} from "../../../store/hooks";
import {
    HomeModalEnum,
    setBurgerOpen,
    setHomeModalType,
    setModal,
    setShowChooseTheCoinModal
} from "../../../store/appSlice";
import src0 from "../../../assets/png/header2/btn0.png";
import src1 from "../../../assets/png/header2/btn1.png";
import src2 from "../../../assets/png/header2/btn2.png";

interface IHeaderButtons {
    className?: string
}

export const HeaderButtons:FC<IHeaderButtons> = ({className}) => {
    const dispatch = useAppDispatch();

    const buttons = [
        {
            src: src0,
            text: "Balance:3",
            label: "Buy more",
            onClick: () => {
                dispatch(setModal(true));
                dispatch(setHomeModalType(HomeModalEnum.dna));
                dispatch(setShowChooseTheCoinModal(true));
                dispatch(setBurgerOpen(false));
            }
        },
        {
            src: src1,
            text: "Balance:3",
            label: "Buy more",
            onClick: () => {
                dispatch(setModal(true));
                dispatch(setHomeModalType(HomeModalEnum.lives));
                dispatch(setShowChooseTheCoinModal(true));
                dispatch(setBurgerOpen(false));
            }
        },
        {
            src: src2,
            text: "0xD31...9c2b",
            label: "Add nickname",
            onClick: () => {
                dispatch(setBurgerOpen(false));
            }
        },
    ];

    return (
        <div className={clsx(style.headerButtons, className)}>
            {
                buttons.map(({src, text, label, onClick}, index) => (
                    <div key={index}
                         className={style.btnBlock}
                    >
                        <img src={src} alt=""/>
                        <div className={style.right}>
                            <p>{text}</p>
                            <button onClick={onClick}>
                                {label}
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}