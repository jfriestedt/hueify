import React from 'react';
import { connect } from 'react-redux';

const Login = ({ loggedIn }) => {
    return loggedIn
             ? <div>Ya logged in</div>
             : <div>Y'ain't logged in</div>
}

const mapStateToProps = (state) => {
  const { tokens } = state
  return { loggedIn: !!(tokens.accessToken && tokens.refreshToken) }
}

export default connect(mapStateToProps)(Login);
