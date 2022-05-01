import * as React from "react";
import style from "./TimeLeftModal.module.scss"
import {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {setModal, setTimeLeftModal} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import "./animations.scss";
import clsx from "clsx";

import yesDefault from "../../../../assets/png/buttons/tournaments modal/yes/default.png";
import yesHover from "../../../../assets/png/buttons/tournaments modal/yes/hover.png";
import yesClick from "../../../../assets/png/buttons/tournaments modal/yes/click.png";

import noDefault from "../../../../assets/png/buttons/tournaments modal/no/default.png";
import noHover from "../../../../assets/png/buttons/tournaments modal/no/hover.png";
import noClick from "../../../../assets/png/buttons/tournaments modal/no/click.png";

import modalBack from "../../../../assets/png/modal/time left.png";
import heartIcon from "../../../../assets/png/icons/heart.png";
import {ButtonCustom} from "../../ButtonCustom/ButtonCustom";

export const TimeLeftModal = () => {
    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setTimeLeftModal(false));
    }

    useOutsideClick(ref, onClose);

    const [time, setTime] = useState(60);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (time === 0) {
                clearTimeout(timeId);
            } else {
                setTime(time => time - 1);
            }
        }, 1000);
        return () => {
            clearTimeout(timeId);
        }
    }, [time]);

    return (
        <div className={style.timeLeftModal}>
            <div className={style.content} ref={ref}>

                <img className={style.back}
                     src={modalBack}
                     alt=""
                />

                <div className={style.cardContent}>

                    <p className={style.title}>Time left</p>
                    <p className={style.timer}>{`${time} sec`}</p>

                    <div className={style.timeLine}>
                        <div className={clsx(style.runner, "runner")}/>
                    </div>

                    <p className={style.end}>END OF THE GAME</p>
                    <p className={style.would}>Would you like to use</p>
                    <p className={style.again}>
                        <img src={heartIcon} alt=""/>

                        <span>1 life to try again?</span>
                    </p>

                    <div className={style.buttons}>

                        <ButtonCustom className={style.btnYes}
                                      widthMobile={358}
                                      heightMobile={75}
                                      widthDesktop={358}
                                      heightDesktop={75}
                                      imgMobileDefault={yesDefault}
                                      imgMobileClick={yesClick}
                                      imgDesktopDefault={yesDefault}
                                      imgDesktopHover={yesHover}
                                      imgDesktopClick={yesClick}

                        >
                            <p>yes</p>
                        </ButtonCustom>

                        <ButtonCustom className={style.btnNo}
                                      widthMobile={358}
                                      heightMobile={75}
                                      widthDesktop={358}
                                      heightDesktop={75}
                                      imgMobileDefault={noDefault}
                                      imgMobileClick={noClick}
                                      imgDesktopDefault={noDefault}
                                      imgDesktopHover={noHover}
                                      imgDesktopClick={noClick}
                        >
                            <p>no</p>
                        </ButtonCustom>

                    </div>


                </div>


            </div>
        </div>
    )
}