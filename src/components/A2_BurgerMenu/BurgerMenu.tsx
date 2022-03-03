import React, {FC} from "react";
import style from "./burgerMenu.module.scss"
import clsx from "clsx";
import {HashLink} from "react-router-hash-link";
import {links} from "../A1_Header/Header";
import {SvgIcon} from "../common/SvgIcon/SvgIcon";
import {svgIcons} from "../../assets/svg/svgIcons";
import {SocialIcon} from "../common/SocialIcon/SocialIcon";

export interface IBurgerMenu {
    burgerMenuIsOpen: boolean
    onClickHandler: (open: boolean) => void
}

export const BurgerMenu: FC<IBurgerMenu> = ({burgerMenuIsOpen, onClickHandler}) => {
    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_open]: burgerMenuIsOpen,
        })}>
            <button className={style.burgerButton}
                    onClick={() => onClickHandler(!burgerMenuIsOpen)}
            >
                <SvgIcon icon={
                    burgerMenuIsOpen ? svgIcons.close : svgIcons.burger
                }/>
            </button>

            <nav className={style.links}>
                {
                    links.map(link => <HashLink className={style.link}
                                                key={link}
                                                to={`/#${link}`}
                                                smooth={true}
                                                onClick={() => onClickHandler(!burgerMenuIsOpen)}
                    >
                        {link}
                    </HashLink>)
                }
            </nav>

            <div className={style.icons}>
                {
                    ["twitter", "discord", "metamask"].map(icon => <SocialIcon key={icon}
                                                                               icon={icon}
                                                                               className={style.icon}
                                                                               onClick={() => onClickHandler(!burgerMenuIsOpen)}
                        />
                    )
                }
            </div>
        </div>
    )
}