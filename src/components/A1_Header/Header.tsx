import React, {FC} from "react";
import {HashLink} from 'react-router-hash-link';
import style from "./header.module.scss";
import logo from "../../assets/png/logo_withoutSquid_4X.png";
import {SocialIcon} from "../common/SocialIcon/SocialIcon";

import {svgIcons} from "../../assets/svg/svgIcons";
import {SvgIcon} from "../common/SvgIcon/SvgIcon";

import connectD from "../../assets/svg/buttons/connect-d.svg";
import connectH from "../../assets/svg/buttons/connect-h.svg";
import connectC from "../../assets/svg/buttons/connect-c.svg";
import {ButtonLink} from "../common/ButtonLink/ButtomLink";
import clsx from "clsx";

export const links = [
    "RoadMap",
    "Faq",
    "Team",
];

export interface IHeader {
    burgerMenuIsOpen: boolean
    onClickHandler: (open: boolean) => void
    dir: number
    headerIsTransparent: boolean
}

export const Header: FC<IHeader> = ({burgerMenuIsOpen, onClickHandler, dir,headerIsTransparent}) => {
    return (
        <header className={style.header}>

            <div className={clsx({
                [style.inner]: true,
                [style.inner_hide]: dir === 1 && !headerIsTransparent,
                [style.inner_transparent]: headerIsTransparent,
            })}>

                <a href="https://thesquids.io " className={style.logo}>
                    <img src={logo} alt=""/>
                </a>

                <nav className={style.links}>
                    {
                        links.map(link => <HashLink className={style.link}
                                                    key={link}
                                                    to={`/#${link}`}
                                                    smooth={true}
                        >
                            {link}
                        </HashLink>)
                    }
                </nav>

                <div className={style.iconButtons}>
                    <SocialIcon icon="twitter" className={style.icon}/>
                    <SocialIcon icon="discord" className={style.icon}/>

                    <ButtonLink  imgDefault={connectD}
                                imgHover={connectH}
                                imgClick={connectC}
                                className={style.connectBtn}
                                //href=""
                    />

                </div>

                <button className={style.burgerButton}
                        onClick={() => onClickHandler(!burgerMenuIsOpen)}
                >
                    <SvgIcon icon={
                        burgerMenuIsOpen ? svgIcons.close : svgIcons.burger
                    }/>
                </button>

            </div>

        </header>
    )
}