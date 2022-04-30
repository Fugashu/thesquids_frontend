import * as React from "react";
import style from "./HomePage.module.scss";
import { setModal, setTournamentsWarningModal } from "../../store/appSlice";
import { useAppDispatch } from "../../store/hooks";
import { svgIcons } from "../../assets/svg/svgIcons";
import { HomeCard } from "./HomeCard/HomeCard";

import trophyImg from "../../assets/png/newiconstheo/trophy 1.png";
import lootBoxImg from "../../assets/png/newiconstheo/loot box 1.png";
import whitelistMarketplaceImg from "../../assets/png/newiconstheo/whitelist marketplace 1.png";
import testRecordingImg from "../../assets/png/newiconstheo/test recording 1.png";
import BackendCallsInterface from "../../components/cojodi/BackendCalls/BackendCallsInterface";

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
      to: "/app2",
      icon: trophyImg,
      onClick: () => {
        dispatch(setTournamentsWarningModal(true));
        dispatch(setModal(true));
      },
    },
    {
      label: "Loot Boxes",
      to: "/app2/loot",
      icon: lootBoxImg,
      onClick: () => {},
    },
    {
      label: "Whitelist Marketplace",
      to: "/app2/wallet",
      icon: whitelistMarketplaceImg,
      onClick: () => {},
    },
    {
      label: "Test Recording",
      to: "/app2/marketplace",
      icon: testRecordingImg,
      onClick: () => {},
    },
  ];

  return (
    <div className={style.homePage}>
      <div className={style.inner}>
        <h1>First Tournament starting in:</h1>
        <p className={style.timer}>3D:24H:24M</p>
        <BackendCallsInterface />

        <div className={style.links}>
          {links.map((link, index) => (
            <HomeCard key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};
