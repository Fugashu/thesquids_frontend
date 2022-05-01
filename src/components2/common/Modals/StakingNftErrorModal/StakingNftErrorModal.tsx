import * as React from "react";
import style from "./StakingNftErrorModal.module.scss"
import {useRef} from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {setLeaderboardModal, setModal, setStakingNftErrorModal} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import {CloseButton} from "../CloseButton/CloseButton";
import modal from "../../../../assets/png/modal/error.png";

export const StakingNftErrorModal = () => {
    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setStakingNftErrorModal(false));
    }

    useOutsideClick(ref, onClose);

    return (
        <div className={style.stakingNftErrorModal}>
            <div className={style.content} ref={ref}>
                <CloseButton onClick={onClose} className={style.closeButton}/>

                <img className={style.back} src={modal} alt=""/>

                <p className={style.title}>Error</p>
                <p className={style.description}>You need to stake 1 or more NFT to enter</p>
            </div>
        </div>
    )
}