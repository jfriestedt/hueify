import React from 'react';
import { connect } from 'react-redux';

const LoginPrompt = ({ loggedIn }) => {
  const style = {
    position: 'absolute',
    zIndex: 1
  }

  return loggedIn
    ? null
    : <a href='/login' className='button' style={style}>
        Log in to Spotify
      </a>
}

const mapStateToProps = (state) => {
  const { tokens: { refreshToken } } = state
  return { loggedIn: !!refreshToken }
}

export default connect(mapStateToProps)(LoginPrompt);
