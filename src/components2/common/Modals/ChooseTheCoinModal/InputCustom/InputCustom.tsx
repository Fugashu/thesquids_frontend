import * as React from "react";
import style from "./InputCustom.module.scss";
import {useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {desktopBreakPoint} from "../../../../../constants";
import clsx from "clsx";
import mobile from "../../../../../assets/png/modal/choose the coins/inputMobile.png";
import desktopDefault from "../../../../../assets/png/modal/choose the coins/inputDesktopDefault.png";
import desktopHover from "../../../../../assets/png/modal/choose the coins/inputDesktopHover.png";
import desktopFocus from "../../../../../assets/png/modal/choose the coins/inputDesktopFocus.png";

export const InputCustom = () => {
    const [hover, setHover] = useState(false);
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");
    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

    return (
        <div className={style.inputCustom}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
            <img src={
                focus
                    ? (matchDesktop ? desktopFocus : mobile)
                    : hover ? (matchDesktop ? desktopHover : mobile)
                    : (matchDesktop ? desktopDefault : mobile)
            }
                 alt=""
                 className={style.back}
            />

            <div className={style.inputContent}>
                <input type="text"
                       className={style.input}
                       onFocus={() => setFocus(true)}
                       onBlur={() => setFocus(false)}
                       onChange={(e) => setValue(e.target.value)}
                />
                <p className={clsx({
                    [style.placeholder]: true,
                    [style.placeholder_top]: focus || Boolean(value),
                })}>
                    Enter the number
                </p>
            </div>
        </div>
    )
}