/* eslint-disable */
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
import { LootBoxesPage } from "../../components2/B2_LootBoxesPage/LootBoxesPage";
import { ErrorPage } from "../../components2/B4_ErrorPage/ErrorPage";
import { PlayPage } from "../../components2/B5_PlayPage/B5_PlayPage";

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
            <Route path="error" element={<ErrorPage />} />
            <Route path="play" element={<PlayPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
};
