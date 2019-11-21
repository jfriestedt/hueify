import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

const TrackInfo = ({ title, artist }) => {
  return (title && artist) ?
    <div id='track-info' style={{ width: '300px' }}>
      <h4>{title}</h4>
      <h5>{artist}</h5>
    </div> :
    null
}

const mapStateToProps = ({ spotifyPlayerState }) => {
  const currentTrack = get(spotifyPlayerState, [
    'track_window',
    'current_track'
  ]);

  return {
    title: get(currentTrack, 'name'),
    artist: get(currentTrack, ['artists', 0, 'name'])
  }
}

export default connect(mapStateToProps)(TrackInfo)
