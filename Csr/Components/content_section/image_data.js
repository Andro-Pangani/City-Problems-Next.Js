import React from "react";
import { _url } from "../../_urls";

export class ImageTag extends React.Component {
  constructor(props) {
    super(props);
    this.imgTag = React.createRef();

    this.state = {
      loaded: false,
      startSharing: false,
    };
  }

  handleClick = (e) => {};

  loadHandler = () => {
    this.setState({
      loaded: true,
    });
  };

  startSharing = () => {
    this.setState({
      startSharing: true,
    });
  };

  render() {
    return (
      <>
        <img
          onLoad={this.loadHandler}
          ref={this.imgTag}
          onClick={this.handleClick}
          className="main_image_tag"
          src={this.props.link}
        />
      </>
    );
  }
}
