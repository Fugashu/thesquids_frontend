import style from "./MyBoxes.module.scss"
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import openMobile from "../../../assets/png/buttons/loot boxes - open/mobile.png";
import openDesktop from "../../../assets/png/buttons/loot boxes - open/desktop.png";

const boxes = [
    {
        label: "Common",
        value: 10,
    },
    {
        label: "Rare",
        value: 5,
    },
    {
        label: "Legendary",
        value: 1,
    },
    {
        label: "Epic",
        value: 3,
    },
]


export const MyBoxes = () => {
    const matchDesktop = useMediaQuery('(min-width:1440px)');

    return (
        <div className={style.myBoxes}>

            <h3 className={style.title}>My  boxes</h3>

            <div className={style.boxes}>
                {
                    boxes.map(({label, value}, index) => (
                        <div className={style.box} key={index}>
                            <div className={style.top}>
                                <p className={style.label}>{label}</p>
                                <p className={style.value}>{value}</p>
                            </div>
                            <button className={style.openBtn}>
                                <img src={matchDesktop ? openDesktop : openMobile}
                                     alt=""
                                     className={style.back}
                                />
                                <p>open</p>
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className={style.cards}>

            </div>


        </div>
    )
}