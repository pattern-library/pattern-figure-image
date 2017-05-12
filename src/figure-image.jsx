import PropTypes from 'prop-types';
import React from 'react';

/**
  Creates an image which requires a src and alt
**/
export class Image extends React.Component {
  constructor (props) {
    super (props);
  }
  render() {
    return (
      <img src={this.props.src} alt={this.props.alt}  {...this.props} />
    );
  }
}
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

/**
  Creates an figure element with an image and perhaps a caption
**/
export default class FigureImage extends React.Component {
  constructor (props) {
    super (props);
  }
  render() {
    const children = [<Image key="image" {...this.props.img} />];

    // if a caption exists, determines if it should be at the beginning or end of `figure`
    if (this.props.figcaption && this.props.figcaption.content && this.props.figcaption.content.toString() !== '') {
      const content = this.props.figcaption.content.toString();
      const before = this.props.figcaption.before || false;
      delete this.props.figcaption.content;
      delete this.props.figcaption.before;

      const caption = <figcaption key="figcaption" {...this.props.figcaption}>{content}</figcaption>;

      // determine if caption is before or after image
      if (before === true) {
        children.unshift(caption);
      }
      else {
        children.push(caption);
      }
    }

    return <figure {...this.props.figure}>{children}</figure>;
  }
}
FigureImage.propTypes = {
  figcaption: PropTypes.shape({
    content: PropTypes.string,
    before: PropTypes.boolean,
  }),
  img: PropTypes.shape(Image.propTypes),
};

