import { useRef } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  setModal,
  setStakingNftErrorModal,
  setVoteModal,
} from "../../../../store/appSlice";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import * as React from "react";
import style from "./VoteModal.module.scss";
import { CloseButton } from "../CloseButton/CloseButton";
import { svgIcons } from "../../../../assets/svg/svgIcons";
import { VoteModalCard } from "./VoteModalCard/VoteModalCard";

import carImg from "../../../../assets/png/newiconstheo/Car 1.png";
import ghostImg from "../../../../assets/png/newiconstheo/Ghost 1.png";
import rifleImg from "../../../../assets/png/newiconstheo/Riffle 1.png";

export interface IVoteModalCard {
  gameName: string;
  rating: number;
  votesCount: number;
  icon: string;
}

const cards: IVoteModalCard[] = [
  {
    gameName: "Car Crasher",
    rating: 1,
    votesCount: 122,
    icon: carImg,
  },
  {
    gameName: "Ghost Hunter",
    rating: 1,
    votesCount: 507,
    icon: ghostImg,
  },
  {
    gameName: "Rifle Master",
    rating: 2,
    votesCount: 250,
    icon: rifleImg,
  },
];

export const VoteModal = () => {
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

        <div className={style.back}>{svgIcons.voteModalBack}</div>

        <p className={style.title}>Stage 1</p>

        <div className={style.cards}>
          {cards.map((card, index) => (
            <VoteModalCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};
