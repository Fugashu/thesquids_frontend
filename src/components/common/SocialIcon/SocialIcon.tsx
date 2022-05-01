import React, { FC } from "react";
import style from "./socialIcon.module.scss";

import metamaskD from "../../../assets/png/buttons/metamaskBtnIdle.png";
import metamaskH from "../../../assets/png/buttons/metamaskBtnHover.png";
import metamaskC from "../../../assets/png/buttons/metamaskBtnIPressed.png";

import twitterD from "../../../assets/png/buttons/twitterBtnIdle.png";
import twitterH from "../../../assets/png/buttons/twitterBtnHover.png";
import twitterC from "../../../assets/png/buttons/twitterBtnIPressed.png";

import openSeaD from "../../../assets/svg/buttons/openSea-d.svg";
import openSeaH from "../../../assets/svg/buttons/openSea-h.svg";
import openSeaC from "../../../assets/svg/buttons/openSea-c.svg";

import discordD from "../../../assets/png/buttons/discordBtnIdle.png";
import discordH from "../../../assets/png/buttons/discordBtnHover.png";
import discordC from "../../../assets/png/buttons/discordBtnIPressed.png";

import linktreeD from "../../../assets/png/buttons/linktreeD.png";
import linktreeH from "../../../assets/png/buttons/linktreeH.png";
import linktreeC from "../../../assets/png/buttons/linktreeC.png";

import { ButtonLink } from "../ButtonLink/ButtomLink";
import clsx from "clsx";

export interface ISocialIcon {
  icon: string;
  className?: string;
  onClick?: () => void;
}

export interface IIcons {
  [key: string]: {
    default: string;
    hover: string;
    click: string;
    href: string;
  };
}

export const icons: IIcons = {
  metamask: {
    default: metamaskD,
    hover: metamaskH,
    click: metamaskC,
    href: "",
  },
  twitter: {
    default: twitterD,
    hover: twitterH,
    click: twitterC,
    href: "https://twitter.com/TheSquids_NFT",
  },
  openSea: {
    default: openSeaD,
    hover: openSeaH,
    click: openSeaC,
    href: "",
  },
  discord: {
    default: discordD,
    hover: discordH,
    click: discordC,
    href: "https://discord.com/invite/thesquids",
  },
  linktree: {
    default: linktreeD,
    hover: linktreeH,
    click: linktreeC,
    href: "https://linktr.ee/thesquids",
  },
};

export const SocialIcon: FC<ISocialIcon> = ({ icon, className, onClick }) => {
  return (
    <ButtonLink
      imgDefault={icons[icon].default}
      imgHover={icons[icon].hover}
      imgClick={icons[icon].click}
      href={icons[icon].href}
      className={clsx(style.socialIcon, className)}
      onClickHandler={onClick}
    />
  );
};
