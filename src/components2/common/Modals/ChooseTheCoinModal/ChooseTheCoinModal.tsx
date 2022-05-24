import * as React from "react";
import style from "./ChooseTheCoinModal.module.scss";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import {
  dnaBuyAmount,
  HomeModalEnum,
  selectHomeModalType,
  setHomeModalType,
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
  setShowChooseTheCoinModal,
} from "../../../../store/appSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CloseButton } from "../CloseButton/CloseButton";
import { TopButton } from "./TopButton/TopButton";
import { desktopBreakPoint, PRODUCTION } from "../../../../constants";
import { InputCustom } from "./InputCustom/InputCustom";
import buyBtnDnaMobile from "../../../../assets/png/buttons/choose the coins/dna - buy/mobile.png";
import buyBtnDnaDesktop from "../../../../assets/png/buttons/choose the coins/dna - buy/desktop.png";
import clsx from "clsx";
import backLivesMobile from "../../../../assets/png/choose the coin/back lives mobile.png";
import backLivesDesktop from "../../../../assets/png/choose the coin/back lives desktop.png";
import backDnaMobile from "../../../../assets/png/choose the coin/back dna mobile.png";
import backDnaDesktop from "../../../../assets/png/choose the coin/back dna desktop.png";
import heart from "../../../../assets/png/icons/heart.png";
import { CardLives } from "./CardLives/CardLives";
import compass from "../../../../assets/png/icons/compass.png";
import { ButtonCustom } from "../../ButtonCustom/ButtonCustom";

import imgMobileDefault from "../../../../assets/png/buttons/choose the coins - dna - buy/mobileDefault.png";
import imgMobileClick from "../../../../assets/png/buttons/choose the coins - dna - buy/mobileClick.png";
import imgDesktopDefault from "../../../../assets/png/buttons/choose the coins - dna - buy/desktopDefault.png";
import imgDesktopHover from "../../../../assets/png/buttons/choose the coins - dna - buy/desktopHover.png";
import imgDesktopClick from "../../../../assets/png/buttons/choose the coins - dna - buy/desktopClick.png";
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  mumbaiWethContract,
  waitForTransactionWithModal,
} from "../../../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { CojodiNetworkSwitcher } from "../../../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../../../components/cojodi/BackendCalls/chainRpcData";
import { BigNumber, ethers } from "ethers";
import { mumbaiTokenContractAddress } from "../../../../components/cojodi/ContractConfig";

export interface ICardLives {
  lives: number;
  value: number;
}

const cards: ICardLives[] = [
  { lives: 1, value: -1 },
  { lives: 2, value: -1 },
  { lives: 3, value: -1 },
  { lives: 10, value: -1 },
];

export const ChooseTheCoinModal = () => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setHomeModalType(HomeModalEnum.dna));
    dispatch(setShowChooseTheCoinModal(false));
  };

  useOutsideClick(ref, onClose);

  const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

  const homeModalType = useAppSelector(selectHomeModalType);
  const dnaAmount = useAppSelector(dnaBuyAmount);
  const [priceOfOneToken, setPriceOfOneToken] = useState(0);
  const [lifePrice, setLifePrice] = useState("");
  // @ts-ignore
  useEffect(async () => {
    await connectWallet();

    if (PRODUCTION) {
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.matic);
    }
    await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);

    setLifePrice(
      ethers.utils.formatEther(await mumbaiTournamentContract.lifeFee())
    );
    let gweiPrice = ethers.utils.formatEther(await mumbaiTokenContract.price());
    console.log(gweiPrice);

    // @ts-ignore
    setPriceOfOneToken(gweiPrice.toString());
  }, [dnaAmount]);

  const buyDNA = async (tokenAmount: number) => {
    let balance: BigNumber = await mumbaiWethContract.balanceOf(
      await getConnectedSignerAddress()
    );

    let price: BigNumber = await mumbaiTokenContract.price();
    let ethAmount = price.mul(tokenAmount);

    if (balance.lt(ethAmount)) {
      alert("You do not have enough WETH for this transaction.");
      return;
    }
    let allowanceValue = await mumbaiWethContract.allowance(
      await getConnectedSignerAddress(),
      mumbaiTokenContractAddress
    );

    if (allowanceValue.lt(ethAmount)) {
      console.log(`setting allowance for ${ethAmount}`);
      let tx = await mumbaiWethContract.approve(
        mumbaiTokenContractAddress,
        ethAmount
      );

      await waitForTransactionWithModal(tx);
    }

    let tx = await mumbaiTokenContract.buy(ethAmount);
    await waitForTransactionWithModal(tx);
    window.location.reload();
  };

  return (
    <div className={style.chooseTheCoinModal}>
      <div
        className={clsx({
          [style.content]: true,
          [style.content_dna]: homeModalType === HomeModalEnum.dna,
          [style.content_lives]: homeModalType === HomeModalEnum.lives,
        })}
        ref={ref}
      >
        <CloseButton onClick={onClose} className={style.closeButton} />

        {homeModalType === HomeModalEnum.lives && (
          <img
            src={matchDesktop ? backLivesDesktop : backLivesMobile}
            alt=""
            className={style.backLives}
          />
        )}

        {homeModalType === HomeModalEnum.dna && (
          <img
            src={matchDesktop ? backDnaDesktop : backDnaMobile}
            alt=""
            className={style.backDna}
          />
        )}

        <p className={style.title}>Choose the coin</p>

        <div className={style.topButtons}>
          <TopButton
            type={HomeModalEnum.dna}
            checked={homeModalType === HomeModalEnum.dna}
            onClick={() => dispatch(setHomeModalType(HomeModalEnum.dna))}
          />
          <TopButton
            type={HomeModalEnum.lives}
            checked={homeModalType === HomeModalEnum.lives}
            onClick={() => dispatch(setHomeModalType(HomeModalEnum.lives))}
          />
        </div>

        {homeModalType === HomeModalEnum.dna && (
          <div className={style.dnaContent}>
            <InputCustom />

            <div className={style.totalBlock}>
              <p>total</p>
              <div>
                <p>
                  {dnaAmount
                    ? (parseInt(dnaAmount) * priceOfOneToken).toFixed(5)
                    : ""}
                </p>
                <img src={compass} alt="" />
              </div>
            </div>

            <ButtonCustom
              className={style.buyBtn}
              widthMobile={288}
              heightMobile={48}
              widthDesktop={560}
              heightDesktop={75}
              imgMobileDefault={imgMobileDefault}
              imgMobileClick={imgMobileClick}
              imgDesktopDefault={imgDesktopDefault}
              imgDesktopHover={imgDesktopHover}
              imgDesktopClick={imgDesktopClick}
              onClick={() => buyDNA(parseInt(dnaAmount))}
            >
              <p>BUY</p>
            </ButtonCustom>
          </div>
        )}

        {homeModalType === HomeModalEnum.lives && (
          <div className={style.livesContent}>
            {matchDesktop && (
              <img src={heart} alt="" className={style.heartIcon} />
            )}

            {cards.map((card, index) => (
              <CardLives
                key={index}
                lives={card.lives}
                value={parseInt(lifePrice)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
