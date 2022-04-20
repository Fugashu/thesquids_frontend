import * as React from "react";
import style from "./WarningModal.module.scss";
import {FC, useRef} from "react";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CloseButton} from "../CloseButton/CloseButton";
import {svgIcons} from "../../../../assets/svg/svgIcons";
import bntMobile from "../../../../assets/png/buttons/accept/mobile.png";
import bntDesktop from "../../../../assets/png/buttons/accept/desktop.png";

const items = [
    "The fish text website will help a designer, a layout designer",
    "The fish text website will help a designer, a layout designer, a webmaster to generate several",
    "The fish text website will help",
    "The fish text website will help a designer, a layout designer, a webmaster to generate several ",
];

interface IWarningModal {
    onClose: () => void
    onAccept: () => void
}

export const WarningModal:FC<IWarningModal> = ({onClose, onAccept}) => {
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, onClose);

    const matchDesktop = useMediaQuery('(min-width:1440px)');

    return (
        <div className={style.warningModal}>
            <div className={style.content} ref={ref}>
                <CloseButton onClick={onClose} className={style.closeButton}/>
                <div className={style.back}>
                    {matchDesktop ? svgIcons.warningDesktop : svgIcons.warningMobile}
                </div>
                <p className={style.title}>Warning!</p>

                <div className={style.items}>
                    {
                        items.map((item, index) => (
                            <div className={style.itemBlock}>
                                <div className={style.numberWrapper}>
                                    {svgIcons.numberCard}
                                    <span>{index + 1}</span>
                                </div>

                                <p>{item}</p>
                            </div>
                        ))
                    }
                </div>

                <button className={style.acceptButton}
                        onClick={onAccept}
                >
                    <img src={matchDesktop ? bntDesktop : bntMobile} alt=""/>
                    <p>accept</p>
                </button>

            </div>
        </div>
    )
}

