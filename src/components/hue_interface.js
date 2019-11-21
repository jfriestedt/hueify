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
    return <div>
      Philips Hue IPs:
      {this.props.hueBridgeIps.map((ip) => {
        return <div key={ip}>{ip}</div>
      })}
    </div>
  }
}

const mapStateToProps = ({ hueBridgeIps }) => {
  return { hueBridgeIps }
}

export default connect(mapStateToProps)(HueInterface);
