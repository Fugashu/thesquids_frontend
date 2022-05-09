import * as React from "react";
import style from "./TournamentPage.module.scss";
import { useAppDispatch } from "../../store/hooks";
import {
  setModal,
  setStakingNftErrorModal,
  setTournamentsModal,
  setTournamentsWarningModal,
  setVoteModal,
} from "../../store/appSlice";
import { useNavigate } from "react-router-dom";

import cardBack from "../../assets/png/cards/tournament page/desktop.png";
import cardIcon0 from "../../assets/png/icons/tournament page/card icon 0.png";
import cardIcon1 from "../../assets/png/icons/tournament page/card icon 1.png";
import cardIcon2 from "../../assets/png/icons/tournament page/card icon 2.png";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";

import imgDefaultPlay from "../../assets/png/buttons/tournament page card/play_default.png";
import imgHoverPlay from "../../assets/png/buttons/tournament page card/play_hover.png";
import imgClickPlay from "../../assets/png/buttons/tournament page card/play_clicked.png";

import imgDefaultVote from "../../assets/png/buttons/tournament page card/vote_default.png";
import imgHoverVote from "../../assets/png/buttons/tournament page card/vote_hover.png";
import imgClickVote from "../../assets/png/buttons/tournament page card/vote_clicked.png";

export const TournamentPage = () => {
  const userIsStakingNft = true;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const cards = [
    {
      title: "End in 3H:24M:24S",
      icon: cardIcon0,
      buttonLabel: "PLAY",
      onClick: () => {
        if (!userIsStakingNft) {
          dispatch(setModal(true));
          dispatch(setStakingNftErrorModal(true));
        } else {
          dispatch(setTournamentsWarningModal(true));
          dispatch(setModal(true));
        }
      },
      imgDefault: imgDefaultPlay,
      imgHover: imgHoverPlay,
      imgClicked: imgClickPlay,
    },
    {
      title: "Start in 3H:24M:24S",
      icon: cardIcon2,
      buttonLabel: "VOTE",
      onClick: () => {
        //TODO DIMI is user staking nft?
        if (!userIsStakingNft) {
          dispatch(setModal(true));
          dispatch(setStakingNftErrorModal(true));
        } else {
          dispatch(setModal(true));
          //dispatch(setVoteModal(true));
          dispatch(setTournamentsModal(true));
        }
      },
      imgDefault: imgDefaultVote,
      imgHover: imgHoverVote,
      imgClicked: imgClickVote,
    },
  ];

  return (
    <div className={style.tournamentPage}>
      <div className={style.inner}>
        {cards.map(
          (
            {
              title,
              icon,
              buttonLabel,
              onClick,
              imgDefault,
              imgHover,
              imgClicked,
            },
            index
          ) => (
            <div key={index} className={style.card}>
              <p className={style.title}>{title}</p>

              <img className={style.back} src={cardBack} alt="" />

              <img className={style.icon} src={icon} alt="" />

              <ButtonCustom
                className={style.cardBtn}
                onClick={onClick}
                widthMobile={296}
                heightMobile={75}
                widthDesktop={296}
                heightDesktop={75}
                imgMobileDefault={imgDefault}
                imgMobileClick={imgClicked}
                imgDesktopDefault={imgDefault}
                imgDesktopHover={imgHover}
                imgDesktopClick={imgClicked}
              >
                <p></p>
              </ButtonCustom>

              {/*<button className={style.btn}*/}
              {/*        onClick={onClick}*/}
              {/*>*/}
              {/*    <img src={btn} alt=""/>*/}
              {/*    <p>{buttonLabel}</p>*/}
              {/*</button>*/}
            </div>
          )
        )}
      </div>
    </div>
  );
};
