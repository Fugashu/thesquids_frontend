import * as React from "react";
import style from "./GameplayModal.module.scss";
import {useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectNickname, setGameplayModal, setModal} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CloseButton} from "../CloseButton/CloseButton";
import {desktopBreakPoint} from "../../../../constants";

import modalMobile from "../../../../assets/png/modal/gameplay/mobile.png";
import modalDesktop from "../../../../assets/png/modal/gameplay/desktop.png";
import fieldMobile from "../../../../assets/png/cards/gameplay modal field/mobile.png";
import fieldDesktop from "../../../../assets/png/cards/gameplay modal field/desktop.png";
import {ButtonCustom} from "../../ButtonCustom/ButtonCustom";

//legit
import imgMobileDefault from "../../../../assets/png/buttons/gameplay modal/legit/mobileDefault.png";
import imgMobileClick from "../../../../assets/png/buttons/gameplay modal/legit/mobileClick.png";
import imgDesktopDefault from "../../../../assets/png/buttons/gameplay modal/legit/desktopDefault.png";
import imgDesktopHover from "../../../../assets/png/buttons/gameplay modal/legit/desktopHover.png";
import imgDesktopClick from "../../../../assets/png/buttons/gameplay modal/legit/desktopClick.png";

// cheating
import mobileDefault from "../../../../assets/png/buttons/gameplay modal/cheating/mobileDefault.png";
import mobileClick from "../../../../assets/png/buttons/gameplay modal/cheating/mobileClick.png";
import desktopDefault from "../../../../assets/png/buttons/gameplay modal/cheating/desktopDefault.png";
import desktopHover from "../../../../assets/png/buttons/gameplay modal/cheating/desktopHover.png";
import desktopClick from "../../../../assets/png/buttons/gameplay modal/cheating/desktopClick.png";


export const GameplayModal = () => {
    const ref = useRef<HTMLDivElement>(null);
    const nickname = useAppSelector(selectNickname);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setGameplayModal(false));
    }

    useOutsideClick(ref, onClose);

    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

    return (
        <div className={style.gameplayModal}>
            <div className={style.content} ref={ref}>

                <CloseButton onClick={onClose} className={style.closeButton}/>

                <img className={style.backModal}
                     src={matchDesktop ? modalDesktop : modalMobile}
                     alt=""
                />

                <p className={style.title}>
                    <span>{nickname}</span><span> Gameplay</span>
                </p>

                <img className={style.field}
                     src={matchDesktop ? fieldDesktop : fieldMobile}
                     alt=""
                />

                <div className={style.buttons}>
                    <ButtonCustom className={style.legitBtn}
                                  widthMobile={256}
                                  heightMobile={75}
                                  widthDesktop={288}
                                  heightDesktop={75}
                                  imgMobileDefault={imgMobileDefault}
                                  imgMobileClick={imgMobileClick}
                                  imgDesktopDefault={imgDesktopDefault}
                                  imgDesktopHover={imgDesktopHover}
                                  imgDesktopClick={imgDesktopClick}
                    >
                        <p>Legit</p>
                    </ButtonCustom>

                    <ButtonCustom className={style.cheatingBtn}
                                  widthMobile={256}
                                  heightMobile={75}
                                  widthDesktop={288}
                                  heightDesktop={75}
                                  imgMobileDefault={mobileDefault}
                                  imgMobileClick={mobileClick}
                                  imgDesktopDefault={desktopDefault}
                                  imgDesktopHover={desktopHover}
                                  imgDesktopClick={desktopClick}
                    >
                        <p>Cheating</p>
                    </ButtonCustom>

                </div>

            </div>
        </div>
    )
}