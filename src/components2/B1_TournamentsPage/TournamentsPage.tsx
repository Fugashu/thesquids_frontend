import * as React from "react";
import { useEffect, useState } from "react";
import style from "./TournamentsPage.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CardItem } from "./CardItem/CardItem";
import { useAppDispatch } from "../../store/hooks";
import {
  setLeaderboardModal,
  setModal,
  setWinnerCards,
  setWinnersModal,
} from "../../store/appSlice";
import { useNavigate } from "react-router-dom";
import { desktopBreakPoint, PRODUCTION } from "../../constants";
import sandTimerIcon from "../../assets/png/icons/sandTimer.png";
import thropyIcon from "../../assets/png/icons/home page/card icon 0.png";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";

// leaderboard
import imgMobileDefault from "../../assets/png/buttons/tournaments page - leaderboard/lb_default.png";
import imgDesktopDefault from "../../assets/png/buttons/tournaments page - leaderboard/lb_default.png";
import imgMobileClick from "../../assets/png/buttons/tournaments page - leaderboard/lb_clicked.png";
import imgDesktopClick from "../../assets/png/buttons/tournaments page - leaderboard/lb_clicked.png";
import imgDesktopHover from "../../assets/png/buttons/tournaments page - leaderboard/lb_hover.png";

// enter
import mobileDefault from "../../assets/png/buttons/tournaments page - enter/enter_default.png";
import desktopDefault from "../../assets/png/buttons/tournaments page - enter/enter_default.png";
import mobileClick from "../../assets/png/buttons/tournaments page - enter/enter_clicked.png";
import desktopClick from "../../assets/png/buttons/tournaments page - enter/enter_clicked.png";
import desktopHover from "../../assets/png/buttons/tournaments page - enter/enter_hover.png";

//winners

import winnersIdle from "../../assets/png/buttons/tournaments page - enter/winners_idle.png";
import winnersClick from "../../assets/png/buttons/tournaments page - enter/winners_click.png";
import winnersHover from "../../assets/png/buttons/tournaments page - enter/winners_hover.png";
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  mumbaiWethContract,
  signMessage,
  waitForTransactionWithModal,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { ethers } from "ethers";
import {
  authorizeWithDiscord,
  createUser,
  displayPopUpModal,
  EPopUpModal,
  fetchTournamentStats,
  fetchUser,
  fetchWinnersForTournament,
} from "../../components/cojodi/BackendCalls/BackendCalls";
import {
  mumbaiTokenContractAddress,
  mumbaiTournamentContractAddress,
} from "../../components/cojodi/ContractConfig";
import { CojodiNetworkSwitcher } from "../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../components/cojodi/BackendCalls/chainRpcData";

