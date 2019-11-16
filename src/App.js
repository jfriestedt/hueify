import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bowser from 'bowser';
import { get } from 'lodash';
import './App.scss'

import AlbumArt from './components/album_art'
import ColorExtractor from './components/color_extractor'
import LoginPrompt from './components/login'
import PlayerInterface from './components/player_interface'
import TrackInfo from './components/track_info'

class App extends Component {
  constructor () {
    super();
    const browserInfo = Bowser.parse(window.navigator.userAgent);
    this.isBrowserSupported = get(browserInfo, ['platform', 'type']) === 'desktop';
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
    return this.isBrowserSupported ?
      <div className="App" style={this.appStyle}>
        <LoginPrompt />
        <TrackInfo />
        <ColorExtractor />
        <AlbumArt />
        <PlayerInterface />
      </div> :
      <div className="App" style={this.appStyle}>
        <h4 style={{ color: 'red' }}>
          Sorry homie, Hueify only works on Desktop browsers. :'(
        </h4>
      </div>
  }
}

export default connect()(App);
