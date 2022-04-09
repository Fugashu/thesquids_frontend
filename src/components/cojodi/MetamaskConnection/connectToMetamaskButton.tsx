import React, {FC} from 'react';
import {useState} from "react";
import {ButtonLink} from "../../common/ButtonLink/ButtomLink";
import {connectWallet, isWalletConnected, disconnectWallet} from "./Wallet";

import connectedD from "../../../assets/png/buttons/connected-d.png";
import connectedH from "../../../assets/png/buttons/connected-h.png";
import connectedC from "../../../assets/png/buttons/connected-c.png";

import style from "./connection.module.scss";

interface IMetaMaskButton {

    connectD: string
    connectH: string
    connectC: string

}
export const MetaMaskButton: FC<IMetaMaskButton> = ({
                                                connectD,
                                                connectH,
                                                connectC,
                                            }) => {


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
                        className={style.metaConnected}
                        role={"disconnect"}
                        onClick={()=>disconnectWallet()}
            />:
                <ButtonLink imgDefault={connectD}
                            imgHover={connectH}
                            imgClick={connectC}
                            className={style.metaDisconnected}
                            role={"connect"}
                            onClick={()=>connectWalletCall()}
                />
            }
        </div>

    );
};

export default MetaMaskButton;