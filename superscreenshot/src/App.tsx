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
      videoRef: undefined
    };
    this.handleChangeHomeTeamName = this.handleChangeHomeTeamName.bind(this);
    this.handleChangeAwayTeamName = this.handleChangeAwayTeamName.bind(this);
    this.handleChangeHomeTeamTDCheckbox = this.handleChangeHomeTeamTDCheckbox.bind(this);
    this.handleChangeAwayTeamTDCheckbox = this.handleChangeAwayTeamTDCheckbox.bind(this);
    this.handleChangeGameDatePicker = this.handleChangeGameDatePicker.bind(this);
    this.handleChangeVideoRef = this.handleChangeVideoRef.bind(this);
  }

  async componentDidMount() {
    // var data: any = await getStorageData('homeTeamName');
    // const homeTeamName = data['homeTeamName'];

    // var data: any = await getStorageData('awayTeamName');
    // const awayTeamName = data['awayTeamName'];

    // var data: any = await getStorageData('gameDate');
    // const gameDate = data['gameDate'];

    // this.setState({
    //   homeTeamName: homeTeamName || '',
    //   awayTeamName: awayTeamName || '',
    //   gameDate: gameDate || ''
    // });
  }

  captureToGoogleCloud = function(homeTeamName: string, awayTeamName: string, gameDate: string, isHomeTeamTouchdown: boolean, isAwayTeamTouchdown: boolean){
    chrome.tabs.captureVisibleTab({format: 'png', quality: 100}, function(dataURI: string) {
        if (dataURI) {
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
            if(isHomeTeamTouchdown && !isAwayTeamTouchdown) {
              var ref = storageRef.child(`images/touchdown/${homeTeamName}_${awayTeamName}_${gameDate}_isHomeTeamTD_${dateString}`);
            }
            else if(!isHomeTeamTouchdown && isAwayTeamTouchdown) {
              var ref = storageRef.child(`images/touchdown/${homeTeamName}_${awayTeamName}_${gameDate}_isAwayTeamTD_${dateString}`);
            }
            else if(!isHomeTeamTouchdown && !isAwayTeamTouchdown) {
              var ref = storageRef.child(`images/touchdown/${homeTeamName}_${awayTeamName}_${gameDate}_notTD_${dateString}`);
            }
            else {
              return;
            }

            // Upload image
            ref.putString(dataURI, 'data_url')
            .then(function(snapshot) {
                console.log('Uploaded a data_url string!');
            })
            .catch(function(error) {
                console.log(error);
                window.alert(error.message);
            })
          }   
        }
      }
    );
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
  
  render() {
    return (
      <div className="App">
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
            value='captureToFirebase'
            onClick={() => this.captureToGoogleCloud(this.state.homeTeamName, this.state.awayTeamName, this.state.gameDate, this.state.isHomeTeamTouchdown, this.state.isAwayTeamTouchdown)} />
        </form>
        <VideoStream onVideoUpdate={this.handleChangeVideoRef}/>
        <VideoCapture videoRef={this.state.videoRef}/>
      </div>
    );
  }
}

export default App;
