import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign, assignIn, chain, isEmpty, keys, nth, sum } from 'lodash'
import * as Vibrant from 'node-vibrant'

class ColorExtractor extends Component {
  constructor () {
    super();
    this.swatchStyle = {
      display: 'inline-block',
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
    if (!isEmpty(this.props.palette)) {
      const swatches = chain(this.props.palette)
        .map((swatch) => this.renderSwatch(swatch))
        .value();
      const borderSwatchIdx = (this.props.palette.length / 2);
      const style = {
        // TODO: what if every swatch is the same color?
        border: `1px solid ${nth(this.props.palette, borderSwatchIdx).getHex()}`,
        boxSizing: 'border-box',
        display: 'flex',
        height: '50px',
        lineHeight: '0',
        margin: '20px 0',
        width: '300px'
      };

      return <div id='palette' style={style}>{swatches}</div>;
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
