import PropTypes from "prop-types";
import React, { Component } from "react";

class ColumnChess extends Component {

    render(){
	return (
        <div 
            className={this.props.className} 
            id={this.props.position ? "cell-"+this.props.position: ""} 
            piece={this.props.piece} 
            onClick={() => this.props.tryToMove(this.props.position)}>
            {this.props.letter ? this.props.letter : ""}
            {this.props.piece ? this.props.piece : ""}
        </div>
        );
    }

}

ColumnChess.propTypes = {
    className: PropTypes.string.isRequired,
};

export default ColumnChess;
