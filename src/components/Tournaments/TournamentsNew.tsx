import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import * as React from "react";
import BackendCallsInterface from "../cojodi/BackendCalls/BackendCallsInterface";
import { getConnectedSignerAddress } from "../cojodi/MetamaskConnection/MetamaskWallet";

const RecordView = () => {
  let score: any;
  const {
    //status,
    startRecording,
    stopRecording,
    //mediaBlobUrl,
  } = useReactMediaRecorder({
    screen: true,
    video: true,
    onStop: (blobUrl, blob) => saveFile(blobUrl, blob),
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
    const accAddr: string = (await getConnectedSignerAddress()) || "test";
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

  window.onmessage = function (event) {
    //A single message
    if (event.data === "MsgFromIframeToC3") {
      console.log("Message from iFrame Received");
    }
    //a message with data
    if (event.data.event_id === "MsgFromIframeToC3WithData") {
      console.log("Score: " + JSON.stringify(event.data.data));
      console.log(event.data.data);
      score = event.data.data;
      stopRecording();
    }
  };
  return (
    <div>
      {/*<p>{status}</p> */}

      <button onClick={startRecording}>Start Recording</button>

      {/*<button onClick={stopRecording}>Stop Recording</button>*/}
      {/*<video src={mediaBlobUrl || ''} controls autoPlay loop />*/}
    </div>
  );
};

export default function TournamentsNew() {
  return (
    <main style={{ color: "black" }}>
      <h2 style={{ color: "black" }}>The Squids</h2>
      <RecordView />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <iframe
          title={"Game"}
          style={{
            width: "80%",
            height: "300px",
            maxHeight: "80%",
            overflow: "hidden",
          }}
          src={""}
        />
      </div>
      <BackendCallsInterface />
    </main>
  );
}
