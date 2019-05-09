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
  isTouchdown: boolean;
}

class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      homeTeamName: '',
      awayTeamName: '',
      isTouchdown: true
    };
    this.handleChangeHomeTeamName = this.handleChangeHomeTeamName.bind(this);
    this.handleChangeTDCheckbox = this.handleChangeTDCheckbox.bind(this);
  }

  captureToGoogleCloud = function(homeTeamName: string, isTouchdown: boolean){
    chrome.tabs.captureVisibleTab({format: 'png', quality: 100}, function(dataURI: string) {
        if (dataURI) {
          if(firebase.storage)
          {
            // Create a root reference
            let storageRef = firebase.storage().ref()

            // Calculate date
            let day = new Date();
            let dd = String(day.getDate()).padStart(2, '0');
            let mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = day.getFullYear();
            let today = mm + '-' + dd + '-' + yyyy;
            
            // Calculate name
            if(isTouchdown) {
              var ref = storageRef.child(`images/football/touchdown/${homeTeamName}_1_${today}`);
            }
            else {
              var ref = storageRef.child(`images/football/nottouchdown/${homeTeamName}_0_${today}`);
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
            Is Touchdown:
            <input type="checkbox" defaultChecked={this.state.isTouchdown} onChange={this.handleChangeTDCheckbox}/>
          </label>
          <input type='button' value='captureToFirebase' onClick={() => this.captureToGoogleCloud(this.state.homeTeamName, this.state.isTouchdown)} />
        </form>
      </div>
    );
  }
}

export default App;
