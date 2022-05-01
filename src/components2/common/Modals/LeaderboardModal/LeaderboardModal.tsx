import * as React from "react";
import style from "./LeaderboardModal.module.scss";
import {useRef} from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {setGameplayModal, setLeaderboardModal, setModal, setNickname} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import useMediaQuery from "@mui/material/useMediaQuery";
import {CloseButton} from "../CloseButton/CloseButton";
import replayBtnMobile from "../../../../assets/png/buttons/watch replay/mobile.png";
import replayBtnDesktop from "../../../../assets/png/buttons/watch replay/desktop.png";
import {cards} from "./constants";
import {desktopBreakPoint} from "../../../../constants";

import modalMobile from "../../../../assets/png/modal/leaderboard/mobile.png";
import modalDesktop from "../../../../assets/png/modal/leaderboard/desktop.png";
import cardMobile from "../../../../assets/png/cards/leaderboard modal/mobile.png";
import cardDesktop from "../../../../assets/png/cards/leaderboard modal/desktop.png";
import playIcon from "../../../../assets/png/icons/play.png";
import {ButtonCustom} from "../../ButtonCustom/ButtonCustom";

import imgMobileDefault from "../../../../assets/png/buttons/leaderboard modal - watch replay/mobileDefault.png";
import imgMobileClick from "../../../../assets/png/buttons/leaderboard modal - watch replay/mobileClick.png";
import imgDesktopDefault from "../../../../assets/png/buttons/leaderboard modal - watch replay/desktopDefault.png";
import imgDesktopHover from "../../../../assets/png/buttons/leaderboard modal - watch replay/desktopHover.png";
import imgDesktopClick from "../../../../assets/png/buttons/leaderboard modal - watch replay/desktopClick.png";

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

                <img className={style.back}
                     src={matchDesktop ? modalDesktop : modalMobile}
                     alt=""
                />

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

                                <img className={style.cardBack}
                                     src={matchDesktop ? cardDesktop : cardMobile}
                                     alt=""
                                />

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

                                            <ButtonCustom className={style.watchReplayBtn}
                                                          onClick={() => {
                                                              dispatch(setLeaderboardModal(false));
                                                              dispatch(setGameplayModal(true));
                                                              dispatch(setNickname(nickname));
                                                          }}
                                                          widthMobile={210}
                                                          heightMobile={40}
                                                          widthDesktop={311}
                                                          heightDesktop={40}
                                                          imgMobileDefault={imgMobileDefault}
                                                          imgMobileClick={imgMobileClick}
                                                          imgDesktopDefault={imgDesktopDefault}
                                                          imgDesktopHover={imgDesktopHover}
                                                          imgDesktopClick={imgDesktopClick}
                                            >
                                                <div className={style.replayBtnContent}>
                                                    <p className={style.btnText}>Watch replay</p>
                                                    <img src={playIcon} alt="" className={style.icon}/>
                                                </div>
                                            </ButtonCustom>

                                            {/*<button className={style.watchReplayBtn}*/}
                                            {/*        onClick={() => {*/}
                                            {/*            dispatch(setLeaderboardModal(false));*/}
                                            {/*            dispatch(setGameplayModal(true));*/}
                                            {/*            dispatch(setNickname(nickname));*/}
                                            {/*        }}*/}
                                            {/*>*/}
                                            {/*    <img src={matchDesktop ? replayBtnDesktop : replayBtnMobile} alt=""*/}
                                            {/*         className={style.back}/>*/}
                                            {/*    <div className={style.replayBtnContent}>*/}
                                            {/*        <p className={style.btnText}>Watch replay</p>*/}
                                            {/*        <img src={playIcon} alt=""/>*/}
                                            {/*    </div>*/}
                                            {/*</button>*/}

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