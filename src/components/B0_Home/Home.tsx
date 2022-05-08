import React, {FC, useCallback, useEffect, useState} from "react";
import style from "./home.module.scss";
import DiscordOauth2 from "discord-oauth2";
// import background from "../../assets/gif/home-back.gif";
import { SocialIcon } from "../common/SocialIcon/SocialIcon";
import enterD from "../../assets/png/buttons/button main.png";
import enterH from "../../assets/png/buttons/button main (1).png";
import enterC from "../../assets/png/buttons/button main (2).png";

import { ButtonLink } from "../common/ButtonLink/ButtomLink";
// @ts-ignore
import GlitchText from "react-glitch-effect/core/GlitchText";
import { MetaMaskButton } from "../cojodi/MetamaskConnection/connectToMetamaskButton";

import connectD from "../../assets/png/buttons/metamaskBtnIdle.png";
import connectH from "../../assets/png/buttons/metamaskBtnHover.png";
import connectC from "../../assets/png/buttons/metamaskBtnIPressed.png";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
  isUnlocked,
  signer,
} from "../cojodi/MetamaskConnection/MetamaskWallet";
import { setWalletAddress } from "../../store/appSlice";
import { useAppDispatch } from "../../store/hooks";
import {stringify} from "querystring";
import axios from "axios";
interface IHome {
  onClickHandler: () => void;
}


export const Home: FC<IHome> = () => {
  const [accessToken, setAccessToken] = useState('');
  const [discordUserName, setDiscordUsername] = useState('');

  const queryParams = new URLSearchParams(window.location.search);
  const cd = queryParams.get('code');


  // @ts-ignore
  useEffect(async ()=>cb(cd))



async function cb(code:string) {
    try{
     const oauth = new DiscordOauth2();
  await oauth.tokenRequest({
    clientId: "970248803808587797",
    clientSecret: "-3SU_sNnbtvMOgWnhSPcJxRV3QOa0JnZ",
    code: code,
    scope: "identify",
    grantType: "authorization_code",
    redirectUri: "http://localhost",
  }).then((value) => {
    console.log(value);
    setAccessToken(value.access_token);
    try{
      oauth.getUser(value.access_token).then((user) => {
        console.log(user);
        setDiscordUsername(user.username);
      })
    }catch (e){
      console.log('couldnt get user')
    }

  })}
    catch (e){
      console.log('Error while fetching Discord Token')
    }








}
  async function disc (){
    //https://discord.com/oauth2/authorize?response_type=code&client_id=157730590492196864
    let response_type='code';
    let client_id='970248803808587797'
     let   scope= 'identify guilds connections';
    let redirect = 'https://discord.com/api/oauth2/authorize?' +'response_type='+response_type+ '&client_id=' + client_id + '&scope=' + scope;
    window.location.href = redirect;




    {/*    const { data } = await axios.post(
        "https://discord.com/api/oauth2/authorize",
        stringify({
          client_id: '970248803808587797',
          client_secret: '-3SU_sNnbtvMOgWnhSPcJxRV3QOa0JnZ',
          grant_type: "authorization_code",
          code: 'code',
          redirect_uri: 'http://localhost/callback',
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
    );

const oauth = new DiscordOauth2();

    oauth.tokenRequest({
      clientId: "970248803808587797",
      clientSecret: "-3SU_sNnbtvMOgWnhSPcJxRV3QOa0JnZ",

      code: "query code",
      scope: "identify guilds",
      grantType: "authorization_code",

      redirectUri: "http://localhost/callback",
    }).then(console.log) */}
  }


  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const navigateToTournament = useCallback(
    () => navigate("/app2", { replace: true }),
    [navigate]
  );
  async function tryNavigateToTournament() {
    if (!(await isUnlocked())) {
      alert("Connect your wallet to continue");
      return;
    }

    navigateToTournament();
  }
  return (
    <section
      className={style.home}
      // style={{backgroundImage: `url(${background})`}}
    >
      <div className={style.innerWrapper}>
        <h1>{accessToken}</h1>
        <h1>{discordUserName}</h1>

        <GlitchText
          duration={3000}
          color1="rgba(30, 171, 245, 1)"
          color2="rgba(245, 0, 87, 1)"
          disabled={isDisabled}
        >
          <h1
            className={style.title}
            onMouseLeave={() => setDisabled(true)}
            onMouseOver={() => setDisabled(false)}
          >
            A game away from prosperity
          </h1>
        </GlitchText>

        <ButtonLink
          imgDefault={enterD}
          imgHover={enterH}
          imgClick={enterC}
          className={style.enterButton}
          onClick={tryNavigateToTournament}
        />
        <ButtonLink
            imgDefault={enterD}
            imgHover={enterH}
            imgClick={enterC}
            className={style.enterButton}
            onClick={disc}
        />

        <div className={style.icons}>
          {["twitter", "linktree"].map((icon) => (
            <SocialIcon key={icon} icon={icon} className={style.icon} />
          ))}

          <MetaMaskButton
            connectH={connectH}
            connectC={connectC}
            connectD={connectD}
          />
        </div>
      </div>
    </section>
  );
};
