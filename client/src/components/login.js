import React from 'react';
import { connect } from 'react-redux';

const LoginPrompt = ({ loggedIn }) => {
    return loggedIn
             ? <p>Ya logged in</p>
             : <a href='/login' referrerPolicy='unsafe-url'>Y'ain't logged in</a>
}

const mapStateToProps = (state) => {
  const { tokens } = state
  return { loggedIn: !!(tokens.accessToken && tokens.refreshToken) }
}

export default connect(mapStateToProps)(LoginPrompt);
