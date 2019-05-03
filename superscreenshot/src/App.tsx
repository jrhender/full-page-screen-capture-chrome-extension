import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { firebase } from './setupFirebase';

class App extends Component {
  CaptureToGoogleCloud = function(){
    chrome.tabs.captureVisibleTab({format: 'png', quality: 100}, function(dataURI: string) {
        if (dataURI) {
          if(firebase.storage)
          {
            // Create a root reference
            let storageRef = firebase.storage().ref()

            // Create a reference to 'images/mountains.jpg'
            var ref = storageRef.child('images/mountains2.jpg');

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
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <input type='button' value='captureToFirebase' onClick={this.CaptureToGoogleCloud} />
        </header>
        <form>
          <label>Touchdown</label>
          <input type="checkbox"/>
        </form>
      </div>
    );
  }
}

export default App;
