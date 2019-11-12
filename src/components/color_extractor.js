import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, chain, isEmpty, keys } from 'lodash'
import * as Vibrant from 'node-vibrant'

class ColorExtractor extends Component {
  constructor () {
    super();
    this.state = { palette: [] };
    this.swatchStyle = {
      display: 'inline-block',
      width: '50px',
      height: '50px',
      fontSize: '6px',
    }
  }

  shouldComponentUpdate ({ albumArtUrl }, { palette }) {
    return (
      this.props.albumArtUrl !== albumArtUrl ||
      (isEmpty(this.state.palette) && !isEmpty(palette))
    )
  }

  componentDidUpdate () {
    if (this.props.albumArtUrl) {
      Vibrant.from(this.props.albumArtUrl)
        .getPalette((err, palette) => {
          this.setState({ palette })
        });
    }
  }

  renderSwatch (swatchKey) {
    const colorHex = this.state.palette[swatchKey].getHex(),
          style = assign({}, this.swatchStyle, { backgroundColor: colorHex })

    return <div key={swatchKey} style={style}>{swatchKey}</div>;
  }

  render () {
    if (this.state.palette) {
      const swatches = keys(this.state.palette).map((swatchKey) => {
        return this.renderSwatch(swatchKey);
      })

      return <div id='palette' style={{ marginBottom: '20px' }}>{swatches}</div>
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ spotifyPlayerState }) => {
  const image = chain(spotifyPlayerState)
    .get(['track_window', 'current_track', 'album', 'images'])
    .find({ height: 300 })
    .value();

  return {
    albumArtUrl: image ? image.url : ''
  }
}

export default connect(mapStateToProps)(ColorExtractor);
