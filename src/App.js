import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.sass'

import AlbumArt from './components/album_art'
import ColorExtractor from './components/color_extractor'
import LoginPrompt from './components/login'
import PlayerInterface from './components/player_interface'
import TrackInfo from './components/track_info'

class App extends Component {
  constructor () {
    super();
    this.appStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute'
    }
  }

  render () {
    return (
      <div className="App" style={this.appStyle}>
        <LoginPrompt />
        <TrackInfo />
        <ColorExtractor />
        <AlbumArt />
        <PlayerInterface />
      </div>
    );
  }
}

export default connect()(App);
