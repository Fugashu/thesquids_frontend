import {FC, ReactNode, useState} from "react";
import style from "./Card.module.scss"
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {svgIcons} from "../../../assets/svg/svgIcons";

interface ICard {
    children: ReactNode
}

export const CardItem:FC<ICard> = ({children}) => {
    const [hover, setHover] = useState(false);
    const matchDesktop = useMediaQuery('(min-width:1440px)');

    return (
        <div className={style.card}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
            <div className={style.back}>
                {
                    !matchDesktop
                    ? svgIcons.cardMobile
                        : hover
                            ? svgIcons.cardDesktopHover
                            : svgIcons.cardDesktopDefault
                }
            </div>

            <div className={style.content}>
                {children}
            </div>

        </div>
    )
}