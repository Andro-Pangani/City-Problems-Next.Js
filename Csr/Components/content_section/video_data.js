import React from "react";

export class VideoTag extends React.Component {
  constructor(props) {
    super(props);

    this.videoTag = React.createRef();
  }

  componentDidMount() {}

  clickhandler = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <video
        ref={this.videoTag}
        onClick={this.clickhandler}
        className="main_video_tag"
        src={this.props.link}
        controls="controls"
      />
    );
  }
}
