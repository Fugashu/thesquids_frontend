import React, { FC, useEffect, useState } from "react";
import style from "./HeaderButtons.module.scss";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  claimPrizeAmount,
  discordUserName,
  dnaBalance,
  HomeModalEnum,
  lifeBalance,
  selectNickname,
  setBurgerOpen,
  setClaimablePrizeAmount,
  setDiscordUsername,
  setDNABalance,
  setGameTimer,
  setHomeModalType,
  setLifeBalance,
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
  setShowChooseTheCoinModal,
  setTournamentTimer,
  setVoteTimer,
  setWalletAddress,
  walletAddress,
} from "../../../store/appSlice";
import src0 from "../../../assets/png/header2/btn0.png";
import src1 from "../../../assets/png/header2/btn1.png";
import claimImg from "../../../assets/png/header2/btn2.png";

import src2 from "../../../assets/png/buttons/metamaskBtnIdle.png";
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  signer,
  waitForTransactionWithModal,
} from "../../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { store } from "../../../store/store";
import axios from "axios";
import { backendEndpoint } from "../../../constants";
import { CojodiNetworkSwitcher } from "../../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../../components/cojodi/BackendCalls/chainRpcData";
import { ethers } from "ethers";
import {
  fetchTournamentStats,
  fetchUser,
} from "../../../components/cojodi/BackendCalls/BackendCalls";

interface IHeaderButtons {
  className?: string;
}

export const HeaderButtons: FC<IHeaderButtons> = ({ className }) => {
  const dispatch = useAppDispatch();
  const walletAddr = useAppSelector(walletAddress);
  const nickName = useAppSelector(discordUserName);
  const dnaBal = useAppSelector(dnaBalance);
  const lifeBal = useAppSelector(lifeBalance);
  const claimableBalance = useAppSelector(claimPrizeAmount);

  // @ts-ignore
  useEffect(async () => {
    try {
      await connectWallet();
      await dispatch(setWalletAddress(await signer.getAddress()));
      let userId = localStorage.getItem("discordUserName");
      if (userId !== null) {
        dispatch(setDiscordUsername(userId));
      }

      let result = await fetchTournamentStats();
      /*
      console.log('Timestamps"');
      console.log(result["tournament_start_timestamp"]);
      console.log(result["game_start_timestamp"]);
      console.log(result["game_voting_start_timestamp"]);*/

      dispatch(setTournamentTimer(result["tournament_start_timestamp"]));
      dispatch(setGameTimer(result["game_start_timestamp"]));
      dispatch(setVoteTimer(result["game_voting_start_timestamp"]));

      let userBalance = ethers.utils.formatEther(
        await mumbaiTournamentContract.userBalances(
          await getConnectedSignerAddress()
        )
      );
      let userBalanceString = userBalance.toString();
      let num = Number(userBalanceString);
      dispatch(setClaimablePrizeAmount(num.toFixed(2)));
      let dnaBalanceOfUser = ethers.utils.formatEther(
        await mumbaiTokenContract.balanceOf(await getConnectedSignerAddress())
      );
      let dnaString = dnaBalanceOfUser.toString();
      num = Number(dnaString);

      dispatch(setDNABalance(num.toFixed(2)));

      let userResult = await fetchUser(await getConnectedSignerAddress());
      dispatch(setLifeBalance(userResult["lives"]));
    } catch (error) {}
  }, []);

  const buttons = [
    {
      src: claimImg,
      text: `Prize:${claimableBalance ? claimableBalance : null}`,
      label: "Claim",
      onClick: async () => {
        let tx = await mumbaiTournamentContract.claim();
        await waitForTransactionWithModal(tx);
      },
    },

    {
      src: src0,
      text: `Lives:${lifeBal}`,
      label: "Buy",
      onClick: () => {
        dispatch(setModal(true));
        dispatch(setHomeModalType(HomeModalEnum.lives));
        dispatch(setShowChooseTheCoinModal(true));
        dispatch(setBurgerOpen(false));
      },
    },
    {
      src: src1,
      text: `Balance:${dnaBal ? dnaBal : null}`,
      label: "Buy",
      onClick: () => {
        dispatch(setModal(true));
        dispatch(setHomeModalType(HomeModalEnum.dna));
        dispatch(setShowChooseTheCoinModal(true));
        dispatch(setBurgerOpen(false));
      },
    },
    {
      src: src2,
      text: walletAddr.slice(2, 5) + "..." + walletAddr.slice(-3),
      label: nickName,
      onClick: () => {
        dispatch(setBurgerOpen(false));
      },
    },
  ];

  return (
    <div className={clsx(style.headerButtons, className)}>
      {buttons.map(({ src, text, label, onClick }, index) => (
        <div key={index} className={style.btnBlock}>
          <img src={src} alt="" />
          <div className={style.right}>
            <p>{text}</p>
            <button onClick={onClick}>{label}</button>
          </div>
        </div>
      ))}
    </div>
  );
};
