import React, {FC} from "react";
import style from "./Header2.module.scss";
import logo from "../../assets/png/header2/logo.png";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {links} from "./constants";
import {SvgIcon} from "../../components/common/SvgIcon/SvgIcon";
import {svgIcons} from "../../assets/svg/svgIcons";
import {HeaderButtons} from "../common/HeaderButtons/HeaderButtons";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectBurgerOpen, selectModal, setBurgerOpen, setModal, setTournamentsWarningModal} from "../../store/appSlice";


export interface IHeader2 {
    // dir: number
    // headerIsTransparent: boolean
}

export const Header2: FC<IHeader2> = ({
                                          // dir,
                                          // headerIsTransparent
                                      }) => {
    const modal = useAppSelector(selectModal);
    const burgerOpen = useAppSelector(selectBurgerOpen);

    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setBurgerOpen(false));
    }
    const onBurgerClick = () => {
        dispatch(setModal(!modal));
        dispatch(setBurgerOpen(!burgerOpen));
    }

    const onClickLink = [
        () => {
            dispatch(setTournamentsWarningModal(true));
            dispatch(setModal(true));
        },
        () => console.log("click"),
        () => console.log("click"),
        () => console.log("click"),
    ];

    return (
        <header className={style.header2}>

            <div className={clsx({
                [style.inner]: true,
                //[style.inner_hide]: dir === 1 && !headerIsTransparent,
                //[style.inner_transparent]: headerIsTransparent,
            })}>
                <div className={style.left}>
                    <Link to="/app2"
                          className={style.logo}
                          onClick={onClose}
                    >
                        <img src={logo} alt=""/>
                    </Link>
                    <nav className={style.links}>
                        {
                            links.map(({label, to}, index) => (
                                    <Link className={style.link}
                                          key={index}
                                          to={to}
                                          onClick={onClickLink[index]}
                                    >
                                        {label}
                                    </Link>
                                )
                            )
                        }
                    </nav>
                </div>

                <div className={style.right}>
                    <HeaderButtons className={style.buttons}/>
                    <button className={style.burgerButton}
                            onClick={onBurgerClick}
                    >
                        <SvgIcon icon={
                            burgerOpen ? svgIcons.close : svgIcons.burger
                        }/>
                    </button>
                </div>
            </div>
        </header>
    )
}