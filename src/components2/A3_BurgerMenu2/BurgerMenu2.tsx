import React from "react";
import style from "./burgerMenu2.module.scss"
import clsx from "clsx";
import {HashLink} from "react-router-hash-link";
import {links} from "../A1_Header2/constants";
import {HeaderButtons} from "../common/HeaderButtons/HeaderButtons";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectBurgerOpen, setBurgerOpen, setModal} from "../../store/appSlice";



export const BurgerMenu2 = () => {
    const burgerOpen = useAppSelector(selectBurgerOpen);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setBurgerOpen(false));
    }

    return (
        <div className={clsx({
            [style.burgerMenu2]: true,
            [style.burgerMenu2_open]: burgerOpen,
        })}>

            <nav className={style.links}>
                {
                    links.map(({label, to}, index) => (
                            <HashLink className={style.link}
                                      key={index}
                                      to={to}
                                      smooth={true}
                                      onClick={onClose}
                            >
                                {label}
                            </HashLink>
                        )
                    )
                }
            </nav>

            <HeaderButtons className={style.headerButtons}/>

        </div>
    )
}