import {FC} from "react";
import style from "./CloseButton.module.scss"
import clsx from "clsx";
import {svgIcons} from "../../../../assets/svg/svgIcons";
import * as React from "react";

interface ICloseButton {
    onClick: () => void
    className?: string
}

export const CloseButton:FC<ICloseButton> = ({onClick, className}) => {
    return (
        <button className={clsx(style.closeButton, className && className)}
                onClick={onClick}
        >
            {svgIcons.modalCloseButton}
        </button>
    )
}