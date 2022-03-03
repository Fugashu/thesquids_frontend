import style from "./btn.module.scss";
import btn_plus_default from "../../../assets/png/buttons/plus-yellow-default.png";
import btn_plus_hover from "../../../assets/png/buttons/plus-yellow-hover.png";
import btn_close from "../../../assets/png/buttons/close-yellow.png";
import React, {FC, useState} from "react";
import clsx from "clsx";

interface IBtn {
    index: number
    selectedCardIndex: number
    onClick: () => void
}


export const Btn: FC<IBtn> = ({
                                  index,
                                  selectedCardIndex,
                                  onClick,
}) => {
    const [hover, setHover] = useState(false);
    const [mouseDown, setMouseDown] = useState(false);
    const  opened =  index ===  selectedCardIndex


    return (
        <div className={clsx({
            [style.btn]: true,
            [style.btn_hover]: hover && !mouseDown && !mouseDown,
            [style.btn_mouseDown]: opened || mouseDown,
        })}
             onClick={() => onClick()}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             onMouseDown={() => setMouseDown(true)}
             onMouseUp={() => setMouseDown(false)}
        >
            <img src={btn_plus_default} alt="" className={style.default}/>
            <img src={btn_plus_hover} alt="" className={style.hover}/>
            <img src={btn_close} alt="" className={style.click}/>
        </div>
    )
}