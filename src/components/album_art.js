import React from 'react';
import { connect } from 'react-redux';
import { assign, chain, nth } from 'lodash';

const AlbumArt = ({ albumArtUrl, glowColor }) => {
  const styleBase = {
    boxShadow: `0 0 100px ${glowColor}`,
    height: '300px',
    transition: 'box-shadow 0.5s ease',
    width: '300px'
  }

  return albumArtUrl ?
    <img alt='album art'
         src={albumArtUrl}
         height='300'
         width='300'
         decoding='sync'
         style={assign({}, styleBase, {})} /> :
    null
}

const mapStateToProps = ({ spotifyPlayerState, palette }) => {
  const image = chain(spotifyPlayerState)
    .get(['track_window', 'current_track', 'album', 'images'])
    .find({ width: 300 })
    .value();

  return {
    albumArtUrl: image ? image.url : '',
    glowColor: palette ?
      palette.length > 1 ?
        nth(palette, ((palette.length / 2) - 1)).getHex() :
        '#FFFFFF' :
      null
  }
}

export default connect(mapStateToProps)(AlbumArt)
