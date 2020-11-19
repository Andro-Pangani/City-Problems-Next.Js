import React from "react";

export class VideoTag extends React.Component {
  constructor(props) {
    super(props);

    this.videoTag = React.createRef();
  }

  componentDidMount() {}

  clickhandler = (e) => {
    e.preventDefault();

    console.log(
      "e Video",
      e.target,
      e.currentTarget,
      this.videoTag,
      " < videoTag"
    );
  };

  render() {
    return (
      <video
        ref={this.videoTag}
        onClick={this.clickhandler}
        // onTouchStart={this.clickhandler}

        className="main_video_tag"
        src={this.props.link}
        controls="controls"
      />
    );
  }
}
