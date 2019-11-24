import React from 'react';
import { connect } from 'react-redux';
import { chain, get } from 'lodash';

const TrackInfo = ({ title, artists }) => {
  return <div id='track-info' style={{
    opacity: (title && artists) ? 1 : 0,
    transition: 'opacity 200ms ease',
    transitionDelay: '500ms',
    width: '300px',
  }}>
    <h5><strong>{title ? title : ''}</strong></h5>
    <h6 style={{ fontSize: '14px' }}>
      {artists ? artists : ''}
    </h6>
  </div>
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
