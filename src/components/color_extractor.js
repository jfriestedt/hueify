import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, chain, keys } from 'lodash'
import * as Vibrant from 'node-vibrant'

class ColorExtractor extends Component {
  constructor () {
    super();
    this.swatchStyle = {
      display: 'inline-block',
      width: '50px',
      height: '50px',
      fontSize: '6px',
    }
  }

  getPaletteId (palette) {
    return keys(palette).map((swatchKey) => {
      return palette[swatchKey].getHex()
    })
    .sort()
    .join('_')
  }

  shouldComponentUpdate ({
    albumArtUrl: nextAlbumArtUrl,
    palette: nextPalette
  }) {
    return (
      nextAlbumArtUrl !== this.props.albumArtUrl ||
      (this.getPaletteId(nextPalette) !== this.getPaletteId(this.props.palette))
    )
  }

  generateNewPalette () {
    const vib = new Vibrant(this.props.albumArtUrl, {
      filters: []
    });

    vib.getPalette((err, palette) => {
      this.props.dispatch({ type: 'NEW_PALETTE', payload: palette })
    });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.albumArtUrl && !this.props.albumArtUrl) {
      this.props.dispatch({ type: 'NO_PALETTE' })
    } else if (prevProps.albumArtUrl !== this.props.albumArtUrl) {
      this.generateNewPalette();
    }
  }

  renderSwatch (swatchKey) {
    const colorHex = this.props.palette[swatchKey].getHex(),
          style = assign({}, this.swatchStyle, { backgroundColor: colorHex })

    return <div key={swatchKey} style={style}>{swatchKey}</div>;
  }

  render () {
    if (this.props.palette) {
      const swatches = keys(this.props.palette).map((swatchKey) => {
        return this.renderSwatch(swatchKey);
      })

      return <div id='palette' style={{ marginBottom: '20px' }}>{swatches}</div>
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ spotifyPlayerState, palette }) => {
  const image = chain(spotifyPlayerState)
    .get(['track_window', 'current_track', 'album', 'images'])
    .find({ height: 64 })
    .value();

  return {
    albumArtUrl: image ? image.url : '',
    palette
  }
}

export default connect(mapStateToProps)(ColorExtractor);
