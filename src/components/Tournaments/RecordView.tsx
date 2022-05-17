import { useReactMediaRecorder } from "react-media-recorder";
import * as React from "react";
import { useState } from "react";
import {
  mumbaiTournamentContract,
  signMessage,
} from "../cojodi/MetamaskConnection/MetamaskWallet";
import style from "./PlayPage.module.scss";
import playHover from "../../assets/png/buttons/play page - play/play_hover.png";
import playDefault from "../../assets/png/buttons/play page - play/play_default.png";
import playClicked from "../../assets/png/buttons/play page - play/play_clicked.png";

import { ButtonCustom } from "../../components2/common/ButtonCustom/ButtonCustom";
import {
  createHighscore,
  displayPopUpModal,
  EPopUpModal,
  fetchTournamentStats,
  patchHighscore,
} from "../cojodi/BackendCalls/BackendCalls";
import { lifeBalance, setModal, setOnPopUpModal } from "../../store/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { store } from "../../store/store";

interface Game {
  handleClick: any;
  destroyGame: any;
}

var score: any;
const RecordView = (props: Game) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const lives = useAppSelector(lifeBalance);
  const dispatch = useAppDispatch();
  const {
    status,
    startRecording,
    stopRecording,
    //mediaBlobUrl,
  } = useReactMediaRecorder({
    screen: true,
    video: false,
    audio: false,
    blobPropertyBag: { type: "video/mp4" },

    onStop: async (blobUrl, blob) => {
      console.log("callback on stop");
      displayPopUpModal(
        EPopUpModal.Info,
        "Your replay is being uploaded. Sign the message and WAIT!"
      );
      await upload(blobUrl, blob);
      store.dispatch(setModal(false));
      store.dispatch(setOnPopUpModal(false));
    },
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

      console.log("stopped");
    }
  };

  const startRecordingAndRetrieveGameUrl = async () => {
    let result = await fetchTournamentStats();

    console.log(result);
    if (
      result["phase"] !== "IN_PLAY" ||
      (await mumbaiTournamentContract.currentPhase()) !== 2
    ) {
      displayPopUpModal(EPopUpModal.Error, "Currently there are no games");
      return;
    }

    if (parseInt(lives) <= 0) {
      displayPopUpModal(EPopUpModal.Error, "Insufficient lives.");
      return;
    }

    if (await props.handleClick()) {
      setIsPlaying(true);
      startRecording();
    }
  };
  return (
    <div>
      {/*<h1>{status}</h1>*/}

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
