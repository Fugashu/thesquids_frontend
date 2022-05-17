import { WarningModal } from "../WarningModal/WarningModal";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectPopUpModalText,
  selectPopUpModalTitle,
  setModal,
  setOnPopUpModal,
  setTournamentsWarningModal,
} from "../../../../store/appSlice";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import style from "../StakingNftErrorModal/StakingNftErrorModal.module.scss";
import { CloseButton } from "../CloseButton/CloseButton";
import modal from "../../../../assets/png/modal/error.png";
import * as React from "react";

export const PopUpModal = () => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const modalText = useAppSelector(selectPopUpModalText);
  const modalTitle = useAppSelector(selectPopUpModalTitle);
  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setOnPopUpModal(false));
  };

  useOutsideClick(ref, onClose);

  return (
    <div className={style.stakingNftErrorModal}>
      <div className={style.content} ref={ref}>
        {/* <CloseButton onClick={onClose} className={style.closeButton} /> */}

        <img className={style.back} src={modal} alt="" />

        <p className={style.title}>{modalTitle}</p>
        <p className={style.description}>{modalText}</p>
      </div>
    </div>
  );
};
