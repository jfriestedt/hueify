import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { assign, chain, nth } from 'lodash';

const AlbumArt = ({ albumArtUrl, glowColor, spotifyPlayerMounted }) => {
  const containerStyle = {
    boxShadow: `0 0 100px ${glowColor}`,
    height: '300px',
    transitionDelay: '600ms',
    width: '300px'
  }
  const imgStyle = {
    transition: 'box-shadow 0.5s ease'
  }

  return <CSSTransition in={!!albumArtUrl}
                        exit={false}
                        timeout={200}
                        classNames='fade'
                        unmountOnExit >
    <div style={containerStyle}>
      {albumArtUrl ?
        <img alt='album art'
             src={albumArtUrl}
             height='300'
             width='300'
             decoding='sync'
             style={imgStyle} /> :
        null}
    </div>
  </CSSTransition>
}

const mapStateToProps = ({ palette, spotifyPlayerState }) => {
  const image = chain(spotifyPlayerState)
    .get(['track_window', 'current_track', 'album', 'images'])
    .find({ width: 300 })
    .value();
  const glowColor = palette ?
    palette.length > 1 ?
      nth(palette, ((palette.length / 2) - 1)).getHex() :
      '#FFFFFF' :
    null;

  return {
    albumArtUrl: image ? image.url : null,
    glowColor,
  }
}

export default connect(mapStateToProps)(AlbumArt)
