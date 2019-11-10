import React from 'react';
import { connect } from 'react-redux';

const LoginPrompt = ({ loggedIn }) => {
    return loggedIn
      ? <h3>Login Success</h3>
      : <a className='button' href='/login'>Log in to Spotify</a>
}

const mapStateToProps = (state) => {
  const { tokens } = state
  return { loggedIn: !!(tokens.accessToken && tokens.refreshToken) }
}

export default connect(mapStateToProps)(LoginPrompt);