export const TournamentsPage = () => {
  const [blockEnter, setBlockEnter] = useState(false);
  const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);
  const navigate = useNavigate();
  const [enterPrice, setEnterPrice] = useState("");
  const [pricePool, setPricePool] = useState("");
  const [participants, setParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  // @ts-ignore
  useEffect(async () => {
    await connectWallet();

    let enterPrice = ethers.utils.formatEther(
      await mumbaiTournamentContract.userBasedRegistrationFee(
        await getConnectedSignerAddress()
      )
    );
    let enterPriceString = enterPrice.toString();
    let num = Number(enterPriceString);

    let pricePool = ethers.utils.formatEther(
      await mumbaiTournamentContract.pricePool()
    );
    let pricePoolWithDNA = parseFloat(pricePool) + 400;

    let maxParticipants = await mumbaiTournamentContract.maxUsers();

    let result = await fetchTournamentStats();
    console.log(result);
    setParticipants(result["n_participants"]);

    console.log(await mumbaiTournamentContract.maxUsers());
    setEnterPrice(num.toFixed(2));
    setPricePool(pricePoolWithDNA.toString());
    setMaxParticipants(maxParticipants);
  }, []);

  const registerForTournament = async () => {
    let priceToPay = await mumbaiTournamentContract.userBasedRegistrationFee(
      await getConnectedSignerAddress()
    );

    let allowanceValue = await mumbaiTokenContract.allowance(
      await getConnectedSignerAddress(),
      mumbaiTournamentContractAddress
    );

    if (allowanceValue.lt(priceToPay)) {
      try {
        let tx = await mumbaiTokenContract.approve(
          mumbaiTournamentContractAddress,
          priceToPay
        );
        await waitForTransactionWithModal(tx);
      } catch (e) {
        displayPopUpModal(EPopUpModal.Error, "DNA approval failed.");
      }
    }

    try {
      let tx = await mumbaiTournamentContract.register();
      await waitForTransactionWithModal(tx);
    } catch (e) {
      displayPopUpModal(
        EPopUpModal.Error,
        "Registration failed. Do you have enough DNA?"
      );
    }
  };

  const isDiscordAuthorized = () => {
    //Check if discord auth token exists in db and create if not
    return !(
      window.localStorage.getItem("discordAccessToken") === null ||
      window.localStorage.getItem("discordUserName") === null
    );
  };
  const isUserInDatabase = async () => {
    let userResult = await fetchUser(await getConnectedSignerAddress());
    return userResult !== null;
  };
  const createNewUser = async () => {
    let idString = window.localStorage.getItem("discordUserId");
    if (idString !== null) {
      let ob = {
        id: parseInt(idString),
        username: window.localStorage.getItem("discordUserName"),
      };

      let signedMessage = await signMessage(ob);
      await createUser(signedMessage);
      return;
    }
    displayPopUpModal(EPopUpModal.Error, "Could not create User");
  };

  const isRegistrationPhase = async () => {
    let currentTournamentPhase = await mumbaiTournamentContract.currentPhase();
    return currentTournamentPhase === 1;
  };

  const isUserRegisteredForTournament = async () => {
    let userResult = await fetchUser(await getConnectedSignerAddress());
    return userResult["is_registered"];
  };

  const hasUserStakedNFT = async () => {
    let numNFTsStaked = await mumbaiTournamentContract.stakedBalance(
      await getConnectedSignerAddress()
    );
    if (numNFTsStaked > 0) {
      return true;
    } else {
      displayPopUpModal(EPopUpModal.Error, "Stake at least 1 NFT at Setup.");
      return false;
    }
  };

  const onClickEnter = async () => {
    if (PRODUCTION) {
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.matic);
    } else {
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
    }
    if (!isDiscordAuthorized()) {
      authorizeWithDiscord();
      return;
    }

    if (!(await isUserInDatabase())) {
      await createNewUser();
      return;
    }

    if (await isRegistrationPhase()) {
      if (await isUserRegisteredForTournament()) {
        displayPopUpModal(
          EPopUpModal.Info,
          "You are already registered. The games will start soon."
        );
        return;
      }
      if (await hasUserStakedNFT()) {
        await registerForTournament();
        return;
      }
      return;
    }

    if (!(await isUserRegisteredForTournament())) {
      displayPopUpModal(
        EPopUpModal.Info,
        "Registration is not open or a tournament is ongoing."
      );
      return;
    }

    matchDesktop ? navigate("/app2/tournament") : navigate("/app2/error");
  };

  const cards = [
    {
      title: "Tournament 0",
      items: [
        { title: "Enter price (DNA)", value: enterPrice },
        { title: "Prize pool (DNA)", value: pricePool },
        { title: "Participants", value: `${participants}/${maxParticipants}` },
      ],
      onClick: onClickEnter,
    },
  ];

  const dispatch = useAppDispatch();
  const onLeaderboard = () => {
    dispatch(setModal(true));
    dispatch(setLeaderboardModal(true));
  };

  const openWinnersModal = async (tournamentId: number) => {
    let winners = await fetchWinnersForTournament(tournamentId);
    dispatch(setWinnerCards(winners));
    dispatch(setModal(true));
    dispatch(setWinnersModal(true));
  };
  return (
    <div className={style.tournamentsPage}>
      <div className={style.inner}>
        <div className={style.titleBlock}>
          <h2 className={style.title}>Tournaments</h2>

          <ButtonCustom
            className={style.leaderboardBtn}
            onClick={onLeaderboard}
            widthMobile={287}
            heightMobile={75}
            widthDesktop={360}
            heightDesktop={75}
            imgMobileDefault={imgMobileDefault}
            imgMobileClick={imgMobileClick}
            imgDesktopDefault={imgDesktopDefault}
            imgDesktopHover={imgDesktopHover}
            imgDesktopClick={imgDesktopClick}
          >
            <p></p>
          </ButtonCustom>
        </div>

        <div className={style.cards}>
          {cards.map((card, index) => (
            <CardItem key={index}>
              <>
                <p className={style.title}>{card.title}</p>
                <div className={style.items}>
                  {card.items.map(({ title, value }, index) => (
                    <div className={style.item} key={index}>
                      <p className={style.title}>{title}</p>
                      <p className={style.value}>{value}</p>
                    </div>
                  ))}
                </div>

                {blockEnter ? null : (
                  <ButtonCustom
                    className={style.enterBtn}
                    onClick={card.onClick}
                    widthMobile={240}
                    heightMobile={40}
                    widthDesktop={294}
                    heightDesktop={40}
                    imgMobileDefault={mobileDefault}
                    imgMobileClick={mobileClick}
                    imgDesktopDefault={desktopDefault}
                    imgDesktopHover={desktopHover}
                    imgDesktopClick={desktopClick}
                  >
                    <p></p>
                  </ButtonCustom>
                )}
              </>
            </CardItem>
          ))}
          <CardItem>
            <>
              <p className={style.title}>Tournament 1</p>
              <p className={style.soon}>ENDED</p>
              <img className={style.trophy} src={thropyIcon} alt="" />
              <ButtonCustom
                className={style.enterBtn}
                onClick={() => openWinnersModal(8)}
                widthMobile={240}
                heightMobile={40}
                widthDesktop={294}
                heightDesktop={40}
                imgMobileDefault={winnersIdle}
                imgMobileClick={winnersClick}
                imgDesktopDefault={winnersIdle}
                imgDesktopHover={winnersHover}
                imgDesktopClick={winnersClick}
              >
                <p></p>
              </ButtonCustom>
            </>
          </CardItem>
          <CardItem>
            <>
              <p className={style.title}>Tournament 2</p>
              <p className={style.soon}>soon</p>
              <img className={style.sandTimer} src={sandTimerIcon} alt="" />
            </>
          </CardItem>
        </div>
      </div>
    </div>
  );
};
