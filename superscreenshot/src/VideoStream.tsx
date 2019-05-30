import React from 'react';

interface IVideoStreamProps {
}

interface IVideoStreamState {
}

class VideoStream extends React.Component<IVideoStreamProps, IVideoStreamState> {
    constructor(props: IVideoStreamProps) {
        super(props);
        this.video = null;
        this.useVideoStream = this.useVideoStream.bind(this);
    }

    private video: HTMLVideoElement | null

    async useVideoStream() {
        let constraints: MediaStreamConstraints = {
            audio: false,
            video: true
        }

        try {
            let mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video ? this.video.srcObject = mediaStream : null;
        } catch(error) {
            console.log(error);
            window.alert(error.message);
        }
    }
    
    render () {
        return (
            <div>
                <input 
                    type='button' 
                    value='open video stream'
                    onClick={this.useVideoStream}
                />
                <video 
                    id="video" 
                    width="160" 
                    height="120"
                    autoPlay={true}
                    ref={(ref) => {this.video = ref}}
                />
            </div>
        )
    }
};

export default VideoStream;