import React from 'react';
import { connect } from 'react-redux';

const LoginPrompt = ({ loggedIn }) => {
  return loggedIn
    ? null
    : <a className='button' href='/login'>Log in to Spotify</a>
}

const mapStateToProps = (state) => {
  const { tokens: { refreshToken } } = state
  return { loggedIn: !!refreshToken }
}

export default connect(mapStateToProps)(LoginPrompt);
