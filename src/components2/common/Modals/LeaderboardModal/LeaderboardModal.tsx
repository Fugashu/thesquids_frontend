import * as React from "react";
import style from "./LeaderboardModal.module.scss";
import {useRef} from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {setGameplayModal, setLeaderboardModal, setModal, setNickname} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CloseButton} from "../CloseButton/CloseButton";
import {svgIcons} from "../../../../assets/svg/svgIcons";
import replayBtnMobile from "../../../../assets/png/buttons/watch replay/mobile.png";
import replayBtnDesktop from "../../../../assets/png/buttons/watch replay/desktop.png";
import {cards} from "./constants";
import {desktopBreakPoint} from "../../../../constants";

export const LeaderboardModal = () => {
    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setLeaderboardModal(false));
    }

    useOutsideClick(ref, onClose);

    const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

    return (
        <div className={style.leaderboardModal}>
            <div className={style.content} ref={ref}>

                <CloseButton onClick={onClose} className={style.closeButton}/>

                <div className={style.back}>
                    {matchDesktop ? svgIcons.leaderboardModalDesktop : svgIcons.leaderboardModalMobile}
                </div>

                <p className={style.title}>Leaderboard</p>

                <div className={style.cardsHeader}>
                    <p>NFT</p>
                    <p>Nickname</p>
                    <p>Address</p>
                    <p>Score</p>
                </div>

                <div className={style.cards}>
                    {
                        cards.map(({nft, nickname, address, score, replays}, index) => (
                            <div className={style.card} key={index}>
                                <div className={style.back}>
                                    {matchDesktop ? svgIcons.leaderboardCardDesktop : svgIcons.leaderboardCardMobile}
                                </div>

                                <div className={style.cardContent}>

                                    <div className={style.firstBlock}>
                                        <img src={nft} alt="" className={style.nft}/>
                                        <div className={style.info}>
                                            <p>{nickname}</p>
                                            <p>{address}</p>
                                            <p>{`SCORE ${score}`}</p>
                                        </div>
                                    </div>

                                    <div className={style.secondBlock}>

                                        <div className={style.info}>
                                            <p>{nickname}</p>
                                            <p>{address}</p>
                                            <p>{score}</p>
                                        </div>

                                        <div className={style.buttonBlock}>

                                            <button className={style.replayBtn}
                                                    onClick={() => {
                                                        dispatch(setLeaderboardModal(false));
                                                        dispatch(setGameplayModal(true));
                                                        dispatch(setNickname(nickname));
                                                    }}
                                            >
                                                <img src={matchDesktop ? replayBtnDesktop : replayBtnMobile} alt="" className={style.back}/>
                                                <div className={style.replayBtnContent}>
                                                    <p className={style.btnText}>Watch replay</p>
                                                    <span>{svgIcons.play}</span>
                                                </div>
                                            </button>

                                            <div className={style.buttonBlockInfo}>
                                                <p>{`${replays} Replays left`}</p>
                                                <p>Earn $1 DNA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={style.blur}/>
            </div>
        </div>
    )
}