import * as React from "react";
import { useEffect, useState } from "react";
import style from "./TournamentsPage.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CardItem } from "./CardItem/CardItem";
import { useAppDispatch } from "../../store/hooks";
import {
  setLeaderboardModal,
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
} from "../../store/appSlice";
import { useNavigate } from "react-router-dom";
import { desktopBreakPoint } from "../../constants";
import sandTimerIcon from "../../assets/png/icons/sandTimer.png";
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
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  signMessage,
  waitForTransactionWithModal,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { ethers } from "ethers";
import {
  authorizeWithDiscord,
  createUser,
  fetchTournamentStats,
  fetchUser,
} from "../../components/cojodi/BackendCalls/BackendCalls";
import { mumbaiTournamentContractAddress } from "../../components/cojodi/ContractConfig";

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
    let maxParticipants = await mumbaiTournamentContract.maxUsers();
    console.log(await fetchTournamentStats());
    let result = await fetchTournamentStats();

    setParticipants(result["n_participants"]);

    console.log(await mumbaiTournamentContract.maxUsers());
    setEnterPrice(num.toFixed(2));
    setPricePool(pricePool);
    setMaxParticipants(maxParticipants);
  }, []);

  const registerForTournament = async () => {
    setBlockEnter(true);

    let priceToPay = await mumbaiTournamentContract.userBasedRegistrationFee(
      await getConnectedSignerAddress()
    );
    console.log(priceToPay);
    try {
      let tx = await mumbaiTokenContract.approve(
        mumbaiTournamentContractAddress,
        priceToPay
      );
      await waitForTransactionWithModal(tx);
    } catch (e) {
      console.log(`Error while approving DNA: ${e}`);
      dispatch(setPopUpModalTitle("Error"));
      dispatch(setPopUpModalText("DNA approval failed"));
      dispatch(setModal(true));
      dispatch(setOnPopUpModal(true));
    }
    dispatch(setModal(false));
    dispatch(setOnPopUpModal(false));

    try {
      let tx = await mumbaiTournamentContract.register();
      await waitForTransactionWithModal(tx);
    } catch (e) {
      console.log(`Error while registering for tournament: ${e}`);
    }
    dispatch(setModal(false));
    dispatch(setOnPopUpModal(false));
    setBlockEnter(false);
  };

  const onClickTournamentOne = async () => {
    let currentTournamentPhase = await mumbaiTournamentContract.currentPhase();
    console.log(currentTournamentPhase);

    let userResult = await fetchUser(await getConnectedSignerAddress());

    //Check if user is registered for the tournament and register if not
    let isUserRegisteredForTournament = userResult["is_registered"];

    if (!isUserRegisteredForTournament && currentTournamentPhase === 1) {
      //Check if discord auth token exists in db and create if not
      if (
        window.localStorage.getItem("discordAccessToken") === null ||
        window.localStorage.getItem("discordUserName") === null
      ) {
        authorizeWithDiscord();
        return;
      }
      console.log(userResult);
      if (userResult === null) {
        dispatch(setPopUpModalTitle("Error"));
        dispatch(setPopUpModalText("User does not exist"));
        dispatch(setModal(true));
        dispatch(setOnPopUpModal(true));

        let idString = window.localStorage.getItem("discordUserId");
        if (idString === null) {
          dispatch(setPopUpModalTitle("Error"));
          dispatch(setPopUpModalText("Discord authorization failed"));
          dispatch(setModal(true));
          dispatch(setOnPopUpModal(true));
          return;
        }
        let ob = {
          id: parseInt(idString),
          username: window.localStorage.getItem("discordUserName"),
        };

        let signedMessage = await signMessage(ob);
        console.log(signedMessage);
        await createUser(signedMessage);
        return;
      }

      let numNFTsStaked = await mumbaiTournamentContract.stakedBalance(
        await getConnectedSignerAddress()
      );
      console.log(numNFTsStaked);
      if (numNFTsStaked > 0) {
        await registerForTournament();
        return;
      }
      dispatch(setPopUpModalTitle("Error"));
      dispatch(setPopUpModalText("Stake at least 1 NFT at Setup."));
      dispatch(setModal(true));
      dispatch(setOnPopUpModal(true));
      return;
    }

    if (!isUserRegisteredForTournament) {
      dispatch(setPopUpModalTitle("Error"));
      dispatch(setPopUpModalText("Registration phase is not open"));
      dispatch(setModal(true));
      dispatch(setOnPopUpModal(true));
      return;
    }
    matchDesktop ? navigate("/app2/tournament") : navigate("/app2/error");
  };

  const cards = [
    {
      title: "Tournament 1",
      items: [
        { title: "Enter price (DNA)", value: enterPrice },
        { title: "Price pool (DNA)", value: pricePool },
        { title: "Participants", value: `${participants}/${maxParticipants}` },
      ],
      onClick: onClickTournamentOne,
    },
    // {
    //     title: "Tournament 2",
    //     items: [
    //         {title: "Enter price", value: "3 $DNA "},
    //         {title: "Price pool", value: "10 $DNA "},
    //         {title: "Participant", value: "5/500"},
    //     ],
    //     onClick: () => {
    //         matchDesktop ? navigate("/app2/tournament") : navigate("/app2/error")
    //     }
    // },
  ];

  const dispatch = useAppDispatch();
  const onLeaderboard = () => {
    dispatch(setModal(true));
    dispatch(setLeaderboardModal(true));
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
              <p className={style.title}>Tournament 2</p>
              <p className={style.soon}>soon</p>
              <img className={style.sandTimer} src={sandTimerIcon} alt="" />
            </>
          </CardItem>
          <CardItem>
            <>
              <p className={style.title}>Tournament 3</p>
              <p className={style.soon}>soon</p>
              <img className={style.sandTimer} src={sandTimerIcon} alt="" />
            </>
          </CardItem>
        </div>
      </div>
    </div>
  );
};
