import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import * as React from "react";
import BackendCallsInterface from "../cojodi/BackendCalls/BackendCallsInterface";
import { getConnectedSignerAddress } from "../cojodi/MetamaskConnection/MetamaskWallet";
import style from "./PlayPage.module.scss";
import playHover from "../../assets/png/buttons/play page - play/play_hover.png";
import playDefault from "../../assets/png/buttons/play page - play/play_default.png";
import playClicked from "../../assets/png/buttons/play page - play/play_clicked.png";

import { ButtonCustom } from "../../components2/common/ButtonCustom/ButtonCustom";

interface Game {
  handleClick: any;
}

const RecordView = (props: Game) => {
  let score: any;
  const {
    //status,
    startRecording,
    stopRecording,
    //mediaBlobUrl,
  } = useReactMediaRecorder({
    screen: true,
    video: true,
    //TODO wieder rein onStop: (blobUrl, blob) => saveFile(blobUrl, blob),
  });

  // eslint-disable-next-line
  function upload(blobUrl: string, blob: Blob) {
    console.log(blob);
    const formData = {
      score: 0,
      replay: "string",
    };
    try {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  // eslint-disable-next-line

  const saveFile = async (blobUrl: string, blob: Blob) => {
    const accAddr: string = "test";
    //make sure user is connected

    const a = document.createElement("a");
    a.download = accAddr + score.toString();
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  // eslint-disable-next-line
  async function uploadFile(blobUrl: string, blob: Blob) {
    console.log(blob);
    console.log(blobUrl);
    const formData = new FormData();
    formData.append("file", blob, await getConnectedSignerAddress());

    console.log(formData);
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/blobb",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      alert("You scored " + score + " points.");
    }
  };

  const startRecordingAndRetrieveGameUrl = () => {
    //todo start game and retirev urlf rom session id

    startRecording();
    props.handleClick();
  };
  return (
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
  );
};

export default RecordView;