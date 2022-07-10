import * as React from "react";
import style from "./TournamentPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  gameTimer,
  playersAdvancing,
  setGameplayModal,
  setGameplayUrl,
  setModal,
  setNickname,
  setStakingNftErrorModal,
  setTournamentsModal,
  setTournamentsWarningModal,
  setVoteModal,
  voteTimer,
} from "../../store/appSlice";

import cardBack from "../../assets/png/cards/tournament page/desktop.png";
import cardIcon0 from "../../assets/png/icons/tournament page/card icon 0.png";
import cardIcon1 from "../../assets/png/icons/tournament page/card icon 1.png";
import cardIcon2 from "../../assets/png/icons/tournament page/card icon 2.png";
import tutorialIcon from "../../assets/png/icons/tutorial_icon.png";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";

import imgDefaultPlay from "../../assets/png/buttons/tournament page card/play_default.png";
import imgHoverPlay from "../../assets/png/buttons/tournament page card/play_hover.png";
import imgClickPlay from "../../assets/png/buttons/tournament page card/play_clicked.png";

import imgDefaultTutorial from "../../assets/png/buttons/tutorial/tutorial_default.png";
import imgHoverTutorial from "../../assets/png/buttons/tutorial/tutorial_hover.png";
import imgClickTutorial from "../../assets/png/buttons/tutorial/tutorial_clicked.png";

import imgDefaultVote from "../../assets/png/buttons/tournament page card/vote_default.png";
import imgHoverVote from "../../assets/png/buttons/tournament page card/vote_hover.png";
import imgClickVote from "../../assets/png/buttons/tournament page card/vote_clicked.png";
import useCountdown from "react-hook-final-countdown";
import { useEffect, useState } from "react";

export const TournamentPage = () => {
  const dispatch = useAppDispatch();
  const advancing = useAppSelector(playersAdvancing);
  const cdGames = useAppSelector(gameTimer);
  const cdVotes = useAppSelector(voteTimer);
  const countdownGames = useCountdown(cdGames * 1000, 1000);
  const countdownVotes = useCountdown(cdVotes * 1000, 1000);

  let minGames = countdownGames % (1000 * 3600);
  let secGames = minGames % (1000 * 60);
  let gameTime =
    countdownGames > 0
      ? `${Math.floor(countdownGames / (1000 * 3600))}:${Math.floor(
          minGames / (1000 * 60)
        )}:${Math.floor(secGames / 1000)} `
      : "Now";

  let minVotes = countdownVotes % (1000 * 3600);
  let secVotes = minVotes % (1000 * 60);
  let voteTime =
    countdownVotes > 0
      ? `${Math.floor(countdownVotes / (1000 * 3600))}:${Math.floor(
          minVotes / (1000 * 60)
        )}:${Math.floor(secVotes / 1000)} `
      : "Now";

  const cards = [
    {
      title: "Start: " + gameTime,
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
      title: "Start: " + voteTime,
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
      {advancing === undefined || advancing === 0 ? null : (
        <p style={{ display: "flex", justifyContent: "center" }}>
          Only {advancing} players will advance to the next round
        </p>
      )}
    </div>
  );
};
