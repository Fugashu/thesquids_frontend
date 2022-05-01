import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { App2Layout } from "../../components2/A0_App2Layout/App2Layout";
import { HomePage } from "../../components2/B0_HomePage/HomePage";
import { TournamentsPage } from "../../components2/B1_TournamentsPage/TournamentsPage";
import { LootBoxesPage } from "../../components2/B3_LootBoxesPage/LootBoxesPage";
import { ErrorPage } from "../../components2/B7_ErrorPage/ErrorPage";
import { PlayPage } from "../../components2/B6_PlayPage/PlayPage";
import { TournamentPage } from "../../components2/B2_TournamentPage/TournamentPage";
import { StakingPage } from "../../components2/B8_StakingPage/StakingPage";
import { LootBoxPage } from "../../components2/B4_LootBoxPage/LootBoxPage";
import { MarketplacePage } from "../../components2/B9_MarketplacePage/MarketplacePage";
import { SetupPage } from "../../components2/BA_Setup/SetupPage";
import { BridgePage } from "../cojodi/Bridge/BridgePage";

export const AppContainer = () => {
  AOS.init();

  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/app2" element={<App2Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route path="loot" element={<LootBoxesPage />} />
            <Route path="box" element={<LootBoxPage />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="play" element={<PlayPage />} />
            <Route path="tournament" element={<TournamentPage />} />
            <Route path="stake" element={<StakingPage />} />
            <Route path="bridge" element={<BridgePage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="setup" element={<SetupPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
};
