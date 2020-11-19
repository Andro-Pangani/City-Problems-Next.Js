import React from "react";
import "./case.scss";
import { CaseData } from "./case_data";
import { ShowOnMapComponent } from "./click/show_on_map";
import DeleteSection from "./click/delete_section";
import ApprooveSection from "./click/approove_section";
import { AlternativeComponent } from "./AlternativeComponent";

export class Case extends React.Component {
  constructor(props) {
    super(props);
    this.caseContainerRef = React.createRef();

    this.state = {
      urls: props.item.Url,
      containerWidth: undefined,
      filesQuantity: props.item.Url.length,
      currentFileIndex: 1,
    };
  }

  showonmap = (e) => {
    // gives coords to content for centering
    this.props.centerMap(this.props.item.coords);
  };

  changeIndex = (index) => {
    if (this.state.currentFileIndex !== index) {
      this.setState({
        currentFileIndex: index,
      });
    }
  };

  componentDidMount() {
    let size = this.caseContainerRef.current.getBoundingClientRect();
    let width = size.width;

    this.setState({
      containerWidth: "width",
    });
  }

  render() {
    let item = this.props.item;
    let [
      approoved,
      urls,
      address,
      upload_date,
      problem_type,
      data_type,
      desc,
    ] = [
      item.approoved,
      item.Url,
      item.address,
      item.upload_date,
      item.type,
      item.format_type,
      item.description,
    ];

    return (
      <div ref={this.caseContainerRef} className="case_container">
        <div className="case_header">
          <span className="case_type">
            {problem_type ? problem_type.toUpperCase() : null}
          </span>
          <span className="case_date">{upload_date}</span>
          <div className="show_on_map">
            <ShowOnMapComponent handleClick={this.showonmap} />
          </div>
          <div className="mainDataQuantity">
            {this.state.currentFileIndex}/{this.state.filesQuantity}
          </div>
          {/* {!approoved ? <ApprooveSection id={this.props.item.id} /> : null}
          <div className="admin_section"></div>
    */}
          <DeleteSection
            coords={item.coords}
            urls={urls}
            id={this.props.item.id}
          />
          <div className="case_location">
            <span className="location">Location: </span>
            <span className="location_data"> {address ? address : "_"}</span>
          </div>
        </div>
        <div className="case_content">
          <CaseData
            changeIndex={this.changeIndex}
            currentParentIndex={this.state.currentFileIndex}
            urls={urls}
            data_type={data_type}
            id={this.props.item.id}
          />
        </div>
        <div className="case_footer">
          <div className="case_description">{desc}</div>
        </div>
        <AlternativeComponent item={item} />
      </div>
    );
  }
}
