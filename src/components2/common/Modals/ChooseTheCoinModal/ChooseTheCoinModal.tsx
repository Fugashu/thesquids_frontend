import * as React from "react";
import style from "./ChooseTheCoinModal.module.scss";
import {svgIcons} from "../../../../assets/svg/svgIcons";
import {useRef} from "react";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {
    HomeModalEnum,
    selectHomeModalType,
    setHomeModalType,
    setModal,
    setShowChooseTheCoinModal
} from "../../../../store/appSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CloseButton} from "../CloseButton/CloseButton";
import {TopButton} from "./TopButton/TopButton";


export const ChooseTheCoinModal = () => {
    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setHomeModalType(HomeModalEnum.dna));
        dispatch(setShowChooseTheCoinModal(false));
    }

    useOutsideClick(ref, onClose);

    const matchDesktop = useMediaQuery('(min-width:1440px)');

    const homeModalType = useAppSelector(selectHomeModalType);

    return (
        <div className={style.chooseTheCoinModal}>
            <div className={style.content} ref={ref}>

                <CloseButton onClick={onClose} className={style.closeButton}/>

                <div className={style.back}>
                    {matchDesktop ? svgIcons.chooseTheCoinBackDesktop : svgIcons.chooseTheCoinBackMobile}
                </div>

                <p className={style.title}>Choose the coin</p>

                <div className={style.topButtons}>
                    <TopButton type={HomeModalEnum.dna}
                               checked={homeModalType === HomeModalEnum.dna}
                               onClick={() => dispatch(setHomeModalType(HomeModalEnum.dna))}
                    />
                    <TopButton type={HomeModalEnum.lives}
                               checked={homeModalType === HomeModalEnum.lives}
                               onClick={() => dispatch(setHomeModalType(HomeModalEnum.lives))}
                    />
                </div>


            </div>
        </div>
    )
}