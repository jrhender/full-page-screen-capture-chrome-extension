import React from 'react';

interface IVideoCaptureProps {
    videoRef: HTMLVideoElement | undefined;
    onImageUrlChange: (imageUrl: string) => void
}

interface IVideoCaptureState {
    imageSrc: string
}

class VideoCapture extends React.Component<IVideoCaptureProps, IVideoCaptureState> {
    
    private canvas: HTMLCanvasElement | null

    constructor(props: IVideoCaptureProps) {
        super(props);
        this.state = {
            imageSrc: ""
        }
        this.canvas = null;
        this.takePicture = this.takePicture.bind(this);
    }

    takePicture() {
        if (!this.canvas) {
            console.log("Canvas reference was null");
            return
        }
        var context = this.canvas.getContext('2d');
        var video = this.props.videoRef;
        if (video && context) {
            this.canvas.width = video.width;
            this.canvas.height = video.height;
            context.drawImage(video, 0, 0, video.width, video.height);
            var data = this.canvas.toDataURL('image/png');
            this.props.onImageUrlChange(data); 
            this.setState({
                imageSrc: data
            });
        } else {
            //clearphoto();
        }
    }
    
    render () {
        return (
            <div>
                <button id="startbutton" onClick={this.takePicture}>Take photo</button>
                <canvas id="canvas" 
                    ref={(ref) => {this.canvas = ref}}/>
                <div style={{display:'none'}}>
                    <img id="photo" alt="The screen capture will appear in this box." src={this.state.imageSrc}/>
                </div>
            </div>
        )
    }
};

export default VideoCapture;