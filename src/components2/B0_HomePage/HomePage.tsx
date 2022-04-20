import * as React from "react";
import style from "./HomePage.module.scss";
import {setModal, setTournamentsWarningModal} from "../../store/appSlice";
import {useAppDispatch} from "../../store/hooks";
import {svgIcons} from "../../assets/svg/svgIcons";
import {HomeCard} from "./HomeCard/HomeCard";

export interface IHomeCard {
    label: string
    to: string
    icon: JSX.Element
    onClick: () => void
}

export const HomePage = () => {
    const dispatch = useAppDispatch();

    const links = [
        {
            label: "Tournaments",
            to: "/app2",
            icon: svgIcons.homeCardIcon0,
            onClick: () => {
                dispatch(setTournamentsWarningModal(true));
                dispatch(setModal(true));
            },
        },
        {
            label: "Loot Boxes",
            to: "/app2/loot",
            icon: svgIcons.homeCardIcon1,
            onClick: () => {},
        },
        {
            label: "Whitelist Marketplace",
            to: "/app2/wallet",
            icon: svgIcons.homeCardIcon2,
            onClick: () => {},
        },
        {
            label: "Test Recording",
            to: "/app2/marketplace",
            icon: svgIcons.homeCardIcon3,
            onClick: () => {},
        },
    ]



    return (
        <div className={style.homePage}>
            <div className={style.inner}>
                <h1>First Tournament starting in:</h1>
                <p className={style.timer}>3D:24H:24M</p>

                <div className={style.links}>
                    {
                        links.map((link, index) => <HomeCard key={index} {...link}/>)
                    }
                </div>
            </div>
        </div>
    )
}