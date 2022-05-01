import {FC, useState} from "react";
import style from "./CloseButton.module.scss"
import clsx from "clsx";
import * as React from "react";
import imgD from "../../../../assets/png/buttons/close/default.png";
import imgH from "../../../../assets/png/buttons/close/hover.png";
import imgC from "../../../../assets/png/buttons/close/click.png";

interface ICloseButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    className?: string
}

export const CloseButton: FC<ICloseButton> = ({
                                                  className,
                                                  ...props
                                              }) => {
    const [hover, setHover] = useState(false);
    const [mouseDown, setMousedown] = useState(false)

    return (
        <button className={clsx(style.closeButton, className && className)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseDown={() => setMousedown(true)}
                onMouseUp={() => setMousedown(false)}
                {...props}
        >
            <img src={mouseDown ? imgC : hover ? imgH : imgD}
                 alt=""
            />
        </button>
    )
}