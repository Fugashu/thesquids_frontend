import ReactDOM from "react-dom";
import './index.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {App} from "./components/A0_App/App";
import React from "react";
import Tournaments from "./components/Tournaments/Tournaments";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="Tournaments" element={<Tournaments />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);