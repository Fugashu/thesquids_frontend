import React, { FC, useEffect, useState } from "react";
import style from "./HeaderButtons.module.scss";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  discordUserName,
  HomeModalEnum,
  selectNickname,
  setBurgerOpen,
  setHomeModalType,
  setModal,
  setShowChooseTheCoinModal,
  setWalletAddress,
  walletAddress,
} from "../../../store/appSlice";
import src0 from "../../../assets/png/header2/btn0.png";
import src1 from "../../../assets/png/header2/btn1.png";
import src2 from "../../../assets/png/buttons/metamaskBtnIdle.png";
import {
  connectWallet,
  signer,
} from "../../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { store } from "../../../store/store";

interface IHeaderButtons {
  className?: string;
}

export const HeaderButtons: FC<IHeaderButtons> = ({ className }) => {
  const dispatch = useAppDispatch();
  const walletAddr = useAppSelector(walletAddress);
  const nickName = useAppSelector(discordUserName);
  // @ts-ignore
  useEffect(async () => {
    try {
      await connectWallet();
      await dispatch(setWalletAddress(await signer.getAddress()));
    } catch (error) {}
  }, [walletAddr]);

  const buttons = [
    {
      src: src0,
      //todo DIMI balance
      text: "Balance:3",
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
      //todo DIMI balance
      text: "Balance:3",
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
