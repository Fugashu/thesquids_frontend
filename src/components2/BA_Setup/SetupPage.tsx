import * as React from "react";
import style from "./SetupPage.module.scss";
import {
  setModal,
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
import { desktopBreakPoint } from "../../constants";
import { useNavigate } from "react-router-dom";
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
        //todo tos modal
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
        <h1>First Tournament starting in:</h1>
        <p className={style.timer}>3D:24H:24M</p>

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
