import ReactDOM from "react-dom";
import './index.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {App} from "./components/A0_App/App";
import React from "react";
import LandingPageV2 from "./components/LandingPageV2/LandingPageV2";
import Tournaments_new from "./components/Tournaments/Tournaments_new";
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="Tournaments_new" element={<Tournaments_new/>} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);