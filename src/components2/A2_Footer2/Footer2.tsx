import React from "react";
import style from "./footer2.module.scss"
import {SocialIcon} from "../../components/common/SocialIcon/SocialIcon";


export const Footer2 = () => {
    return (
        <footer className={style.footer2}>
            <div className={style.inner}>
                <div className={style.icons}>
                    {
                        ["twitter", "discord"].map(icon => (
                            <SocialIcon key={icon} icon={icon} className={style.icon}/>
                        ))
                    }
                </div>
                <p className={style.text}>@2021 | All rights reserved</p>
            </div>
        </footer>
    )
}