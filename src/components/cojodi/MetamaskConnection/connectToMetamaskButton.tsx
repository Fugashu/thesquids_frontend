import React, { FC, useEffect } from "react";
import { useState } from "react";
import { ButtonLink } from "../../common/ButtonLink/ButtomLink";
import {
  connectWallet,
  isUnlocked,
  pretendDisconnectWalletByReloading,
} from "./MetamaskWallet";

import connectedD from "../../../assets/png/buttons/connected-d.png";
import connectedH from "../../../assets/png/buttons/connected-h.png";
import connectedC from "../../../assets/png/buttons/connected-c.png";

import style from "./connection.module.scss";

interface IMetaMaskButton {
  connectD: string;
  connectH: string;
  connectC: string;
}
export const MetaMaskButton: FC<IMetaMaskButton> = ({
  connectD,
  connectH,
  connectC,
}) => {
  // @ts-ignore
  CheckIfWalletAlreadyConnected();
  async function connectWalletCall() {
    await connectWallet();
    setConnectionActive(await isUnlocked());
  }

  const [isConnectionActive, setConnectionActive] = useState(false);

  async function CheckIfWalletAlreadyConnected() {
    // @ts-ignore
    useEffect(() => {
      return async () => {
        setConnectionActive(await isUnlocked());
        if (await isUnlocked()) {
          await connectWallet();
        }
      };
    });
  }
  return (
    <div>
      {isConnectionActive ? (
        <ButtonLink
          imgDefault={connectedD}
          imgHover={connectedH}
          imgClick={connectedC}
          className={style.metaConnected}
          onClick={() => pretendDisconnectWalletByReloading()}
        />
      ) : (
        <ButtonLink
          imgDefault={connectD}
          imgHover={connectH}
          imgClick={connectC}
          className={style.metaDisconnected}
          onClick={() => connectWalletCall()}
        />
      )}
    </div>
  );
};

export default MetaMaskButton;
