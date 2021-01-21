import React from "react";
import { CaseData } from "./case_data";
import { ShowOnMapComponent } from "./click/show_on_map";
import DeleteSection from "./click/delete_section";
import ApprooveSection from "./click/approove_section";
import { AlternativeComponent } from "./AlternativeComponent";
import { AlternativeButton } from "./alternative_button";
import Link from "next/link";

export class Case extends React.Component {
  constructor(props) {
    super(props);
    this.caseContainerRef = React.createRef();

    this.state = {
      urls: props.item.Url,
      containerWidth: undefined,
      filesQuantity: props.item.Url.length,
      currentFileIndex: 1,
      reset: false,
      altButtonClicked: false,
    };
  }

  showonmap = (e) => {
    // gives coords to content for centering
    this.props.centerMap(this.props.item.coords);
  };

  // DERIVING THIS FUNCTION
  // TO CASE_DATA COMPONENT

  changeMyIndex = (index) => {
    // console.log("- FUNCTION PARRENT - |||||||||||| ", index);

    if (this.state.currentFileIndex !== index) {
      this.setState({
        currentFileIndex: index,
      });
    }
  };

  componentDidMount() {
    console.log("22222222 Case Parrent updated", this.state.altButtonClicked);

    let size = this.caseContainerRef.current.getBoundingClientRect();
    let width = size.width;

    this.setState({
      containerWidth: "width",
    });
  }

  componentDidUpdate(prevProps) {
    let _prevItemId = prevProps.item.id;
    let _currentItemId = this.props.item.id;

    //IF DATA IS NEW
    // RESETTING INDEX TO 1
    if (_prevItemId !== _currentItemId) {
      this.setState({
        currentFileIndex: 1,
        reset: true,
      });
    }
  }

  alternativeClickHandler = (state) => {
    this.setState({
      altButtonClicked: state,
    });
    console.log(state, "Handler alt button state container");
  };

  funcDelivery = (func) => {
    return func;
  };

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
            {this.state.currentFileIndex}/{urls.length}
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
            changeParrentIndex={this.changeMyIndex}
            // reset helps child update
            // sets childs current index
            // to 1
            reset={this.state.reset}
            currentParentIndex={this.state.currentFileIndex}
            urls={urls}
            data_type={data_type}
            id={this.props.item.id}
          />
          <div className="case_see-more">
            <Link
              href={
                "/about?docId=" +
                this.props.item.id +
                "&lastSnapshot=" +
                this.props.lastSnapshot +
                "&length=" +
                this.props.length
              }
            >
              <a>More</a>
            </Link>
            {/* <Link href={"/about"}>
              <a>More</a>
            </Link> */}
          </div>
        </div>
        <div className="case_footer">
          <div className="case_description">{desc}</div>
        </div>
        <AlternativeButton
          clickedStatus={this.alternativeClickHandler}
          clickedState={this.state.altButtonClicked}
        />
        <AlternativeComponent
          item={item}
          clickedStatus={this.alternativeClickHandler}
          clickedState={this.state.altButtonClicked}
        />
      </div>
    );
  }
}
