import {FC, useState} from "react";
import style from "./TopButton.module.scss";
import {HomeModalEnum} from "../../../../../store/appSlice";
import iconDna from "../../../../../assets/png/choose the coin/dna_icon.png";
import iconLives from "../../../../../assets/png/choose the coin/heart_icon.png";
import clsx from "clsx";

import mobileDefault from "../../../../../assets/png/buttons/choose the coins/top button/mobileDefault.png";
import mobileChecked from "../../../../../assets/png/buttons/choose the coins/top button/mobileChecked.png";
import desktopDefault from "../../../../../assets/png/buttons/choose the coins/top button/desktopDefault.png";
import desktopHover from "../../../../../assets/png/buttons/choose the coins/top button/desktopHover.png";
import desktopChecked from "../../../../../assets/png/buttons/choose the coins/top button/desktopChecked.png";

interface ITopButton {
    onClick: () => void
    checked: boolean
    type: HomeModalEnum
}

export const TopButton: FC<ITopButton> = ({
                                              onClick,
                                              checked,
                                              type
                                          }) => {
    const [hover, setHover] = useState(false);

    return (
        <button onClick={onClick}
                className={style.topButton}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
        >
            <img className={style.backMobile}
                 src={
                     checked
                         ? mobileChecked
                         : hover
                         ? mobileDefault
                         : mobileDefault
                 }
                 alt=""
            />

            <img className={style.backDesktop}
                 src={
                     checked
                         ? desktopChecked
                         : hover
                         ? desktopHover
                         : desktopDefault
                 }
                 alt=""
            />

            <div className={style.content}>
                <img src={type === HomeModalEnum.dna ? iconDna : iconLives}
                     alt=""
                     className={style.icon}
                />
                <p className={clsx({
                    [style.text]: true,
                    [style.text_checked]: checked,
                })}>
                    {type === HomeModalEnum.dna ? "$DNA" : "LIVES"}
                </p>

            </div>
        </button>
    )
}