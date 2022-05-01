import {IHomeCard} from "../HomePage";
import {FC, useState} from "react";
import style from "./HomeCard.module.scss";
import {HashLink} from "react-router-hash-link";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import backMobile from "../../../assets/png/cards/home page/mobile.png";
import backDesktopDefault from "../../../assets/png/cards/home page/desktopDefault.png";
import backDesktopHover from "../../../assets/png/cards/home page/desktopHover.png";

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
                <img src={
                    !matchDesktop
                    ? backMobile
                    : hover
                        ? backDesktopHover
                        : backDesktopDefault
                }
                     alt=""
                     className={style.back}
                />
            </div>

            {/*<div className={style.icon}>{icon}</div>*/}

            <img className={style.icon} src={icon} alt=""/>


            <p className={style.label}>{label}</p>
        </HashLink>
    )
}