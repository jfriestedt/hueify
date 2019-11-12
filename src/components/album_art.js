import React from 'react';
import { connect } from 'react-redux';
import { chain } from 'lodash';

const AlbumArt = ({ albumArtUrl }) => {
  return albumArtUrl ?
    <img alt='album art' src={albumArtUrl} /> :
    null
}

const mapStateToProps = ({ spotifyPlayerState }) => {
  const image = chain(spotifyPlayerState)
    .get(['track_window', 'current_track', 'album', 'images'])
    .find({ height: 300 })
    .value();

  return {
    albumArtUrl: image ? image.url : ''
  }
}

export default connect(mapStateToProps)(AlbumArt)
