import React, { useState } from 'react';

interface IMediaStreamProps {
}

const MediaStream = ((props: IMediaStreamProps) => {
    
    const [mediaStream, setStream] = useState();
    
    const useMediaStream = async function() {
        let constraints: MediaStreamConstraints = {
            audio: false,
            video: true
        }

        try {
            let stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(stream);
        } catch(error) {
            console.log(error);
            window.alert(error.message);
        }
    }
    
    return (
        <div>
            <input 
                type='button' 
                value='open video stream'
                onClick={useMediaStream}
            />
            <video 
                id="video" 
                width="160" 
                height="120" 
                ref={video => { 
                    video 
                    ? video.srcObject = mediaStream
                    : null
                }} 
            />
        </div>
        
    )
});

export default MediaStream;