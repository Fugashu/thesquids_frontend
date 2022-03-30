import React from 'react';
import {useState} from "react";

import connectD from "../../../assets/png/buttons/connect-d.png";
import connectH from "../../../assets/png/buttons/connect-h.png";
import connectC from "../../../assets/png/buttons/connect-c.png";

import connectedD from "../../../assets/png/buttons/connected-d.png";
import connectedH from "../../../assets/png/buttons/connected-h.png";
import connectedC from "../../../assets/png/buttons/connected-c.png";

import style from "../../A1_Header/header.module.scss";
import {ButtonLink} from "../../common/ButtonLink/ButtomLink";
import {
    connectWallet,
    isWalletConnected, disconnectWallet
} from "./Config";


const MetaMaskButton = () => {

    async function connectWalletCall(){
    await connectWallet();
    setConnectionActive(isWalletConnected);
    
    }
    const [isConnectionActive, setConnectionActive] = useState(false);
    return (
        <div>
            {
                isConnectionActive ?
            <ButtonLink imgDefault={connectedD}
                        imgHover={connectedH}
                        imgClick={connectedC}
                        className={style.connectBtn}
                        role={"disconnect"}
                        onClick={()=>disconnectWallet()}
            />:
                <ButtonLink imgDefault={connectD}
                            imgHover={connectH}
                            imgClick={connectC}
                            className={style.connectBtn}
                            role={"connect"}
                            onClick={()=>connectWalletCall()}
                />
            }
        </div>

    );
};

export default MetaMaskButton;
