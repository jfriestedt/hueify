import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { chain, get } from 'lodash';

const TrackInfo = ({ title, artists }) => {
  return <CSSTransition in={title && artists}
                        exit={false}
                        timeout={200}
                        classNames='fade'
                        unmountOnExit >
    <div id='track-info' style={{ transitionDelay: '600ms', width: '300px' }}>
      <h5><strong>{title}</strong></h5>
      <h6 style={{ fontSize: '14px' }}>{artists}</h6>
    </div>
  </CSSTransition>
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
