import clsx from "clsx";
import * as React from "react";
import style from "./App2Layout.module.scss";
import {useAppSelector} from "../../store/hooks";
import {
    selectGameplayModal,
    selectLeaderboardModal,
    selectModal,
    selectShowChooseTheCoinModal, selectTournamentsWarningModal,
} from "../../store/appSlice";
import {Header2} from "../A1_Header2/Header2";
import {BurgerMenu2} from "../A3_BurgerMenu2/BurgerMenu2";
import {ChooseTheCoinModal} from "../common/Modals/ChooseTheCoinModal/ChooseTheCoinModal";
import {Outlet} from "react-router-dom";
import {Footer2} from "../A2_Footer2/Footer2";
import {LeaderboardModal} from "../common/Modals/LeaderboardModal/LeaderboardModal";
import {GameplayModal} from "../common/Modals/GameplayModal/GameplayModal";
import {TournamentsWarningModal} from "../common/Modals/TournamentsWarningModal/TournamentsWarningModal";

export const App2Layout = () => {
    const showChooseTheCoinModal = useAppSelector(selectShowChooseTheCoinModal);
    const modal = useAppSelector(selectModal);
    const tournamentsWarningModal = useAppSelector(selectTournamentsWarningModal);
    const leaderboardModal = useAppSelector(selectLeaderboardModal);
    const gameplayModal = useAppSelector(selectGameplayModal);

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

            <Outlet/>

            <Footer2/>
        </div>
    )
}