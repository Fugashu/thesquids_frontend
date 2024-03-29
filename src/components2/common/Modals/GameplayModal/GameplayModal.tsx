import * as React from "react";
import style from "./GameplayModal.module.scss";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  gameplayUrl,
  highScoreId,
  selectNickname,
  setGameplayModal,
  setHighscoreId,
  setModal,
  verifiedButtonsActive,
} from "../../../../store/appSlice";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CloseButton } from "../CloseButton/CloseButton";
import { desktopBreakPoint } from "../../../../constants";

import modalMobile from "../../../../assets/png/modal/gameplay/mobile.png";
import modalDesktop from "../../../../assets/png/modal/gameplay/desktop.png";
import fieldMobile from "../../../../assets/png/cards/gameplay modal field/mobile.png";
import fieldDesktop from "../../../../assets/png/cards/gameplay modal field/desktop.png";
import { ButtonCustom } from "../../ButtonCustom/ButtonCustom";

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
import { signMessage } from "../../../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { voteHighscore } from "../../../../components/cojodi/BackendCalls/BackendCalls";

export const GameplayModal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scoreId = useAppSelector(highScoreId);
  const nickname = useAppSelector(selectNickname);
  const videoUrl = useAppSelector(gameplayUrl);
  const showVerifiedButtons = useAppSelector(verifiedButtonsActive);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setGameplayModal(false));
  };

  useOutsideClick(ref, onClose);

  const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

  async function vote(voteBool: boolean) {
    let ob = {
      up: voteBool,
      down: !voteBool,
      highscore_id: scoreId,
    };
    let signedMsg = await signMessage(ob);
    console.log(signedMsg);
    await voteHighscore(signedMsg);
  }
  return (
    <div className={style.gameplayModal}>
      <div className={style.content} ref={ref}>
        <CloseButton onClick={onClose} className={style.closeButton} />

        <img
          className={style.backModal}
          src={matchDesktop ? modalDesktop : modalMobile}
          alt=""
        />

        <p className={style.title}>
          <span>{nickname}</span>
          {showVerifiedButtons ? <span> Gameplay</span> : null}
        </p>

        <div className={style.field}>
          <iframe
            allowFullScreen={true}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              border: 0,
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              overflow: "hidden",
            }}
            src={videoUrl + "?title=0&byline=0&portrait=0"}
          />
        </div>
        {showVerifiedButtons ? (
          <div className={style.buttons}>
            <ButtonCustom
              className={style.legitBtn}
              widthMobile={256}
              heightMobile={75}
              widthDesktop={288}
              heightDesktop={75}
              imgMobileDefault={imgMobileDefault}
              imgMobileClick={imgMobileClick}
              imgDesktopDefault={imgDesktopDefault}
              imgDesktopHover={imgDesktopHover}
              imgDesktopClick={imgDesktopClick}
              onClick={() => vote(true)}
            >
              <p>Verified</p>
            </ButtonCustom>

            <ButtonCustom
              className={style.cheatingBtn}
              widthMobile={256}
              heightMobile={75}
              widthDesktop={288}
              heightDesktop={75}
              imgMobileDefault={mobileDefault}
              imgMobileClick={mobileClick}
              imgDesktopDefault={desktopDefault}
              imgDesktopHover={desktopHover}
              imgDesktopClick={desktopClick}
              onClick={() => vote(false)}
            >
              <p>Suspect</p>
            </ButtonCustom>
          </div>
        ) : null}
      </div>
    </div>
  );
};
