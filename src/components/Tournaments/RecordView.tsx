import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import * as React from "react";
import BackendCallsInterface from "../cojodi/BackendCalls/BackendCallsInterface";
import {
  getConnectedSignerAddress,
  signMessage,
} from "../cojodi/MetamaskConnection/MetamaskWallet";
import style from "./PlayPage.module.scss";
import playHover from "../../assets/png/buttons/play page - play/play_hover.png";
import playDefault from "../../assets/png/buttons/play page - play/play_default.png";
import playClicked from "../../assets/png/buttons/play page - play/play_clicked.png";

import { ButtonCustom } from "../../components2/common/ButtonCustom/ButtonCustom";
import {
  createHighscore,
  createUser,
  patchHighscore,
} from "../cojodi/BackendCalls/BackendCalls";
import { useState } from "react";

interface Game {
  handleClick: any;
  destroyGame: any;
}

var score: any;
const RecordView = (props: Game) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    //status,
    startRecording,
    stopRecording,
    //mediaBlobUrl,
  } = useReactMediaRecorder({
    screen: true,
    video: true,
    onStop: (blobUrl, blob) => upload(blobUrl, blob),
  });

  async function upload(blobUrl: string, blob: Blob) {
    console.log("You scored " + score + " points.");
    let ob = {
      score: score,
    };

    props.destroyGame();
    let signedMessage = await signMessage(ob);
    console.log(signedMessage);

    let highscore_id = await createHighscore(signedMessage);
    console.log(`highscore_id: ${highscore_id}`);

    const formData = new FormData();
    formData.append("replay", blob);

    await patchHighscore(highscore_id.toString(), formData);
    console.log(blob);
    setIsPlaying(false);
  }

  window.onmessage = async function (event) {
    //A single message
    if (event.data === "MsgFromIframeToC3") {
      console.log("Message from iFrame Received");
    }
    //a message with data
    if (event.data.event_id === "MsgFromIframeToC3WithData") {
      console.log("Score: " + JSON.stringify(event.data.data));
      console.log(event.data.data);
      score = await event.data.data.v1;
      stopRecording();
    }
  };

  const startRecordingAndRetrieveGameUrl = async () => {
    setIsPlaying(true);
    await props.handleClick();
    startRecording();
  };
  return (
    <div>
      {isPlaying ? null : (
        <div>
          <ButtonCustom
            className={style.playBtn}
            onClick={startRecordingAndRetrieveGameUrl}
            widthMobile={861}
            heightMobile={75}
            widthDesktop={861}
            heightDesktop={75}
            imgMobileDefault={playDefault}
            imgMobileClick={playClicked}
            imgDesktopDefault={playDefault}
            imgDesktopHover={playHover}
            imgDesktopClick={playClicked}
          >
            <p></p>
          </ButtonCustom>
        </div>
      )}
    </div>
  );
};

export default RecordView;
