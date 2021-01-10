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

  handleClick = (e) => {
    // console.log("img clicked");
  };

  loadHandler = () => {
    // console.log(" ~ ~ ~ ~ ~ ~ YEa Image is Loaded ~ ~ ~ ~ ~ ~ ");
    this.setState({
      loaded: true,
    });
  };

  startSharing = () => {
    this.setState({
      startSharing: true,
    });
    // console.log(this.state.startSharing, " clicked");
  };

  render() {
    let ogUrl = `https://hiddenwood.herokuapp.com/share`;

    // ${this.props.id}&imageUrl=${this.props.link}`

    return (
      <>
        <img
          onLoad={this.loadHandler}
          ref={this.imgTag}
          onClick={this.handleClick}
          className="main_image_tag"
          src={this.props.link}
        />
        {/* <button
     name="start_sharing_button"
     className="start_sharing_button"
     onClick={this.startSharing}
     >
      Share
     </button> */}
        {
          <div
            className="fb-share-button"
            data-href={ogUrl}
            data-layout="button"
            style={{ display: this.state.startSharing ? "block" : "none" }}
          ></div>
        }
      </>
    );
  }
}
