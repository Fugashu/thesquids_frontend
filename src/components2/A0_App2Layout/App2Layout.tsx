import clsx from "clsx";
import * as React from "react";
import style from "./App2Layout.module.scss";
import {useAppSelector} from "../../store/hooks";
import {
    selectGameplayModal,
    selectLeaderboardModal,
    selectModal,
    selectOpenBoxModal,
    selectShowChooseTheCoinModal,
    selectStakingNftErrorModal,
    selectTestRecordingModal, selectTimeLeftModal, selectTournamentsModal,
    selectTournamentsWarningModal,
    selectVoteModal,
} from "../../store/appSlice";
import {Header2} from "../A1_Header2/Header2";
import {BurgerMenu2} from "../A3_BurgerMenu2/BurgerMenu2";
import {ChooseTheCoinModal} from "../common/Modals/ChooseTheCoinModal/ChooseTheCoinModal";
import {Outlet} from "react-router-dom";
import {Footer2} from "../A2_Footer2/Footer2";
import {LeaderboardModal} from "../common/Modals/LeaderboardModal/LeaderboardModal";
import {GameplayModal} from "../common/Modals/GameplayModal/GameplayModal";
import {TournamentsWarningModal} from "../common/Modals/TournamentsWarningModal/TournamentsWarningModal";
import {StakingNftErrorModal} from "../common/Modals/StakingNftErrorModal/StakingNftErrorModal";
import {VoteModal} from "../common/Modals/VoteModal/VoteModal";
import {svgIcons} from "../../assets/svg/svgIcons";
import "./animations.scss";
import {OpenBoxModal} from "../common/Modals/OpenBoxModal/OpenBoxModal";
import {TestRecordingModal} from "../common/Modals/TestRecordingModal/TestRecordingModal";
import {TimeLeftModal} from "../common/Modals/TimeLeftModal/TimeLeftModal";
import {TournamentsModal} from "../common/Modals/TournamentsModal/TournamentsModal";

export const App2Layout = () => {
    const showChooseTheCoinModal = useAppSelector(selectShowChooseTheCoinModal);
    const modal = useAppSelector(selectModal);
    const tournamentsWarningModal = useAppSelector(selectTournamentsWarningModal);
    const leaderboardModal = useAppSelector(selectLeaderboardModal);
    const gameplayModal = useAppSelector(selectGameplayModal);
    const stakingNftErrorModal = useAppSelector(selectStakingNftErrorModal);
    const voteModal = useAppSelector(selectVoteModal);
    const openBoxModal = useAppSelector(selectOpenBoxModal);
    const testRecordingModal = useAppSelector(selectTestRecordingModal);
    const timeLeftModal = useAppSelector(selectTimeLeftModal);
    const tournamentsModal = useAppSelector(selectTournamentsModal);

    return (
        <div className={clsx({
            [style.app2Layout]: true,
            [style.app2Layout_fixed]: modal,
        })}>
            <Header2 />

            <BurgerMenu2 />

            {showChooseTheCoinModal && <ChooseTheCoinModal />}
            {tournamentsWarningModal && <TournamentsWarningModal />}
            {leaderboardModal && <LeaderboardModal />}
            {gameplayModal && <GameplayModal/>}
            {stakingNftErrorModal && <StakingNftErrorModal/>}
            {voteModal && <VoteModal/>}
            {openBoxModal && <OpenBoxModal/>}
            {testRecordingModal && <TestRecordingModal/>}
            {timeLeftModal && <TimeLeftModal/>}
            {tournamentsModal && <TournamentsModal/>}

            <div className={style.gradient}/>

            <div className={style.clouds}>
                <div className={clsx(style.cloud0, "cloudLeft")}>{svgIcons.cloud0}</div>
                <div className={clsx(style.cloud1, "cloudRight")}>{svgIcons.cloud1}</div>
                <div className={clsx(style.cloud2, "cloudRight")}>{svgIcons.cloud2}</div>
                <div className={clsx(style.cloud3, "cloudLeft")}>{svgIcons.cloud3}</div>
                <div className={clsx(style.cloud4, "cloudRight")}>{svgIcons.cloud3}</div>
            </div>

            <div className={style.rain}/>

            <div className={style.outlet}>
                <Outlet/>
            </div>


            <Footer2/>
        </div>
    )
}