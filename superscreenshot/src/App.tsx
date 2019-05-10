import React from 'react';
import { firebase } from './setupFirebase';
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

class App extends React.PureComponent<IProps, IState> {
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

  captureToGoogleCloud = function(homeTeamName: string, awayTeamName: string, gameDate: string, isTouchdown: boolean){
    chrome.tabs.captureVisibleTab({format: 'png', quality: 100}, function(dataURI: string) {
        if (dataURI) {
          if(firebase.storage)
          {
            // Create a root reference
            let storageRef = firebase.storage().ref()
            
            // Calculate name
            if(isTouchdown) {
              var ref = storageRef.child(`images/touchdown/${homeTeamName}_${awayTeamName}_${gameDate}_isTD`);
            }
            else {
              var ref = storageRef.child(`images/nottouchdown/${homeTeamName}_${awayTeamName}_${gameDate}_notTD`);
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
    this.setState({homeTeamName: teamName});
  }

  handleChangeAwayTeamName(teamName : string) {
    this.setState({awayTeamName: teamName});
  }

  handleChangeTDCheckbox(event : React.ChangeEvent<HTMLInputElement>) {
    this.setState({isTouchdown: event.target.checked});
  }

  handleChangeGameDatePicker(event : React.ChangeEvent<HTMLInputElement>) {
    this.setState({gameDate: event.target.value});
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
            <TeamDropdown onTeamChange={this.handleChangeHomeTeamName}/>
          </label>
          <label>
            Away Team Name:
            <TeamDropdown onTeamChange={this.handleChangeAwayTeamName}/>
          </label>
          <label>
            Game Date:
            <input type="date" onChange={this.handleChangeGameDatePicker} />
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
