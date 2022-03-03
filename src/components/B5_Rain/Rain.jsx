import React from "react";
import style from "./rain.module.scss"
import "react-rain-animation/lib/style.css";
import ReactRain from 'react-rain-animation';


export const Rain = () => {
    return (
        <section className={style.rain}>
            <div className={style.wrapper}>
                <div className={style.inner}>
                    <ReactRain numDrops="100" />
                </div>
                <div className={style.inner}>
                    <ReactRain numDrops="100" />
                </div>
            </div>

        </section>
    )
}