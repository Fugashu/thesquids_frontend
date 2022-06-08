import { FC, useState } from "react";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { desktopBreakPoint, PRODUCTION } from "../../../../../constants";
import style from "./CardLives.module.scss";
import { ICardLives } from "../ChooseTheCoinModal";
import btnMobile from "../../../../../assets/png/buttons/choose the coins/buyNowMobile.png";
import btnDesktop from "../../../../../assets/png/buttons/choose the coins/buyNowDesktop.png";
import compass from "../../../../../assets/png/icons/compass.png";
import dnaicon from "../../../../../assets/png/choose the coin/dna_icon.png";

import cardMobile from "../../../../../assets/png/cards/choose the coins modal card/mobile.png";
import cardDesktopDefault from "../../../../../assets/png/cards/choose the coins modal card/desktopDefault.png";
import cardDesktopHover from "../../../../../assets/png/cards/choose the coins modal card/desktopHover.png";
import cardDesktopClick from "../../../../../assets/png/cards/choose the coins modal card/desktopClick.png";
import { ButtonCustom } from "../../../ButtonCustom/ButtonCustom";

import mobileDefault from "../../../../../assets/png/buttons/choose the coin - lives - buy now/mobileDefault.png";
import mobileClick from "../../../../../assets/png/buttons/choose the coin - lives - buy now/mobileClick.png";
import desktopDefault from "../../../../../assets/png/buttons/choose the coin - lives - buy now/desktopDefault.png";
import desktopHover from "../../../../../assets/png/buttons/choose the coin - lives - buy now/desktopHover.png";
import desktopClick from "../../../../../assets/png/buttons/choose the coin - lives - buy now/desktopClick.png";
import { BigNumber } from "ethers";
import {
  getConnectedSignerAddress,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  waitForTransactionWithModal,
} from "../../../../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { mumbaiTournamentContractAddress } from "../../../../../components/cojodi/ContractConfig";
import {
  selectShowChooseTheCoinModal,
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
  setShowChooseTheCoinModal,
} from "../../../../../store/appSlice";
import { useAppDispatch } from "../../../../../store/hooks";
import { CojodiNetworkSwitcher } from "../../../../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../../../../components/cojodi/BackendCalls/chainRpcData";

export const CardLives: FC<ICardLives> = ({ lives, value }) => {
  const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const dispatch = useAppDispatch();
  const buyLives = async (numberOfLives: number) => {
    if (PRODUCTION) {
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.matic);
    } else {
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
    }
    let balance: BigNumber = await mumbaiTokenContract.balanceOf(
      await getConnectedSignerAddress()
    );

    let lifePrice: BigNumber = await mumbaiTournamentContract.lifeFee();

    console.log("The price of one life: " + lifePrice);

    let dnaAmount = lifePrice.mul(numberOfLives);

    if (balance.lt(dnaAmount)) {
      alert("You do not have enough WETH for this transaction.");
      return;
    }
    let allowanceValue = await mumbaiTokenContract.allowance(
      await getConnectedSignerAddress(),
      mumbaiTournamentContractAddress
    );

    if (allowanceValue.lt(dnaAmount)) {
      console.log(`setting allowance for dnaAmount: ${dnaAmount}`);
      let tx = await mumbaiTokenContract.approve(
        mumbaiTournamentContractAddress,
        dnaAmount
      );
      await waitForTransactionWithModal(tx);
    }

    let tx = await mumbaiTournamentContract.buyLives(numberOfLives);
    await waitForTransactionWithModal(tx);
    window.location.reload();
  };
  return (
    <div
      className={style.cardLives}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setClick(true)}
      onMouseUp={() => setClick(false)}
    >
      <img
        className={style.back}
        src={
          click
            ? matchDesktop
              ? cardDesktopClick
              : cardMobile
            : hover
            ? matchDesktop
              ? cardDesktopHover
              : cardMobile
            : matchDesktop
            ? cardDesktopDefault
            : cardMobile
        }
        alt=""
      />

      <div className={style.cardContent}>
        <p className={style.cardTitle}>{`${lives} ${
          lives === 1 ? "life" : "lives"
        }`}</p>

        <div className={style.compassBlock}>
          <p>{lives * value}</p>
          <img src={dnaicon} alt="" />
        </div>

        <ButtonCustom
          onClick={async () => {
            await buyLives(lives);
          }}
          className={style.buyBtn}
          widthMobile={233}
          heightMobile={40}
          widthDesktop={157}
          heightDesktop={40}
          imgMobileDefault={mobileDefault}
          imgMobileClick={mobileClick}
          imgDesktopDefault={desktopDefault}
          imgDesktopHover={desktopHover}
          imgDesktopClick={desktopClick}
        >
          <p>Buy Now</p>
        </ButtonCustom>
      </div>
    </div>
  );
};
