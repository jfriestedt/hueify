import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, assignIn, chain, keys, sum } from 'lodash'
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

  getPaletteID (palette) {
    return chain(palette)
      .map((swatch) => swatch.getHex())
      .sort()
      .join('_')
      .value();
  }

  shouldComponentUpdate ({
    albumArtUrl: nextAlbumArtUrl,
    palette: nextPalette
  }) {
    return (
      nextAlbumArtUrl !== this.props.albumArtUrl ||
      (this.getPaletteID(nextPalette) !== this.getPaletteID(this.props.palette))
    )
  }

  sortPalette (palette) {
    return chain(palette)
      .keys()
      .sortBy((swatchName) => sum(palette[swatchName].getRgb()))
      .map((swatchName) => {
        return assignIn({}, palette[swatchName], { name: swatchName })
      })
      .value();
  }

  generateNewPalette () {
    const vib = new Vibrant(this.props.albumArtUrl, {
      filters: []
    });

    vib.getPalette((err, palette) => {
      this.props.dispatch({
        type: 'NEW_PALETTE',
        payload: this.sortPalette(palette)
      });
    });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.albumArtUrl && !this.props.albumArtUrl) {
      this.props.dispatch({ type: 'NO_PALETTE' })
    } else if (prevProps.albumArtUrl !== this.props.albumArtUrl) {
      this.generateNewPalette();
    }
  }

  renderSwatch (swatch) {
    const colorHex = swatch.getHex(),
          style = assign({}, this.swatchStyle, { backgroundColor: colorHex })

    return <div key={swatch.name} style={style}></div>;
  }

  render () {
    if (this.props.palette) {
      const swatches = chain(this.props.palette)
        .map((swatch) => this.renderSwatch(swatch))
        .value();

      return <div id='palette' style={{ margin: '20px 0' }}>{swatches}</div>;
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
