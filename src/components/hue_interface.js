import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import '../App.scss'

class HueInterface extends Component {

  async componentDidMount () {
    const response = await fetch('https://discovery.meethue.com');
    if (response.ok) {
      const bridges = await response.json();
      if (!isEmpty(bridges)) {
        this.props.dispatch({
          type: 'HUE_BRIDGES_DISCOVERED',
          payload: bridges.map((bridge) => bridge.internalipaddress)
        })
      }
    }
  }

  // TODO: this should be a thunk action (I think?)
  attemptUserCreations () {
    this.props.bridgeIPs.forEach((ip) => {
      return fetch(`http://${ip}/api`, {
        method: 'POST',
        body: JSON.stringify({ devicetype: 'hueify#hueify' })
      }).then((response) => {
        if (response.ok) {
          return response.json().then((parsedResponse) => {
            if (get(parsedResponse, [0, 'success'])) {
              console.log('success!')
            }
          })
        }
      })
    });
  }

  beginPolling () {
    this.attemptUserCreations();
    this.pollingTimeout = setInterval(
      (() => this.attemptUserCreations()),
      1000
    );
  }

  componentDidUpdate (prevProps) {
    if (isEmpty(prevProps.bridgeIPs) && !isEmpty(this.props.bridgeIPs)) {
      this.beginPolling();
    }
  }

  render () {
    return isEmpty(this.props.bridgeIPs) ?
      null :
      <ul style={{ margin: '20px', position: 'absolute' }}>
        <h6>Philips Hue IPs:</h6>
        {this.props.bridgeIPs.map((ip) => {
          return <li key={ip}>{ip}</li>
        })}
      </ul>
  }
}

const mapStateToProps = ({ bridgeIPs }) => {
  return { bridgeIPs };
}

export default connect(mapStateToProps)(HueInterface);
