import * as React from "react";
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
  mumbaiTournamentContract,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import { CojodiNetworkSwitcher } from "../../components/cojodi/BackendCalls/CojodiNetworkSwitcher";
import chainRpcData from "../../components/cojodi/BackendCalls/chainRpcData";
import { ethers } from "ethers";

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
    //todo check wheter chain is already polygon
    await CojodiNetworkSwitcher.switchToChain(chainRpcData.mumbai);
    let enterPrice = ethers.utils.formatEther(
      await mumbaiTournamentContract.registrationFee()
    );
    //todo fetch price pool and participants
    let pricePool = ethers.utils.formatEther(
      await mumbaiTournamentContract.registrationFee()
    );
    let participants = ethers.utils.formatEther(
      await mumbaiTournamentContract.registrationFee()
    );
    let maxParticipants = ethers.utils.formatEther(
      await mumbaiTournamentContract.registrationFee()
    );
    setEnterPrice(enterPrice);
    setPricePool(pricePool);
    setParticipants(participants);
    setMaxParticipants(maxParticipants);
  }, []);

  const cards = [
    {
      title: "Tournament 1",
      items: [
        { title: "Enter price", value: enterPrice },
        { title: "Price pool", value: pricePool },
        { title: "Participants", value: `${participants}/${maxParticipants}` },
      ],
      onClick: () => {
        matchDesktop ? navigate("/app2/tournament") : navigate("/app2/error");
      },
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
