import React from 'react';
import { connect } from 'react-redux';
import { chain, get } from 'lodash';

const TrackInfo = ({ title, artists }) => {
  return (title && artists) ?
    <div id='track-info' style={{ width: '300px' }}>
      <h5><strong>{title}</strong></h5>
      <h6 style={{ fontSize: '14px' }}>{artists}</h6>
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
    artists: chain(get(currentTrack, 'artists') || [])
      .map('name')
      .join(', ')
      .value()
  }
}

export default connect(mapStateToProps)(TrackInfo)
