import * as React from "react";
import style from "./SetupPage.module.scss";
import {
  setGameplayModal,
  setGameplayUrl,
  setModal,
  setNickname,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
  setShowVerifiedButtons,
  setTestRecordingModal,
  setTOSModal,
  setTournamentsWarningModal,
} from "../../store/appSlice";
import { useAppDispatch } from "../../store/hooks";
import { svgIcons } from "../../assets/svg/svgIcons";
import { HomeCard } from "./HomeCard/HomeCard";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";

import bridgeIcon from "../../assets/png/icons/setup_page/bridge 1.png";
import stakeIcon from "../../assets/png/icons/setup_page/staking 1.png";
import tosIcon from "../../assets/png/icons/setup_page/tos.png";
import testRecordingIcon from "../../assets/png/icons/setup_page/test recording 1.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { desktopBreakPoint, tutorialVideoUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import {
  displayPopUpModal,
  EPopUpModal,
} from "../../components/cojodi/BackendCalls/BackendCalls";
import tutorialIcon from "../../assets/png/icons/tutorial_icon.png";
import imgDefaultTutorial from "../../assets/png/buttons/tutorial/tutorial_default.png";
import imgHoverTutorial from "../../assets/png/buttons/tutorial/tutorial_hover.png";
import imgClickTutorial from "../../assets/png/buttons/tutorial/tutorial_clicked.png";
export interface IHomeCard {
  label: string;
  to: string;
  icon: string;
  onClick: () => void;
}

export const SetupPage = () => {
  const dispatch = useAppDispatch();
  const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);
  const navigate = useNavigate();

  const links = [
    {
      icon: tutorialIcon,
      //to: "/app2/setup",
      to: "/app2/tutorials",
      label: "Tutorials",
      onClick: () => {},
    },
    {
      label: "Stake",
      to: "/app2/stake",
      icon: stakeIcon,
      onClick: () => {},
    },
    {
      label: "Bridge",
      to: "/app2/bridge",
      icon: bridgeIcon,
      onClick: () => {},
    },
    {
      label: "Terms of Service",
      to: "/app2/setup",
      icon: tosIcon,
      onClick: () => {
        dispatch(setTOSModal(true));
        dispatch(setModal(true));
      },
    },
    {
      label: "Test Recording",
      to: matchDesktop ? "/app2/setup" : "/app2/error",
      icon: testRecordingIcon,
      onClick: () => {
        matchDesktop
          ? dispatch(setTestRecordingModal(true))
          : dispatch(setModal(true));
      },
    },
    /*    {
      label: "Setup",
      to: "/app2/setup",
      icon: setupIcon,
      onClick: () => {
        dispatch(setTestRecordingModal(true));
        dispatch(setModal(true));
      },
    },*/
  ];

  return (
    <div className={style.homePage}>
      <div className={style.inner}>
        <div className={style.links}>
          {links.map((link, index) => (
            <HomeCard key={index} {...link} />
          ))}
        </div>

        {/*<ButtonCustom width={192}*/}
        {/*              height={80}*/}
        {/*              className={style.enterBtn}*/}
        {/*              imgDefault={btnDefault}*/}
        {/*              imgHover={btnHover}*/}
        {/*              imgClick={btnClick}*/}
        {/*              onClick={() => console.log("click")}*/}
        {/*/>*/}
      </div>
    </div>
  );
};
