import * as React from "react";
import style from "./TournamentPage.module.scss";
import { useAppDispatch } from "../../store/hooks";
import {
  setGameplayModal,
  setGameplayUrl,
  setModal,
  setNickname,
  setStakingNftErrorModal,
  setTournamentsModal,
  setTournamentsWarningModal,
  setVoteModal,
} from "../../store/appSlice";

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
import useCountdown from "react-hook-final-countdown";
import { useEffect, useState } from "react";

export const TournamentPage = () => {
  const dispatch = useAppDispatch();
  //todo
  const countdownGames = useCountdown(1653857541 * 1000, 1000);
  const countdownVotes = useCountdown(1653857541 * 1000, 1000);

  console.log();
  const cards = [
    {
      title: "IMPORTANT",
      //todo tutorial
      icon: cardIcon0,
      buttonLabel: "TUTORIAL",
      onClick: () => {
        dispatch(setNickname("THE SQUIDS TUTORIAL"));
        dispatch(setGameplayUrl(""));
        dispatch(setGameplayModal(true));
        dispatch(setModal(true));
      },
      imgDefault: imgDefaultPlay,
      imgHover: imgHoverPlay,
      imgClicked: imgClickPlay,
    },
    {
      title:
        "Start: " + new Date(countdownGames).toISOString().substring(8, 16),
      icon: cardIcon0,
      buttonLabel: "PLAY",
      onClick: () => {
        dispatch(setTournamentsWarningModal(true));
        dispatch(setModal(true));
      },
      imgDefault: imgDefaultPlay,
      imgHover: imgHoverPlay,
      imgClicked: imgClickPlay,
    },
    {
      title:
        "Start: " + new Date(countdownVotes).toISOString().substring(8, 16),
      icon: cardIcon2,
      buttonLabel: "VOTE",
      onClick: () => {
        dispatch(setModal(true));
        dispatch(setVoteModal(true));
        dispatch(setTournamentsModal(false));
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
