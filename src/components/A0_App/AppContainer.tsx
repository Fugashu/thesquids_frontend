import React from 'react';
import {HashRouter} from "react-router-dom";
import {App} from "./App";
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
export const AppContainer = () => {
    AOS.init();

    return (
        <HashRouter>
            <App/>
        </HashRouter>
    );
}

