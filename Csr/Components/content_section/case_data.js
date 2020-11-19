import React from "react";
import { VideoTag } from "./video_data";
import { ImageTag } from "./image_data";

export class CaseData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      length: this.props.urls.length,
      x: 0,
      currentFileIndex: 1,
      listWidth: 0,
    };

    this.liRef = React.createRef();
  }

  listItem = null;
  componentDidMount() {
    this.listItem = this.liRef.current.getBoundingClientRect();
  }

  changeX = (value) => {
    if (this.state.length == 1) {
      this.setState({
        x: 0,
        length: this.props.urls.length,
        currentFileIndex: 1,
      });
    } else {
      this.setState({
        x: this.state.x + value,
        length: this.state.length - 1,
        currentFileIndex: this.state.currentFileIndex + 1,
      });
    }
  };

  handleClick = (e) => {
   // if clicked on share button 
   if(e.target.name === 'start_sharing_button') return ;

    this.changeX(this.listItem.width);
    this.setState({
      listWidth: this.listItem.width,
    });
    console.log(" <<< List Item clicked", window.navigator, e.currentTarget, e.target.name);
  };

  componentDidUpdate() {
    if (this.props.currentParrentIndex !== this.state.currentFileIndex) {
      this.props.changeIndex(this.state.currentFileIndex);
    }
  }

  render() {
    let item = this.props;
    let [links] = [item.urls];

    if (links && links.length > 0) {
      return (
        <ul onClick={this.handleClickTransform} className="data_list">
          {links.map((link, index) => {
            let translateIndex = index + 1;
            return (
              <li
                key={index}
                // onTouchStart={this.handleClick}
                onClick={this.handleClick}
                ref={this.liRef}
                className="data_list_item"
                style={{
                  transform: `translateX(-${this.state.x}px)`,
                }}
              >
                {link.type === "image" ? (
                  <ImageTag 
                  index={index} 
                  link={link.link} 
                  id={item.id} 
                  
                  />
                ) : link.type === "video" ? (
                  <VideoTag 
                  index={index} 
                  link={link.link} 
                  id={item.id} 
                  
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      );
    }

    return <div>gra</div>;
  }
}
