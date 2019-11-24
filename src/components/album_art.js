import React from 'react';
import { connect } from 'react-redux';
import { chain, nth } from 'lodash';

const AlbumArt = ({ albumArtUrl, glowColor }) => {
  const style = {
    boxShadow: `0 0 100px ${glowColor}`,
    height: '300px',
    opacity: albumArtUrl ? 1 : 0,
    transition: 'box-shadow 200ms ease 0ms, opacity 200ms ease 300ms',
    width: '300px'
  }

  return <div style={style}>
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
    .sortBy((image) => Math.abs(image.width - 300))
    .first()
    .value();

  return {
    albumArtUrl: (image && image.url) || '',
    glowColor: (
      palette && palette.length > 1 &&
      nth(palette, ((palette.length / 2) - 1)).getHex()
    ) || '#FFFFFF'
  }
}

export default connect(mapStateToProps)(AlbumArt)
