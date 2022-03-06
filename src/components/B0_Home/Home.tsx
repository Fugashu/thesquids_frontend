import React, {FC,useState} from "react";
import style from "./home.module.scss"
// import background from "../../assets/gif/home-back.gif";
import {SocialIcon} from "../common/SocialIcon/SocialIcon";
import enterD from "../../assets/png/buttons/button main.png";
import enterH from "../../assets/png/buttons/button main (1).png";
import enterC from "../../assets/png/buttons/button main (2).png";
import soonD from "../../assets/png/buttons/soonD.png";
import soonH from "../../assets/png/buttons/soonH.png";
import soonC from "../../assets/png/buttons/soonC.png";

import {ButtonLink} from "../common/ButtonLink/ButtomLink";
// @ts-ignore
import GlitchText from 'react-glitch-effect/core/GlitchText';
import MetaMaskButtonMobile from "../cojodi/MetamaskConnection/connectToMetamaskButtonMobile";

interface IHome {
    onClickHandler: () => void
}

export const Home: FC<IHome> = () => {
    const [isDisabled, setDisabled] = useState(true);
    const [isSoonButton, setIsSoonButton] = useState(false);

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
                

                {isSoonButton ? (
                        <ButtonLink imgDefault={soonD}
                                imgHover={soonH}
                                imgClick={soonC}
                                className={style.enterButton}
                                onClickHandler={() => setIsSoonButton(prev => !prev)}
                        />
                    ) : (
                    <ButtonLink imgDefault={enterD}
                        imgHover={enterH}
                        imgClick={enterC}
                        className={style.enterButton}
                        onClickHandler={() => setIsSoonButton(prev => !prev)}
                    />
                )}

                <div className={style.icons}>
                    {
                        ["twitter", "discord"].map(icon => <SocialIcon key={icon}
                                                                                   icon={icon}
                                                                                   className={style.icon}
                            />

                        )

                    }
                    <MetaMaskButtonMobile/>

                </div>
            </div>
        </section>
    )
}