import * as React from "react";
import style from "./HomePage.module.scss";
import {
  dnaBuyAmount,
  setDiscordUsername,
  setDNABalance,
  setGameTimer,
  setLifeBalance,
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
  setTestRecordingModal,
  setTournamentsWarningModal,
  setTournamentTimer,
  setVoteTimer,
  setWalletAddress,
  tournamentTimer,
  walletAddress,
} from "../../store/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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
import { useEffect } from "react";
import DiscordOauth2 from "discord-oauth2";
import {
  connectWallet,
  signMessage,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { createUser } from "../../components/cojodi/BackendCalls/BackendCalls";

import { clientId, clientSecret, redirectUrl } from "../../constants";
import { CojodiNetworkSwitcher } from "../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../components/cojodi/BackendCalls/chainRpcData";
import useCountdown from "react-hook-final-countdown";

export interface IHomeCard {
  label: string;
  to: string;
  icon: string;
  onClick: () => void;
}

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const countdown = useAppSelector(tournamentTimer);
  // @ts-ignore
  useEffect(async () => {
    try {
      await connectWallet();
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
    } catch (error) {}
  }, []);

  const countdownTournament = useCountdown(countdown * 1000, 1000);

  let min = countdownTournament % (1000 * 3600);
  let sec = min % (1000 * 60);

  let tournamentTime = `${Math.floor(
    countdownTournament / (1000 * 3600)
  )}:${Math.floor(min / (1000 * 60))}:${Math.floor(sec / 1000)} `;

  const queryParams = new URLSearchParams(window.location.search);
  const queryCode = queryParams.get("code");
  let countdownDate = new Date(countdownTournament);

  // @ts-ignore
  useEffect(async () => {
    await connectWallet();
    // @ts-ignore
    await discordCallback(queryCode);
  }, [""]);

  async function discordCallback(code: string) {
    console.log("called");
    console.log(code);
    if (code === null) {
      let username = window.localStorage.getItem("discordUserName");
      if (username !== null) {
        dispatch(setDiscordUsername(username));
      }
      return;
    }

    try {
      const oauth = new DiscordOauth2();
      await oauth
        .tokenRequest({
          clientId: clientId,
          clientSecret: clientSecret,
          code: code,
          scope: "identify",
          grantType: "authorization_code",
          redirectUri: redirectUrl,
        })
        .then((value) => {
          console.log(value);
          window.localStorage.setItem("discordAccessToken", value.access_token);
          try {
            oauth.getUser(value.access_token).then(async (user) => {
              console.log(user);
              window.localStorage.setItem("discordUserName", user.username);
              window.localStorage.setItem("discordUserId", user.id);
              if (typeof user.avatar === "string") {
                window.localStorage.setItem("discordUserAvatar", user.avatar);
              }
              dispatch(setDiscordUsername(user.username));

              let ob = {
                id: parseInt(user.id),
                username: user.username,
                //avatar_hash: window.localStorage.getItem("discordUserAvatar"),
              };

              let signedMessage = await signMessage(ob);
              console.log(signedMessage);
              await createUser(signedMessage);
            });
          } catch (e) {
            console.log("Could not get the user");
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch (e) {
      console.log("Error while fetching Discord Token");
      console.log(e);
    }
  }

  const links = [
    {
      label: "Tournaments",
      to: "/app2/tournaments",
      icon: cardIcon0,
      onClick: () => {},
    },
    {
      label: "Loot Boxes",
      to: "/app2",
      icon: cardIcon1,
      onClick: () => {
        dispatch(setPopUpModalTitle("Error"));
        dispatch(setPopUpModalText("Loot Boxes coming soon."));
        dispatch(setModal(true));
        dispatch(setOnPopUpModal(true));
      },
    },
    /*{
      label: "Loot Boxes",
      to: "/app2/loot",
      icon: cardIcon1,
      onClick: () => {},
    },*/
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
        {countdownTournament > 0 ? (
          <p className={style.timer}>{tournamentTime}</p>
        ) : (
          <p className={style.timer}>Now</p>
        )}

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
