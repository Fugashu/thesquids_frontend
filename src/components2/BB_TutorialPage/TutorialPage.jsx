import * as React from "react";

import style from "./TutorialPage.scss";
import { svgIcons } from "../../assets/svg/svgIcons";

import btn from "../../assets/png/buttons/staking page button/desktop.png";

import { useEffect, useState } from "react";
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiNFTContract,
  mumbaiTournamentContract,
  waitForTransactionWithModal,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { CojodiNetworkSwitcher } from "../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../components/cojodi/BackendCalls/chainRpcData";
import { mumbaiTournamentContractAddress } from "../../components/cojodi/ContractConfig";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";
import imgDefault from "../../assets/png/buttons/staking page button/default.png";
import imgClick from "../../assets/png/buttons/staking page button/click.png";
import imgHover from "../../assets/png/buttons/staking page button/click.png";
import {
  setGameplayModal,
  setGameplayUrl,
  setModal,
  setNickname,
} from "../../store/appSlice";
import { useAppDispatch } from "../../store/hooks";

import { PRODUCTION, tutorialVideoUrl } from "../../constants";

export const TutorialPage = () => {
  const dispatch = useAppDispatch();
  const tutorials = [
    {
      id: 1,
      image: "",
      videoTitle: "",
      videoUrl: "",
    },
    {
      id: 2,
      image: "",
      videoTitle: "",
      videoUrl: "",
    },
  ];

  const watch = (name, url) => {
    dispatch(setNickname(name));
    dispatch(setGameplayUrl(url));
    dispatch(setGameplayModal(true));
    dispatch(setModal(true));
  };

  return (
    <div className={style.stakingPage}>
      <div className={style.inner}>
        <div className={style.titleBlock}>
          <h2 className={style.title}>Tutorials:</h2>
        </div>
        <div className={style.cards}>
          {tutorials.map((tutorial) => (
            <div className={style.card} key={tutorial.id}>
              <div className={style.back}>{svgIcons.stackingPageCardBack}</div>
              <div className={style.content}>
                <img src={tutorial["image"]} alt="" className={style.nftGif} />
                <div className={style.buttons}>
                  <ButtonCustom
                    className={style.btnStaking}
                    onClick={() =>
                      watch(tutorial.videoTitle, tutorial.videoUrl)
                    }
                    widthMobile={139}
                    heightMobile={40}
                    widthDesktop={139}
                    heightDesktop={40}
                    imgMobileDefault={imgDefault}
                    imgMobileClick={imgClick}
                    imgDesktopDefault={imgDefault}
                    imgDesktopHover={imgHover}
                    imgDesktopClick={imgClick}
                  >
                    <p>Watch</p>
                  </ButtonCustom>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
