import React from 'react';
import {useState} from "react";
import connectD from "../../../assets/png/buttons/metamaskBtnIdle.png";
import connectH from "../../../assets/png/buttons/metamaskBtnHover.png";
import connectC from "../../../assets/png/buttons/metamaskBtnIPressed.png";

import connectedD from "../../../assets/png/buttons/connected-d.png";
import connectedH from "../../../assets/png/buttons/connected-h.png";
import connectedC from "../../../assets/png/buttons/connected-c.png";

import style from "./connection.module.scss";
import {ButtonLink} from "../../common/ButtonLink/ButtomLink";
import {connectWallet, disconnectWallet, isWalletConnected} from "./Config";

const MetaMaskButtonMobile = () => {

    async function connectWalletCall(){
        await connectWallet();
        setConnectionActive(isWalletConnected);
        }
    const [isConnectionActive, setConnectionActive] = useState(false);
    const [walletAddr, setWalletAddr] = useState("");
    return (
        <div className={style.icon}>
            {isConnectionActive ?
            <ButtonLink imgDefault={connectedD}
                        imgHover={connectedH}
                        imgClick={connectedC}
                        className={style.iconmetamaskmobile}
                        style={{width: 142}}
                        role={"disconnect"}
                        onClick={()=>disconnectWallet()}
            />
                :
                <ButtonLink imgDefault={connectD}
                            imgHover={connectH}
                            imgClick={connectC}
                            role={"connect"}
                            onClick={()=>connectWalletCall()}
                />
            }
            <p role="walletAddr">{walletAddr}</p>

        </div>

    );
};

export default MetaMaskButtonMobile;
