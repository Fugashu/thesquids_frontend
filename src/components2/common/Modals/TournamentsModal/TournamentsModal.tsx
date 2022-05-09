import * as React from "react";
import style from "./TournamentsModal.module.scss";
import { useRef } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { setModal, setTournamentsModal } from "../../../../store/appSlice";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";

import yesDefault from "../../../../assets/png/buttons/tournaments modal/yes/default.png";
import yesHover from "../../../../assets/png/buttons/tournaments modal/yes/hover.png";
import yesClick from "../../../../assets/png/buttons/tournaments modal/yes/click.png";

import noDefault from "../../../../assets/png/buttons/tournaments modal/no/default.png";
import noHover from "../../../../assets/png/buttons/tournaments modal/no/hover.png";
import noClick from "../../../../assets/png/buttons/tournaments modal/no/click.png";

import modalBack from "../../../../assets/png/modal/tournaments.png";
import { ButtonCustom } from "../../ButtonCustom/ButtonCustom";
import {
  getConnectedSignerAddress,
  signMessage,
} from "../../../../components/cojodi/MetamaskConnection/MetamaskWallet";

export const TournamentsModal = () => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setTournamentsModal(false));
  };

  useOutsideClick(ref, onClose);

  async function endGameVote(endTheGame: boolean) {
    let signedMessage = await signMessage({
      addr: await getConnectedSignerAddress(),
      vote: endTheGame,
    });
  }
  return (
    <div className={style.tournamentsModal}>
      <div className={style.content} ref={ref}>
        <img className={style.back} src={modalBack} alt="" />
        <p className={style.title}>Tournaments</p>
        {/*todo split the prize money between xxx*/}
        <p className={style.description}>
          Do you want to end the game and split the prize pool between {""}
          players?
        </p>
        <div className={style.buttons}>
          <ButtonCustom
            className={style.btnYes}
            widthMobile={358}
            heightMobile={75}
            widthDesktop={358}
            heightDesktop={75}
            imgMobileDefault={yesDefault}
            imgMobileClick={yesClick}
            imgDesktopDefault={yesDefault}
            imgDesktopHover={yesHover}
            imgDesktopClick={yesClick}
            onClick={() => endGameVote(true)}
          >
            <p>yes</p>
          </ButtonCustom>

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
            onClick={() => endGameVote(false)}
          >
            <p>no</p>
          </ButtonCustom>
        </div>
        <div className={style.votes}>
          {/*todo how many people voted for*/}
          <p>152 votes</p>
          <p>152 votes</p>
        </div>
      </div>
    </div>
  );
};
