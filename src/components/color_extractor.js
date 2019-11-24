import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, assignIn, chain, isEmpty, nth, sum } from 'lodash'
import * as Vibrant from 'node-vibrant'

class ColorExtractor extends Component {
  constructor () {
    super();
    this.paletteContainerStyleBase = {
      height: '50px',
      margin: '20px 0',
      width: '300px',
    }
    this.paletteStyleBase = {
      boxSizing: 'border-box',
      display: 'flex',
      height: '100%',
      lineHeight: '0'
    }
    this.swatchStyleBase = {
      flexGrow: '1',
      fontSize: '6px',
      height: '100%',
      transition: 'background-color 0.5s ease'
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
    const borderColor = palette.length === 1 ?
      '#FFFFFF' :
      nth(palette, (palette.length / 2)).getHex()
    const style = assign({}, styleBase, { border: `1px solid ${borderColor}` });
    const swatches = chain(palette)
      .map((swatch) => this.renderSwatch(swatch))
      .value();

    return <div id='palette' style={style}>{swatches}</div>;
  }

  render () {
    return <div style={assign({}, this.paletteContainerStyleBase, {
      opacity: isEmpty(this.props.palette) ? 0 : 1,
      transition: 'opacity 200ms ease',
      transitionDelay: '400ms'
    })}>
      {!isEmpty(this.props.palette) && this.renderPalette(
        this.props.palette,
        this.paletteStyleBase
      )}
    </div>
  }
}

const mapStateToProps = ({ spotifyPlayerState, palette }) => {
  const image = chain(spotifyPlayerState)
    .get(['track_window', 'current_track', 'album', 'images'])
    .find({ width: 64 })
    .value();

  return {
    albumArtUrl: image ? image.url : '',
    palette
  }
}

export default connect(mapStateToProps)(ColorExtractor);
