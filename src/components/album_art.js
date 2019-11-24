import React from 'react';
import { connect } from 'react-redux';
import { assign, chain, nth } from 'lodash';

const AlbumArt = ({ albumArtUrl, glowColor }) => {
  return <div style={{ boxShadow: `0 0 100px ${glowColor}`,
                       height: '300px',
                       opacity: albumArtUrl ? 1 : 0,
                       transition: 'box-shadow 200ms ease, opacity 200ms ease',
                       transitionDelay: '0ms, 300ms',
                       transitionProperty: 'box-shadow, opacity',
                       width: '300px' }}>
    {albumArtUrl && <img alt='album art'
                         src={albumArtUrl}
                         height='300'
                         width='300'
                         decoding='sync' />}
  </div>
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
