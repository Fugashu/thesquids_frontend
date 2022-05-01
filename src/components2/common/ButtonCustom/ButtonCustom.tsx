import {FC, useState} from "react";
import * as React from "react";
import style from "./ButtonCustom.module.scss"
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import {desktopBreakPoint} from "../../../constants";

interface IButtonCustom extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    widthMobile: number
    heightMobile: number
    widthDesktop: number
    heightDesktop: number
    className?: string
    imgMobileDefault: string
    imgMobileClick: string
    imgDesktopDefault: string
    imgDesktopHover: string
    imgDesktopClick: string
    children: React.ReactNode
}

export const ButtonCustom: FC<IButtonCustom> = ({
                                                    widthMobile,
                                                    heightMobile,
                                                    widthDesktop,
                                                    heightDesktop,
                                                    className,
                                                    imgMobileDefault,
                                                    imgMobileClick,
                                                    imgDesktopDefault,
                                                    imgDesktopHover,
                                                    imgDesktopClick,
                                                    children,
                                                    ...props
                                                }) => {

    const [hover, setHover] = useState(false);
    const [click, setClick] = useState(false);

    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

    const sizes = matchDesktop
        ? {width: `${widthDesktop}px`, height: `${heightDesktop}px`}
        : {width: `${widthMobile}px`, height: `${heightMobile}px`}

    return (
        <button className={clsx(style.buttonCustom, Boolean(className) && className)}
                style={sizes}

                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseDown={() => setClick(true)}
                onMouseUp={() => setClick(false)}
                {...props}
        >
            {/*Mobile*/}
            <img src={imgMobileDefault}
                 className={clsx({
                     [style.imgMobile]: true,
                     [style.imgMobile_show]: !click,
                 })}
                 alt=""
            />

            <img src={imgMobileDefault}
                 className={clsx({
                     [style.imgMobile]: true,
                     [style.imgMobile_show]: click,
                 })}
                 alt=""
            />

            {/*Desktop*/}
            <img src={imgDesktopDefault}
                 className={clsx({
                     [style.imgDesktop]: true,
                     [style.imgDesktop_show]: !click && !hover,
                 })}
                 alt=""
            />
            <img src={imgDesktopHover}
                 className={clsx({
                     [style.imgDesktop]: true,
                     [style.imgDesktop_show]: !click && hover,
                 })}
                 alt=""
            />
            <img src={imgDesktopClick}
                 className={clsx({
                     [style.imgDesktop]: true,
                     [style.imgDesktop_show]: click,
                 })}
                 alt=""
            />

            <div className={clsx({
                [style.childrenWrapper]: true,
                [style.childrenWrapper_click]: click,
            })}>
                {children}
            </div>

        </button>
    )
}