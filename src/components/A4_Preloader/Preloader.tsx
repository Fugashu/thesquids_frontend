import React, {useEffect, useState} from "react";
import style from "./preloader.module.scss"
import preloader from "../../assets/png/tube 1.png"
import clsx from "clsx";

export const Preloader = () => {
    const duration = 1000;
    const durationStep = Math.floor(duration / 100);
    const [time, setTime] = useState(0);
    const [timeIsOver, setTimeIsOver] = useState(false);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (!timeIsOver) {
                if (time >= 100) {
                    setTimeIsOver(true);
                    clearTimeout(timeId);
                } else {
                    setTime(time => time + 1);
                }
            }
        }, durationStep);
        return () => {
            clearTimeout(timeId);
        }
    }, [time, durationStep, timeIsOver]);


    return (
        <div className={clsx({
            [style.preloader]: true,
            [style.preloader_hide]: timeIsOver,
        })}>
            <div className={style.inner}>
                <div className={style.tubeWrapper}>
                    <div className={style.inner}>
                        <div className={style.tube}
                             style={{
                                 height: `${time}%`
                             }}
                        />
                    </div>
                    <img src={preloader} alt=""/>
                </div>
                <p className={style.text}>{`${time} %`}</p>
            </div>
        </div>
    )
}