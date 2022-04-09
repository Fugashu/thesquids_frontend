import ReactDOM from "react-dom";
import './index.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {App} from "./components/A0_App/App";
import React from "react";
import TournamentsNew from "./components/Tournaments/TournamentsNew";
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="TournamentsNew" element={<TournamentsNew/>} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);