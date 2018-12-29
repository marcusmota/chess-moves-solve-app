import PropTypes from "prop-types";
import React, { Component } from "react";

class Image extends Component {

    render(){
	return (
        <img alt={this.props.src} src={this.props.src} height={this.props.height} className={this.props.className} />
        );
    }

}

Image.propTypes = {
    className: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
};

export default Image;
