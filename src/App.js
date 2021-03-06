import Bowser from 'bowser';
import { assign, first, get, isEmpty, last, nth } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.scss'

import AlbumArt from './components/album_art'
import ColorExtractor from './components/color_extractor'
import GradientMask from './components/gradient_mask'
import HueInterface from './components/hue_interface'
import LoginPrompt from './components/login_prompt'
import PlayerInterface from './components/player_interface'
import TrackInfo from './components/track_info'

class App extends Component {
  constructor () {
    super();
    const browserInfo = Bowser.parse(window.navigator.userAgent);
    this.isBrowserSupported =
      get(browserInfo, ['platform', 'type']) === 'desktop';

    this.mainStyleBase = {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      transition: 'background-color 200ms ease, color 200ms ease',
      width: '100%',
      zIndex: -2
    }
  }

  renderBrowserNotSupported () {
    return <div style={this.mainStyle}>
      <h4 className='error'>
        Sorry homie, Hueify only works on Desktop browsers. :'(
      </h4>
    </div>
  }

  renderApp () {
    const { bgHex, textHex } = this.props,
          style = assign({}, this.mainStyleBase, {
      backgroundColor: bgHex,
      color: textHex
    });

    return <div>
      <HueInterface />
      <div style={style}>
        <LoginPrompt />
        <AlbumArt />
        <ColorExtractor />
        <TrackInfo />
        <PlayerInterface />
        <GradientMask />
      </div>
    </div>
  }

  render () {
    return <div className='App'>
      {this.isBrowserSupported ?
        this.renderApp() :
        this.renderBrowserNotSupported()}
    </div>
  }
}

const mapStateToProps = ({ palette }) => {
  let textHex, bgHex;
  if (!isEmpty(palette)) {
    bgHex = nth(palette, 1).getHex();
    textHex = palette.length === 1 ? '#FFFFFF' : last(palette).getHex();
  }

  return { bgHex, textHex }
}

export default connect(mapStateToProps)(App);
