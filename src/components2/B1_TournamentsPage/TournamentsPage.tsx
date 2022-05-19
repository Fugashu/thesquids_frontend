import * as React from "react";
import { useEffect, useState } from "react";
import style from "./TournamentsPage.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CardItem } from "./CardItem/CardItem";
import { useAppDispatch } from "../../store/hooks";
import { setLeaderboardModal, setModal } from "../../store/appSlice";
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
} from "../../components/cojodi/BackendCalls/BackendCalls";
import {
  mumbaiTokenContractAddress,
  mumbaiTournamentContractAddress,
} from "../../components/cojodi/ContractConfig";

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

    let result = await fetchTournamentStats();
    console.log(result);
    setParticipants(result["n_participants"]);

    console.log(await mumbaiTournamentContract.maxUsers());
    setEnterPrice(num.toFixed(2));
    setPricePool(pricePool);
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
      displayPopUpModal(EPopUpModal.Info, "Registration is not open.");
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
      onClick: onClickEnter,
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
