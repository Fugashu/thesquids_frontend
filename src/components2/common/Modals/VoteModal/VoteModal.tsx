import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { setModal, setVoteModal } from "../../../../store/appSlice";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import * as React from "react";
import style from "./VoteModal.module.scss";
import { CloseButton } from "../CloseButton/CloseButton";
import { VoteModalCard } from "./VoteModalCard/VoteModalCard";

import modal from "../../../../assets/png/modal/vote/desktop.png";
import { ButtonCustom } from "../../ButtonCustom/ButtonCustom";
import imgDefault from "../../../../assets/png/buttons/vote modal - vote/default.png";
import imgClick from "../../../../assets/png/buttons/vote modal - vote/click.png";
import imgHover from "../../../../assets/png/buttons/vote modal - vote/hover.png";
import noDefault from "../../../../assets/png/buttons/tournaments modal/no/default.png";
import noClick from "../../../../assets/png/buttons/tournaments modal/no/click.png";
import noHover from "../../../../assets/png/buttons/tournaments modal/no/hover.png";
import axios from "axios";
import { backendEndpoint } from "../../../../constants";

export interface IVoteModalCard {
  id: number;
  n_votes: number;
  rating: number;
  link: string;
}

export const VoteModal = () => {
  // @ts-ignore
  useEffect(async () => {
    await axios
      .get(backendEndpoint + "/tournament/game/vote")
      .then((result) => {
        setCards(result.data);
      });
  }, []);

  const [cards, setCards] = useState([]);
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setVoteModal(false));
  };

  useOutsideClick(ref, onClose);

  return (
    <div className={style.voteModal}>
      <div className={style.content} ref={ref}>
        <CloseButton onClick={onClose} className={style.closeButton} />

        <img className={style.back} src={modal} alt="" />

        <p className={style.title}>Vote now:</p>

        <div className={style.cards}>
          {cards.map((card, index) => (
            <VoteModalCard key={index} {...card} />
          ))}
        </div>
      </div>
      {/*
      <ButtonCustom
        className={style.btnNo}
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
        <p>End Tournament</p>
      </ButtonCustom> */}
    </div>
  );
};
