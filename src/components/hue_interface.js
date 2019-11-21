import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import '../App.scss'

class HueInterface extends Component {

  componentDidMount () {
    const bridgeIPs = fetch('https://discovery.meethue.com/')
      .then((response) => response.json() )
      .then((bridges) => {
        this.props.dispatch({
          type: 'HUE_BRIDGES_DISCOVERED',
          payload: bridges.map((bridge) => bridge.internalipaddress)
        })
      })

    return bridgeIPs
  }

  componentDidUpdate (prevProps) {
    if (isEmpty(prevProps.bridgeIps) && !isEmpty(this.props.bridgeIps)) {
      // this.beginPolling();
    }
  }

  render () {
    return isEmpty(this.props.hueBridgeIps) ?
      null :
      <ul style={{ margin: '20px', position: 'absolute' }}>
        <h6>Philips Hue IPs:</h6>
        {this.props.hueBridgeIps.map((ip) => {
          return <li key={ip}>{ip}</li>
        })}
      </ul>
  }
}

const mapStateToProps = ({ hueBridgeIps }) => {
  return { hueBridgeIps }
}

export default connect(mapStateToProps)(HueInterface);
