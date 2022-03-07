// React Basic and Bootstrap
import React, { Component } from "react";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyfeatures: [
      ],
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}

export default Description;
