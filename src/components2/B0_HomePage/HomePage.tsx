import * as React from "react";
import style from "./HomePage.module.scss";
import {
  setModal,
  setTestRecordingModal,
  setTournamentsWarningModal,
} from "../../store/appSlice";
import { useAppDispatch } from "../../store/hooks";
import { svgIcons } from "../../assets/svg/svgIcons";
import { HomeCard } from "./HomeCard/HomeCard";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";

import btnDefault from "../../assets/png/buttons/enter/default.png";
import btnHover from "../../assets/png/buttons/enter/hover.png";
import btnClick from "../../assets/png/buttons/enter/click.png";
import cardIcon0 from "../../assets/png/icons/home page/card icon 0.png";
import cardIcon1 from "../../assets/png/icons/home page/card icon 1.png";
import cardIcon2 from "../../assets/png/icons/home page/card icon 2.png";
import cardIcon3 from "../../assets/png/icons/home page/card icon 3.png";
import setupIcon from "../../assets/png/icons/home page/setup.png";

export interface IHomeCard {
  label: string;
  to: string;
  icon: string;
  onClick: () => void;
}

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const links = [
    {
      label: "Tournaments",
      to: "/app2/tournaments",
      icon: cardIcon0,
      onClick: () => {},
    },
    {
      label: "Loot Boxes",
      to: "/app2/loot",
      icon: cardIcon1,
      onClick: () => {},
    },
    /*{
      label: "Whitelist Marketplace",
      to: "/app2/marketplace",
      icon: cardIcon2,
      onClick: () => {},
    },*/
    {
      label: "Setup",
      to: "/app2/setup",
      icon: setupIcon,
      onClick: () => {},
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
