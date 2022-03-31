import React from "react";
import style from "./footer.module.scss"
import {SocialIcon} from "../common/SocialIcon/SocialIcon";

export const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.inner}>
                <div className={style.icons}>
                    {
                        ["twitter"].map(icon => <SocialIcon key={icon} icon={icon} className={style.icon}/>)
                    }
                </div>
                <p className={style.text}>The Squids | All rights reserved</p>
            </div>
        </footer>
    )
}