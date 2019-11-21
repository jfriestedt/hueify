import React from 'react';
import { connect } from 'react-redux';
import { chain } from 'lodash';

const AlbumArt = ({ albumArtUrl }) => {
  return albumArtUrl ?
    <img alt='album art'
         src={albumArtUrl}
         height='300'
         width='300'
         decoding='sync'
         style={{ height: '300px',
                  width: '300px' }} /> :
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
