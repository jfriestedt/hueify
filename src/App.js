import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bowser from 'bowser';
import { assign, first, get, isEmpty, last, nth } from 'lodash';
import './App.scss'

import AlbumArt from './components/album_art'
import ColorExtractor from './components/color_extractor'
import LoginPrompt from './components/login'
import PlayerInterface from './components/player_interface'
import HueInterface from './components/hue_interface'
import TrackInfo from './components/track_info'
import GradientMask from './components/gradient_mask'

class App extends Component {
  constructor () {
    super();
    const browserInfo = Bowser.parse(window.navigator.userAgent);
    this.isBrowserSupported = get(browserInfo, ['platform', 'type']) === 'desktop';

    this.mainStyleBase = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      transition: 'background-color 200ms ease, color 200ms ease',
      zIndex: -2
    }
  }

  render () {
    const mainStyle = assign({}, this.mainStyleBase, {
      backgroundColor: this.props.maskHex,
      color: this.props.lightHex,
    })

    return this.isBrowserSupported ?
      <div className="App">
        <HueInterface />
        <div style={mainStyle}>
          <LoginPrompt />
          <AlbumArt />
          <ColorExtractor />
          <TrackInfo />
          <PlayerInterface />
          <GradientMask />
        </div>
      </div> :
      <div className="App">
        <div style={this.mainStyle}>
          <h4 className='error'>
            Sorry homie, Hueify only works on Desktop browsers. :'(
          </h4>
        </div>
      </div>
  }
}

// TODO: Fix up fallback logic
const mapStateToProps = ({ palette }) => {
  let darkHex, lightHex, maskHex;
  if (!isEmpty(palette)) {
    darkHex = first(palette).getHex();
    maskHex = nth(palette, 1).getHex();
    lightHex = last(palette).getHex();
    if (maskHex === lightHex) { lightHex = '#FFFFFF' };
  }

  return { darkHex, lightHex, maskHex }
}

export default connect(mapStateToProps)(App);
