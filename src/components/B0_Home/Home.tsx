import React, {FC, useCallback, useState} from "react";
import style from "./home.module.scss"
// import background from "../../assets/gif/home-back.gif";
import {SocialIcon} from "../common/SocialIcon/SocialIcon";
import enterD from "../../assets/png/buttons/button main.png";
import enterH from "../../assets/png/buttons/button main (1).png";
import enterC from "../../assets/png/buttons/button main (2).png";

import {ButtonLink} from "../common/ButtonLink/ButtomLink";
// @ts-ignore
import GlitchText from 'react-glitch-effect/core/GlitchText';
import {MetaMaskButton} from "../cojodi/MetamaskConnection/connectToMetamaskButton";

import connectD from "../../assets/png/buttons/metamaskBtnIdle.png";
import connectH from "../../assets/png/buttons/metamaskBtnHover.png";
import connectC from "../../assets/png/buttons/metamaskBtnIPressed.png";
import {useNavigate} from "react-router-dom";
import {isWalletConnected} from "../cojodi/MetamaskConnection/Wallet";
var warningAlreadyDisplayed = false;

interface IHome {
    onClickHandler: () => void
}

export const Home: FC<IHome> = () => {
    const [isDisabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const navigateToTournament = useCallback(() => navigate('/Tournaments_new', {replace: true}), [navigate]);


    function tryNavigateToTournament(){
        
        if (!isWalletConnected){
            alert('Connect your wallet to continue');
            return;
        }

        if (warningAlreadyDisplayed){
            navigateToTournament();
            return;
        }
        warningAlreadyDisplayed = true;
        alert("CAUTION: THE NEXT TIME YOU CLICK ON ENTER YOU WILL BE WITHIN THE TOURNAMENT");

    }
    return (
        <section className={style.home}
                 // style={{backgroundImage: `url(${background})`}}
        >
            <div className={style.innerWrapper}>
                <GlitchText duration={3000} color1="rgba(30, 171, 245, 1)" color2="rgba(245, 0, 87, 1)" disabled={isDisabled}>
                <h1 className={style.title}
                    onMouseLeave={()=>setDisabled(true)}
                    onMouseOver={()=>setDisabled(false)}>A game away from prosperity</h1>
                </GlitchText>
                


                    <ButtonLink imgDefault={enterD}
                        imgHover={enterH}
                        imgClick={enterC}
                        className={style.enterButton}
                        onClick={tryNavigateToTournament}/>




                <div className={style.icons}>
                    {
                        ["twitter"].map(icon => <SocialIcon key={icon}
                                                                                   icon={icon}
                                                                                   className={style.icon}
                            />

                        )

                    }
                    <MetaMaskButton     connectH = {connectH}
                                        connectC = {connectC}
                                        connectD = {connectD}/>


                </div>
            </div>
        </section>
    )
}