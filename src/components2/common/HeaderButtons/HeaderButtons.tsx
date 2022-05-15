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
  setHomeModalType,
  setLifeBalance,
  setModal,
  setShowChooseTheCoinModal,
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
} from "../../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { store } from "../../../store/store";
import axios from "axios";
import { backendEndpoint } from "../../../constants";
import { CojodiNetworkSwitcher } from "../../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../../components/cojodi/BackendCalls/chainRpcData";
import { ethers } from "ethers";

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

      let userBalance = ethers.utils.formatEther(
        await mumbaiTournamentContract.userBalances(
          await getConnectedSignerAddress()
        )
      );
      let userBalanceSrting = userBalance.toString();
      let num = Number(userBalanceSrting);
      dispatch(setClaimablePrizeAmount(num.toFixed(2)));
      let dnaBalanceOfUser = ethers.utils.formatEther(
        await mumbaiTokenContract.balanceOf(await getConnectedSignerAddress())
      );
      let dnaString = dnaBalanceOfUser.toString();
      num = Number(dnaString);

      dispatch(setDNABalance(num.toFixed(2)));
      await axios
        .get(backendEndpoint + `/user/${await signer.getAddress()}`)
        .then(function (res) {
          dispatch(setLifeBalance(res.data.lives));
        });
    } catch (error) {}
  }, [walletAddr]);

  const buttons = [
    {
      src: claimImg,
      text: `Prize:${claimableBalance ? claimableBalance : null}`,
      label: "Claim",
      onClick: async () => {
        let tx = await mumbaiTournamentContract.claim();
        await tx.wait();
      },
    },

    {
      src: src0,
      text: `Balance:${lifeBal}`,
      label: "Buy more",
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
      label: "Buy more",
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
