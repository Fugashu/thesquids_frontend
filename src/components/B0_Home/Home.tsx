import React, { FC, useCallback, useEffect, useState } from "react";
import style from "./home.module.scss";
import DiscordOauth2 from "discord-oauth2";
// import background from "../../assets/gif/home-back.gif";
import { SocialIcon } from "../common/SocialIcon/SocialIcon";
import enterD from "../../assets/png/buttons/button main.png";
import enterH from "../../assets/png/buttons/button main (1).png";
import enterC from "../../assets/png/buttons/button main (2).png";

import { ButtonLink } from "../common/ButtonLink/ButtomLink";
// @ts-ignore
import GlitchText from "react-glitch-effect/core/GlitchText";
import { MetaMaskButton } from "../cojodi/MetamaskConnection/connectToMetamaskButton";

import connectD from "../../assets/png/buttons/metamaskBtnIdle.png";
import connectH from "../../assets/png/buttons/metamaskBtnHover.png";
import connectC from "../../assets/png/buttons/metamaskBtnIPressed.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  isUnlocked,
  signer,
} from "../cojodi/MetamaskConnection/MetamaskWallet";
import {
  selectOnErrorModal,
  setErrorModalText,
  setModal,
  setOnErrorModal,
  setWalletAddress,
} from "../../store/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { stringify } from "querystring";
import axios from "axios";
import { authorizeWithDiscord } from "../cojodi/BackendCalls/BackendCalls";
import { OnErrorModal } from "../../components2/common/Modals/OnErrorModal/OnErrorModal";
interface IHome {
  onClickHandler: () => void;
}

export const Home: FC<IHome> = () => {
  const onErrorModal = useAppSelector(selectOnErrorModal);

  const dispatch = useAppDispatch();

  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const navigateToTournament = useCallback(
    () => navigate("/app2", { replace: true }),
    [navigate]
  );
  async function tryNavigateToTournament() {
    if (!(await isUnlocked())) {
      dispatch(setErrorModalText("Connect your Metamask wallet."));
      dispatch(setModal(true));
      dispatch(setOnErrorModal(true));
      return;
    }

    if (
      window.localStorage.getItem("discordAccessToken") === null ||
      window.localStorage.getItem("discordUserName") === null
    ) {
      authorizeWithDiscord();
      return;
    }
    navigateToTournament();
  }
  return (
    <section
      className={style.home}
      // style={{backgroundImage: `url(${background})`}}
    >
      <div className={style.innerWrapper}>
        {onErrorModal && <OnErrorModal />}
        <GlitchText
          duration={3000}
          color1="rgba(30, 171, 245, 1)"
          color2="rgba(245, 0, 87, 1)"
          disabled={isDisabled}
        >
          <h1
            className={style.title}
            onMouseLeave={() => setDisabled(true)}
            onMouseOver={() => setDisabled(false)}
          >
            A game away from prosperity
          </h1>
        </GlitchText>

        <ButtonLink
          imgDefault={enterD}
          imgHover={enterH}
          imgClick={enterC}
          className={style.enterButton}
          onClick={tryNavigateToTournament}
        />

        <div className={style.icons}>
          {["twitter", "linktree"].map((icon) => (
            <SocialIcon key={icon} icon={icon} className={style.icon} />
          ))}

          <MetaMaskButton
            connectH={connectH}
            connectC={connectC}
            connectD={connectD}
          />
        </div>
      </div>
    </section>
  );
};
