import * as React from "react";
import style from "./TournamentsPage.module.scss";
import btnMobile from "../../assets/png/buttons/leaderboard/mobile.png";
import btnDesktop from "../../assets/png/buttons/leaderboard/desktop.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CardItem} from "./CardItem/CardItem";
import enterBtnMobile from "../../assets/png/buttons/tournaments card enter/mobile.png";
import enterBtnDesktop from "../../assets/png/buttons/tournaments card enter/desktop.png";
import {svgIcons} from "../../assets/svg/svgIcons";
import {useAppDispatch} from "../../store/hooks";
import { setLeaderboardModal, setModal } from "../../store/appSlice";
import {useNavigate} from "react-router-dom";

export const TournamentsPage = () => {
    const matchDesktop = useMediaQuery('(min-width:1440px)');
    const navigate = useNavigate();

    const cards = [
        {
            title: "Tournament 1",
            items: [
                {title: "Enter price", value: "3 $DNA "},
                {title: "Price pool", value: "10 $DNA "},
                {title: "Participant", value: "5/500"},
            ],
            onClick: () => {
                matchDesktop ? navigate("/app2/play") : navigate("/app2/error")
            }
        },
        {
            title: "Tournament 2",
            items: [
                {title: "Enter price", value: "3 $DNA "},
                {title: "Price pool", value: "10 $DNA "},
                {title: "Participant", value: "5/500"},
            ],
            onClick: () => {
                matchDesktop ? navigate("/app2/play") : navigate("/app2/error")
            }
        },
    ];

    const dispatch = useAppDispatch();
    const onLeaderboard = () => {
        dispatch(setModal(true));
        dispatch(setLeaderboardModal(true));
    }

    return (
        <div className={style.tournamentsPage}>
            <div className={style.inner}>

                <div className={style.titleBlock}>
                    <h2 className={style.title}>Tournaments</h2>
                    <button className={style.btn}
                            onClick={onLeaderboard}
                    >
                        <img src={matchDesktop ? btnDesktop : btnMobile} alt=""/>
                        <span>Leaderboard</span>
                    </button>
                </div>

                <div className={style.cards}>
                    {
                        cards.map((card, index) => (
                            <CardItem key={index}>
                                <>
                                    <p className={style.title}>{card.title}</p>
                                    <div className={style.items}>
                                        {
                                            card.items.map(({title, value}, index) => (
                                                <div className={style.item} key={index}>
                                                    <p className={style.title}>{title}</p>
                                                    <p className={style.value}>{value}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button className={style.enterBtn}
                                            onClick={card.onClick}
                                    >
                                        <img src={matchDesktop ? enterBtnDesktop : enterBtnMobile} alt=""/>
                                        <span>enter</span>
                                    </button>
                                </>
                            </CardItem>

                        ))
                    }
                    <CardItem>
                        <>
                            <p className={style.title}>Tournament 3</p>
                            <p className={style.soon}>soon</p>
                            <span className={style.sandTimer}>{svgIcons.sandTimer}</span>

                        </>
                    </CardItem>
                </div>

            </div>
        </div>
    )
}