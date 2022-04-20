import * as React from "react";
import style from "./GameplayModal.module.scss";
import {useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectNickname, setGameplayModal, setModal, setNickname} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CloseButton} from "../CloseButton/CloseButton";
import {svgIcons} from "../../../../assets/svg/svgIcons";
import {GameplayModalButton} from "./GameplayModalButton/GameplayModalButton";

export const GameplayModal = () => {
    const ref = useRef<HTMLDivElement>(null);
    const nickname = useAppSelector(selectNickname);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setGameplayModal(false));
    }

    useOutsideClick(ref, onClose);

    const matchDesktop = useMediaQuery('(min-width:1440px)');

    return (
        <div className={style.gameplayModal}>
            <div className={style.content} ref={ref}>

                <CloseButton onClick={onClose} className={style.closeButton}/>

                <div className={style.back}>
                    {matchDesktop ? svgIcons.gameplayModalBackDesktop : svgIcons.gameplayModalBackMobile}
                </div>

                <p className={style.title}>
                    <span>{nickname}</span><span> Gameplay</span>
                </p>

                <div className={style.field}>
                    {matchDesktop ? svgIcons.gameplayModalFieldDesktop : svgIcons.gameplayModalFieldMobile}
                </div>

                <div className={style.buttons}>
                    <GameplayModalButton/>
                    <GameplayModalButton first={false}/>
                </div>

            </div>
        </div>
    )
}