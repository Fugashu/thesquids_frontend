import {FC, useState} from "react";
import style from "./TopButton.module.scss";
import {svgIcons} from "../../../../../assets/svg/svgIcons";
import {HomeModalEnum} from "../../../../../store/appSlice";
import iconDna from "../../../../../assets/png/choose the coin/dna_icon.png";
import iconLives from "../../../../../assets/png/choose the coin/dna_icon.png";
import clsx from "clsx";

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
            <div className={style.backMobile}>
                {
                    checked
                        ? svgIcons.topButtonMobileClick
                            : hover
                                ? svgIcons.topButtonMobileDefault
                                : svgIcons.topButtonMobileDefault
                }
            </div>

            <div className={style.backDesktop}>
                {
                    checked
                        ? svgIcons.topButtonDesktopClick
                        : hover
                        ? svgIcons.topButtonDesktopHover
                        : svgIcons.topButtonDesktopDefault
                }
            </div>

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