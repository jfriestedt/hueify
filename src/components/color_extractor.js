import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, assignIn, chain, isEmpty, nth, sum } from 'lodash'
import * as Vibrant from 'node-vibrant'

// TODO: color extraction should be handled by middleware. This component
// should just be palette rendering.

class ColorExtractor extends Component {
  constructor ({ palette }) {
    super();
    this.paletteContainerStyleBase = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50px',
      margin: '20px 0',
      transition: 'opacity 200ms ease 400ms',
      width: '300px'
    }
    this.paletteStyleBase = {
      boxSizing: 'border-box',
      display: 'flex',
      height: 'calc(100% - 2px)',
      width: 'calc(100% - 2px)',
      lineHeight: '0'
    }
    this.swatchStyleBase = {
      flexGrow: '1',
      fontSize: '6px',
      height: '100%',
      transition: 'background-color 200ms ease'
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
    const swatches = chain(palette)
      .map((swatch) => this.renderSwatch(swatch))
      .value();

    return <div id='palette' style={styleBase}>{swatches}</div>;
  }

  render () {
    let background, borderLightHex, borderDarkHex;
    if (!isEmpty(this.props.palette)) {
      // TODO: what about for palettes with less than 6 swatches?
      borderLightHex = nth(this.props.palette, 3).getHex();
      borderDarkHex = nth(this.props.palette, 2).getHex();
      background =
        `linear-gradient(to right, ${borderLightHex}, ${borderDarkHex})`
    }
    const style = assign({}, this.paletteContainerStyleBase, {
      background,
      opacity: isEmpty(this.props.palette) ? 0 : 1,
    })

    return <div style={style}>
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
    // TODO: Abstract this to a helper fn
    .sortBy((image) => Math.abs(image.width - 64))
    .first()
    .value();

  return {
    albumArtUrl: image ? image.url : '',
    palette
  }
}

export default connect(mapStateToProps)(ColorExtractor);
