import React from 'react';
import { connect } from 'react-redux';
import { assign, first, isEmpty } from 'lodash';

const GradientMask = ({ colorHex }) => {
  const styleBase = {
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: -1
  }

  return <div style={assign({}, styleBase, {
    background: (
      colorHex &&
      `linear-gradient(to top, ${colorHex}, rgba(0, 0, 0, 0))`
    )
  })} />
}

const mapStateToProps = ({ palette }) => {
  return { colorHex: !isEmpty(palette) && first(palette).getHex() }
}

export default connect(mapStateToProps)(GradientMask)
