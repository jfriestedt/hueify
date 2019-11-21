import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, assignIn, chain, isEmpty, nth, sum } from 'lodash'
import * as Vibrant from 'node-vibrant'

class ColorExtractor extends Component {
  constructor () {
    super();
    this.paletteStyleBase = {
      boxSizing: 'border-box',
      display: 'flex',
      height: '50px',
      lineHeight: '0',
      margin: '20px 0',
      width: '300px'
    }
    this.swatchStyleBase = {
      flexGrow: '1',
      fontSize: '6px',
      height: '100%'
    }
  }

  getPaletteID (palette) {
    return chain(palette)
      .map((swatch) => swatch.getHex())
      .sort()
      .join('_')
      .value();
  }

  shouldComponentUpdate (nextProps) {
    return (
      nextProps.albumArtUrl !== this.props.albumArtUrl ||
      (
        this.getPaletteID(nextProps.palette) !==
        this.getPaletteID(this.props.palette)
      )
    )
  }

  sortPalette (palette) {
    return chain(palette)
      .keys()
      .map((swatchName) => {
        return assignIn({}, palette[swatchName], { name: swatchName })
      })
      .filter((swatch) => swatch.getRgb)
      .sortBy((swatch) => sum(swatch.getRgb()))
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
      this.props.dispatch({ type: 'NO_PALETTE' });
    } else if (prevProps.albumArtUrl !== this.props.albumArtUrl) {
      this.generateNewPalette();
    }
  }

  renderSwatch (swatch) {
    const colorHex = swatch.getHex(),
          style = assign({}, this.swatchStyleBase, { backgroundColor: colorHex })

    return <div key={swatch.name} style={style}></div>;
  }

  renderPalette (palette, styleBase) {
    const borderSwatchIdx = (palette.length / 2);
    const style = assign({}, styleBase, {
      border: `1px solid ${nth(palette, borderSwatchIdx).getHex()}`
    });
    const swatches = chain(palette)
      .map((swatch) => this.renderSwatch(swatch))
      .value();

    return <div id='palette' style={style}>{swatches}</div>;
  }

  render () {
    if (!isEmpty(this.props.palette)) {
      return this.renderPalette(this.props.palette, this.paletteStyleBase);
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
