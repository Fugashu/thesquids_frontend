import {IHomeCard} from "../HomePage";
import {FC, useState} from "react";
import style from "./HomeCard.module.scss";
import {HashLink} from "react-router-hash-link";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {svgIcons} from "../../../assets/svg/svgIcons";

export const HomeCard: FC<IHomeCard> = ({label, to, icon, onClick}) => {
    const [hover, setHover] = useState(false);

    const matchDesktop = useMediaQuery('(min-width:1440px)');

    return (
        <HashLink to={to}
                  className={style.homeCard}
                  onClick={onClick}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
        >
            <div className={style.back}>
                {
                    !matchDesktop
                        ? svgIcons.homeCardMobile
                        : hover
                            ? svgIcons.homeCardDesktopHover
                            : svgIcons.homeCardDesktopDefault
                }
            </div>
            <div className={style.icon}>{icon}</div>
            <p className={style.label}>{label}</p>
        </HashLink>
    )
}