import React from 'react';
import { firebase } from './setupFirebase';
import { getStorageData, setStorageData } from './chromeStorageUtils';
import TeamDropdown from './TeamDropdown';
import VideoStream from './VideoStream';
import logo from './cartoon-football-png-16.png';
import './App.css';
import VideoCapture from './VideoCapture';

interface IProps {
}

interface IState {
  homeTeamName: string;
  awayTeamName: string;
  gameDate: string;
  isHomeTeamTouchdown: boolean;
  isAwayTeamTouchdown: boolean;
  videoRef: HTMLVideoElement | undefined;
  imageUrl: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      homeTeamName: '',
      awayTeamName: '',
      gameDate: '',
      isHomeTeamTouchdown: false,
      isAwayTeamTouchdown: false,
      videoRef: undefined,
      imageUrl: ''
    };
    this.handleChangeHomeTeamName = this.handleChangeHomeTeamName.bind(this);
    this.handleChangeAwayTeamName = this.handleChangeAwayTeamName.bind(this);
    this.handleChangeHomeTeamTDCheckbox = this.handleChangeHomeTeamTDCheckbox.bind(this);
    this.handleChangeAwayTeamTDCheckbox = this.handleChangeAwayTeamTDCheckbox.bind(this);
    this.handleChangeGameDatePicker = this.handleChangeGameDatePicker.bind(this);
    this.handleChangeVideoRef = this.handleChangeVideoRef.bind(this);
    this.handleChangeScreenShotURL = this.handleChangeScreenShotURL.bind(this);
  }

  async componentDidMount() {
    try {
      var data: any = await getStorageData('homeTeamName');
      const homeTeamName = data['homeTeamName'];
  
      var data: any = await getStorageData('awayTeamName');
      const awayTeamName = data['awayTeamName'];
  
      var data: any = await getStorageData('gameDate');
      const gameDate = data['gameDate'];
  
      this.setState({
        homeTeamName: homeTeamName || '',
        awayTeamName: awayTeamName || '',
        gameDate: gameDate || ''
      });
    }
    catch {
      console.log("form values not loaded")
    }
  }

  captureTabToFirebase(){
    chrome.tabs.captureVisibleTab({format: 'png', quality: 100}, (dataURI: string) => {
        this.sendImageDataUrlToFirebase(dataURI);
      }
    );
  }

  captureVideoStreamToFirebase() {
    this.sendImageDataUrlToFirebase(this.state.imageUrl);
  }

  sendImageDataUrlToFirebase(dataUrl: string) {
    if(firebase.storage)
    {
      // Create Date string
      let now = new Date();
      let year = now.getUTCFullYear().toString();
      let month = now.getUTCMonth().toString();
      let day = now.getUTCDate().toString();
      let hour = now.getUTCHours().toString();
      let minute = now.getUTCHours().toString();
      let seconds = now.getUTCSeconds().toString();
      let milliseconds = now.getUTCMilliseconds().toString();
      let dateString = year.concat('-',month,'-',day,'T',hour,'-',minute,'-',seconds,'-',milliseconds);
      
      // Create a root reference
      let storageRef = firebase.storage().ref()
      
      // Calculate name
      if(this.state.isHomeTeamTouchdown && ! this.state.isAwayTeamTouchdown) {
        var ref = storageRef.child(`images/touchdown/${this.state.homeTeamName}_${this.state.awayTeamName}_${this.state.gameDate}_isHomeTeamTD_${dateString}.png`);
      }
      else if(!this.state.isHomeTeamTouchdown && this.state.isAwayTeamTouchdown) {
        var ref = storageRef.child(`images/touchdown/${this.state.homeTeamName}_${this.state.awayTeamName}_${this.state.gameDate}_isAwayTeamTD_${dateString}.png`);
      }
      else if(!this.state.isHomeTeamTouchdown && !this.state.isAwayTeamTouchdown) {
        var ref = storageRef.child(`images/nottouchdown/${this.state.homeTeamName}_${this.state.awayTeamName}_${this.state.gameDate}_notTD_${dateString}.png`);
      }
      else {
        return;
      }

      // Upload image
      ref.putString(dataUrl, 'data_url')
      .then(function(snapshot) {
          console.log('Uploaded a data_url string!');
      })
      .catch(function(error) {
          console.log(error);
          window.alert(error.message);
      })  
    }
  }

  handleChangeHomeTeamName(teamName : string) {
    setStorageData('homeTeamName', teamName);
    let newState = {homeTeamName: teamName};
    this.setState(newState);
  }

  handleChangeAwayTeamName(teamName : string) {
    setStorageData('awayTeamName', teamName);
    let newState = {awayTeamName: teamName};
    this.setState(newState);
  }

  handleChangeGameDatePicker(event : React.ChangeEvent<HTMLInputElement>) {
    let newDate = event.target.value;
    setStorageData('gameDate', newDate);
    let newState = {gameDate: newDate};
    this.setState(newState);
  }

  handleChangeHomeTeamTDCheckbox(event : React.ChangeEvent<HTMLInputElement>) {
    this.setState({isHomeTeamTouchdown: event.target.checked});
  }

  handleChangeAwayTeamTDCheckbox(event : React.ChangeEvent<HTMLInputElement>) {
    this.setState({isAwayTeamTouchdown: event.target.checked});
  }

  handleChangeVideoRef(video : HTMLVideoElement) {
    this.setState({videoRef: video});
  }

  handleChangeScreenShotURL(imageUrl : string) {
    this.setState({imageUrl: imageUrl});
  }
  
  render() {
    return (
      <div className="App">
        <div className="grid-container">
          <header className="App-header">
            <p>
              Superscreenshot!
            </p>
            <img src={logo} className="App-logo" alt="logo" />      
          </header>
          <form className="ImageDataForm">
            <label>
              Home Team Name:
              <TeamDropdown onTeamChange={this.handleChangeHomeTeamName} selectedTeam={this.state.homeTeamName}/>
            </label>
            <label>
              Away Team Name:
              <TeamDropdown onTeamChange={this.handleChangeAwayTeamName} selectedTeam={this.state.awayTeamName}/>
            </label>
            <label>
              Game Date:
              <input type="date" onChange={this.handleChangeGameDatePicker} value={this.state.gameDate}/>
            </label>
            <label>
              Is Home Team Touchdown:
              <input type="checkbox" defaultChecked={this.state.isHomeTeamTouchdown} onChange={this.handleChangeHomeTeamTDCheckbox}/>
            </label>
            <label>
              Is Away Team Touchdown:
              <input type="checkbox" defaultChecked={this.state.isHomeTeamTouchdown} onChange={this.handleChangeAwayTeamTDCheckbox}/>
            </label>
            <input 
              type='button' 
              value='Send To Firebase'
              onClick={() => this.captureVideoStreamToFirebase()} />
          </form>
          <VideoStream onVideoUpdate={this.handleChangeVideoRef}/>
          <VideoCapture videoRef={this.state.videoRef} onImageUrlChange={this.handleChangeScreenShotURL}/>
        </div>
      </div>
    );
  }
}

export default App;
