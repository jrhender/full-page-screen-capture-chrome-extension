import React from 'react';
import { firebase } from './setupFirebase';
import { getStorageData, setStorageData } from './chromeStorageUtils';
import TeamDropdown from './TeamDropdown';
import logo from './cartoon-football-png-16.png';
import './App.css';

interface IProps {
}

interface IState {
  homeTeamName: string;
  awayTeamName: string;
  gameDate: string;
  isTouchdown: boolean;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      homeTeamName: '',
      awayTeamName: '',
      gameDate: '',
      isTouchdown: true
    };
    this.handleChangeHomeTeamName = this.handleChangeHomeTeamName.bind(this);
    this.handleChangeAwayTeamName = this.handleChangeAwayTeamName.bind(this);
    this.handleChangeTDCheckbox = this.handleChangeTDCheckbox.bind(this);
    this.handleChangeGameDatePicker = this.handleChangeGameDatePicker.bind(this);
  }

  async componentDidMount() {
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

  captureToGoogleCloud = function(homeTeamName: string, awayTeamName: string, gameDate: string, isTouchdown: boolean){
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
            if(isTouchdown) {
              var ref = storageRef.child(`images/touchdown/${homeTeamName}_${awayTeamName}_${gameDate}_isTD_${dateString}`);
            }
            else {
              var ref = storageRef.child(`images/nottouchdown/${homeTeamName}_${awayTeamName}_${gameDate}_notTD_${dateString}`);
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
    let newState = {homeTeamName: teamName};
    setStorageData(newState);
    this.setState(newState);
  }

  handleChangeAwayTeamName(teamName : string) {
    let newState = {awayTeamName: teamName};
    setStorageData(newState);
    this.setState(newState);
  }

  handleChangeTDCheckbox(event : React.ChangeEvent<HTMLInputElement>) {
    this.setState({isTouchdown: event.target.checked});
  }

  handleChangeGameDatePicker(event : React.ChangeEvent<HTMLInputElement>) {
    let newState = {gameDate: event.target.value};
    setStorageData(newState);
    this.setState(newState);
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
            Is Touchdown:
            <input type="checkbox" defaultChecked={this.state.isTouchdown} onChange={this.handleChangeTDCheckbox}/>
          </label>
          <input type='button' value='captureToFirebase' onClick={() => this.captureToGoogleCloud(this.state.homeTeamName, this.state.awayTeamName, this.state.gameDate, this.state.isTouchdown)} />
        </form>
      </div>
    );
  }
}

export default App;
