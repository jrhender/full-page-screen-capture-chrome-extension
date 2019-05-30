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

    async enumerateDevices() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
            return;
        }
          
        // List cameras and microphones.
        navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            devices.forEach(function(device) {
                console.log(device.kind + ": " + device.label +
                            " id = " + device.deviceId);
            });
        })
        .catch(function(err) {
            console.log(err.name + ": " + err.message);
        });
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
                    <select value={this.state.selectedTeam} 
                            onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
                        {this.state.teams.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                    </select>
                    {/* <div style={{color: 'red', marginTop: '5px'}}>
                    {this.state.validationError}
                    </div> */}
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