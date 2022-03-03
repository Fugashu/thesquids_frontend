import React, {FC, useState} from "react";
import style from "./buttonLink.module.scss";
import clsx from "clsx";

interface IButtonLink extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    imgDefault: string
    imgHover: string
    imgClick: string
    href?: string
    className?: string
    onClickHandler?: () => void
}

export const ButtonLink: FC<IButtonLink> = ({
                                                href,
                                                imgDefault,
                                                imgHover,
                                                imgClick,
                                                className,
                                                onClickHandler,
                                                ...props
                                            }) => {
    const [hover, setHover] = useState(false);
    const [mouseDown, setMouseDown] = useState(false);

    return (
        <>
            {
                href
                    ? (
                        <a href={href}
                           target="_blank"
                           rel="noopener noreferrer nofollow"
                           className={clsx({
                               [style.buttonLink]: true,
                               [style.buttonLink_hover]: hover && !mouseDown,
                               [style.buttonLink_mouseDown]: mouseDown,
                           }, className)}
                           onMouseEnter={() => setHover(true)}
                           onMouseLeave={() => setHover(false)}
                           onMouseDown={() => setMouseDown(true)}
                           onMouseUp={() => setMouseDown(false)}
                           onClick={() => onClickHandler && onClickHandler()}
                        >
                            <img src={imgDefault} alt="" className={style.default}/>
                            <img src={imgHover} alt="" className={style.hover}/>
                            <img src={imgClick} alt="" className={style.click}/>
                        </a>
                    )
                    : (
                        <button className={clsx({
                            [style.buttonLink]: true,
                            [style.buttonLink_button]: true,
                            [style.buttonLink_hover]: hover && !mouseDown,
                            [style.buttonLink_mouseDown]: mouseDown,
                        }, className)}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                onMouseDown={() => setMouseDown(true)}
                                onMouseUp={() => setMouseDown(false)}
                                onClick={() => onClickHandler && onClickHandler()}
                                {...props}
                        >
                            <img src={imgDefault} alt="" className={style.default}/>
                            <img src={imgHover} alt="" className={style.hover}/>
                            <img src={imgClick} alt="" className={style.click}/>
                        </button>
                    )
            }
        </>
    )
}