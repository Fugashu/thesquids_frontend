import { ReactMediaRecorder } from "react-media-recorder";
export default function Tournaments() {




    <a href='/somefile.txt' download>Click to download</a>
    return (
        <main style={{ color:"black"}}>
            <h2 style={{color:"black"}}>Tournaments</h2>
            <ReactMediaRecorder
                video
                screen={true}
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <p style={{color:"black"}}>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} width={200} height={200} controls/>
                        <p style={{color:"black"}}>{mediaBlobUrl}</p>
                        <button><a href={mediaBlobUrl} download>Download file</a></button>
                    </div>
                )}
            />
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <iframe title={'Game'} style={{width:'80%',height:'900px', maxHeight:'80%', overflow:'hidden'}}
                     src={'https://lli0u7bqli4c0b1pwwnizq.on.drv.tw/HTML/'}/>
</div>
        </main>
    );
}