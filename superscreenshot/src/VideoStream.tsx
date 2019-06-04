import React from 'react';

interface IVideoStreamProps {
}

interface IVideoStreamState {
    videoDevices: MediaDeviceInfo[];
    selectedDeviceId: string
}

class VideoStream extends React.Component<IVideoStreamProps, IVideoStreamState> {
    
    private video: HTMLVideoElement | null

    constructor(props: IVideoStreamProps) {
        super(props);
        this.state = {
            videoDevices: new Array<MediaDeviceInfo>(),
            selectedDeviceId: ""
        }
        this.video = null;
        this.useVideoStream = this.useVideoStream.bind(this);
    }

    async componentDidMount() {
        this.enumerateDevices();
    }

    async useVideoStream() {
        let constraints: MediaStreamConstraints = {
            audio: false,
            video: {deviceId: this.state.selectedDeviceId}
        }

        try {
            let mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video ? this.video.srcObject = mediaStream : null;
        } catch(error) {
            console.log(error);
            window.alert(error.message);
        }
    }

    async enumerateDevices() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
        }
          
        // List cameras and microphones.
        try {
            let devices = await navigator.mediaDevices.enumerateDevices();
            let videoDevices = devices.filter(d => d.kind == "videoinput");
            videoDevices.forEach(function(device) {
                console.log(device.kind + ": " + device.label +
                            " id = " + device.deviceId);
            });
            this.setState({
                videoDevices : videoDevices
            })
        } catch (err) {
            console.log(err.name + ": " + err.message);
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
                <div>
                    <select value={this.state.selectedDeviceId} 
                            onChange={(e) => this.setState({selectedDeviceId: e.target.value})}>
                        {this.state.videoDevices.map((vd) => <option key={vd.deviceId} value={vd.deviceId}>{vd.label}</option>)}
                    </select>
                    <input 
                        type='button' 
                        value='enumerate devices'
                        onClick={this.enumerateDevices}
                    />
                </div>
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