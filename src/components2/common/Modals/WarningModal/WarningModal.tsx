import * as React from "react";
import style from "./WarningModal.module.scss";
import { FC, useRef } from "react";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CloseButton } from "../CloseButton/CloseButton";
import numberCard from "../../../../assets/png/icons/numberCard.png";
import bntMobile from "../../../../assets/png/buttons/accept/mobile.png";
import bntDesktop from "../../../../assets/png/buttons/accept/desktop.png";
import { desktopBreakPoint } from "../../../../constants";

import imgMobileDefault from "../../../../assets/png/buttons/warning modal - accept/mobileDefault.png";
import imgMobileClick from "../../../../assets/png/buttons/warning modal - accept/mobileClick.png";
import imgDesktopDefault from "../../../../assets/png/buttons/warning modal - accept/desktopDefault.png";
import imgDesktopHover from "../../../../assets/png/buttons/warning modal - accept/desktopHover.png";
import imgDesktopClick from "../../../../assets/png/buttons/warning modal - accept/desktopClick.png";

import backMobile from "../../../../assets/png/modal/warning modal/mobile.png";
import backDesktop from "../../../../assets/png/modal/warning modal/desktop.png";
import { ButtonCustom } from "../../ButtonCustom/ButtonCustom";

const items = [
  "Make sure to read our TOS and policy before entering the tournaments",
  "You will not be able to purchase lives during the tournament, only before entering",
  "Test your recording, any entries without a gameplay recording will be voided",
  "You will need to Stake your Squids in order to enter and pay the $DNA fee to participate",
];

interface IWarningModal {
  onClose: () => void;
  onAccept: () => void;
}

export const WarningModal: FC<IWarningModal> = ({ onClose, onAccept }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);

  const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

  return (
    <div className={style.warningModal}>
      <div className={style.content} ref={ref}>
        <CloseButton onClick={onClose} className={style.closeButton} />

        <img
          className={style.back}
          src={matchDesktop ? backMobile : backDesktop}
          alt=""
        />

        <p className={style.title}>Warning!</p>

        <div className={style.items}>
          {items.map((item, index) => (
            <div className={style.itemBlock} key={index}>
              <div className={style.numberWrapper}>
                <img src={numberCard} alt="" />
                <span>{index + 1}</span>
              </div>

              <p>{item}</p>
            </div>
          ))}
        </div>

        <ButtonCustom
          className={style.acceptButton}
          widthMobile={289}
          heightMobile={75}
          widthDesktop={426}
          heightDesktop={75}
          imgMobileDefault={imgMobileDefault}
          imgMobileClick={imgMobileClick}
          imgDesktopDefault={imgDesktopDefault}
          imgDesktopHover={imgDesktopHover}
          imgDesktopClick={imgDesktopClick}
          onClick={onAccept}
        >
          <p>accept</p>
        </ButtonCustom>
      </div>
    </div>
  );
};
