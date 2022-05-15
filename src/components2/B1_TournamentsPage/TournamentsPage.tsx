import * as React from "react";
import style from "./TournamentsPage.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CardItem } from "./CardItem/CardItem";
import { useAppDispatch } from "../../store/hooks";
import {
  HomeModalEnum,
  setBurgerOpen,
  setErrorModalText,
  setHomeModalType,
  setLeaderboardModal,
  setModal,
  setOnErrorModal,
  setShowChooseTheCoinModal,
} from "../../store/appSlice";
import { useNavigate } from "react-router-dom";
import { desktopBreakPoint } from "../../constants";
import sandTimerIcon from "../../assets/png/icons/sandTimer.png";
import { ButtonCustom } from "../common/ButtonCustom/ButtonCustom";

// leaderboard
import imgMobileDefault from "../../assets/png/buttons/tournaments page - leaderboard/lb_default.png";
import imgMobileClick from "../../assets/png/buttons/tournaments page - leaderboard/lb_clicked.png";
import imgDesktopDefault from "../../assets/png/buttons/tournaments page - leaderboard/lb_default.png";
import imgDesktopHover from "../../assets/png/buttons/tournaments page - leaderboard/lb_hover.png";
import imgDesktopClick from "../../assets/png/buttons/tournaments page - leaderboard/lb_clicked.png";

// enter
import mobileDefault from "../../assets/png/buttons/tournaments page - enter/enter_default.png";
import mobileClick from "../../assets/png/buttons/tournaments page - enter/enter_clicked.png";
import desktopDefault from "../../assets/png/buttons/tournaments page - enter/enter_default.png";
import desktopHover from "../../assets/png/buttons/tournaments page - enter/enter_hover.png";
import desktopClick from "../../assets/png/buttons/tournaments page - enter/enter_clicked.png";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getConnectedSignerAddress,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  signMessage,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { CojodiNetworkSwitcher } from "../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../components/cojodi/BackendCalls/chainRpcData";
import { ethers } from "ethers";
import {
  authorizeWithDiscord,
  createUser,
  fetchRemainingParticipants,
  fetchUser,
} from "../../components/cojodi/BackendCalls/BackendCalls";
import { mumbaiTournamentContractAddress } from "../../components/cojodi/ContractConfig";

export const TournamentsPage = () => {
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
      await mumbaiTournamentContract.registrationFee()
    );
    let pricePool = ethers.utils.formatEther(
      await mumbaiTournamentContract.pricePool()
    );
    let maxParticipants = await mumbaiTournamentContract.maxUsers();
    console.log(await fetchRemainingParticipants());
    let participants = await fetchRemainingParticipants();

    setParticipants(participants);

    console.log(await mumbaiTournamentContract.maxUsers());
    setEnterPrice(enterPrice);
    setPricePool(pricePool);
    setMaxParticipants(maxParticipants);
  }, []);

  const registerForTournament = async () => {
    let priceToPay = await mumbaiTournamentContract.userBasedRegistrationFee(
      await getConnectedSignerAddress()
    );
    console.log(priceToPay);
    try {
      let tx = await mumbaiTokenContract.approve(
        mumbaiTournamentContractAddress,
        priceToPay
      );
      await tx.wait();
    } catch (e) {
      console.log(`Error while approving DNA: ${e}`);
      dispatch(setErrorModalText("DNA approval failed"));
      dispatch(setModal(true));
      dispatch(setOnErrorModal(true));
    }

    try {
      let tx = await mumbaiTournamentContract.register();
      await tx.wait();
    } catch (e) {
      console.log(`Error while registering for tournament: ${e}`);
      dispatch(
        setErrorModalText(
          "Registration failed. You need to stake at least 1 NFT."
        )
      );
      dispatch(setModal(true));
      dispatch(setOnErrorModal(true));
    }
  };

  const onClickTournamentOne = async () => {
    //Check if discord auth token exists in db and create if not
    if (
      window.localStorage.getItem("discordAccessToken") === null ||
      window.localStorage.getItem("discordUserName") === null
    ) {
      authorizeWithDiscord();
      return;
    }

    //Check if user exists in db and create if not
    let result = await fetchUser(await getConnectedSignerAddress());
    console.log(result);
    if (result === null) {
      dispatch(setErrorModalText("User doesn't exist."));
      dispatch(setModal(true));
      dispatch(setOnErrorModal(true));
      return;
    }

    let idString = window.localStorage.getItem("discordUserId");
    if (idString === null) {
      dispatch(setErrorModalText("Discord authorization failed."));
      dispatch(setModal(true));
      dispatch(setOnErrorModal(true));
      return;
    }
    let ob = {
      id: parseInt(idString),
      username: window.localStorage.getItem("discordUserName"),
      //avatar_hash: window.localStorage.getItem("discordUserAvatar"),
    };

    let signedMessage = await signMessage(ob);
    console.log(signedMessage);
    await createUser(signedMessage);

    //Check if user is registered for the tournament and register if not
    let isUserRegisteredForTournament =
      await mumbaiTournamentContract.registeredUsers(
        await getConnectedSignerAddress()
      );
    if (!isUserRegisteredForTournament) {
      await registerForTournament();
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
