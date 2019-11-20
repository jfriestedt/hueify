import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.scss'

class HueInterface extends Component {

  async componentDidMount () {
    const bridgeIPs = fetch('https://discovery.meethue.com/')
      .then((response) => response.json() )
      .then((bridges) => bridges.map((bridge) => bridge.internalipaddress))

    return bridgeIPs
  }

  render () {
    return <div></div>
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(HueInterface);
