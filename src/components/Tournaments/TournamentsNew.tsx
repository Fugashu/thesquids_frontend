import {useEffect} from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import {signer} from "../cojodi/MetamaskConnection/Wallet";
import * as React from "react";


const RecordView = () => {
    const {
        //status,
        startRecording,
        stopRecording,
        //mediaBlobUrl,
    } = useReactMediaRecorder({ screen: true,video:true, onStop:(blobUrl,blob) => uploadFile(blobUrl,blob)})

// eslint-disable-next-line
    function upload(blobUrl: string, blob: Blob){
            console.log(blob);
            const formData =
                {
                    "score": 0,
                    "replay": "string"
                }
            try {
                axios({
                    method: "post",
                    url: "http://127.0.0.1:8000/upload",
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } catch(error) {
                console.log(error)
            }

        }
// eslint-disable-next-line
    const saveFile = async (blob:Blob) => {
        const a = document.createElement('a');
        a.download = 'my-file.txt';
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    };

    async function uploadFile(blobUrl: string, blob: Blob){
        console.log(blob);
        console.log(blobUrl);
        let connectedAddress = await signer.getAddress();
        const formData = new FormData();
        formData.append('file', blob, connectedAddress.toString());

        console.log(formData);
        try {
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/blobb",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
        } catch(error) {
            console.log(error)
        }

    }


    useEffect(() => {
        startRecording();
    },
    // eslint-disable-next-line
        []);

    window.onmessage = function(event) {
        //A single message
        if (event.data === 'MsgFromIframeToC3') {
            console.log('Message from iFrame Received');


        }
        //a message with data
        if(event.data.event_id === 'MsgFromIframeToC3WithData'){
            console.log( "Score: "+ JSON.stringify(event.data.data));
            console.log(event.data.data);
            stopRecording();

        }
    }
    return (
        <div>
            {/*<p>{status}</p> */}

            {/*<button onClick={stopRecording}>Stop Recording</button>*/}

            {/*<video src={mediaBlobUrl || ''} controls autoPlay loop />*/}
        </div>
    );
};


export default function TournamentsNew() {
    return (
        <main style={{ color:"black"}}>
            <h2 style={{color:"black"}}>The Squids</h2>
            <RecordView/>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <iframe title={'Game'} style={{width:'80%',height:'900px', maxHeight:'80%', overflow:'hidden'}}
                     src={''}/>

        </div>
        </main>
    );
}