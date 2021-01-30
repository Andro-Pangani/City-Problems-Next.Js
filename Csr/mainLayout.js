import Link from "next/link";
import Head from "next/head";
import React from "react";
import { connect } from "react-redux";
// - <- Next, React
// -.-.-.-.-
// + Components ->

import { Header } from "./Components/navigation_section/header";
import { FormSection } from "./Components/upload_section/form_section";
import Content from "./Components/content_section/content";
import AqiSection from "./Components/aqi_section/aqi_section";
import { MapContainer } from "./Components/map_section/map/map_container";
import { MobileMenuComponent } from "./mobile/mobileMenuComponent";

// import AqiChartSection from "./Components/aqi_section/aqi_chart_section";
import { ReloadButtonComponent } from "./specialTools/reloadButton";
// - <- Components
// -.-.-.-.-
// + Redux ->
import { getMainDataRequest } from "./Redux/( a-r )getMainData";

import { lastSnapshotRefresh } from "./Redux/lastSnapshot-tools";

import {
  getAqiRequest,
  setAqiCityDataRequest,
} from "./Redux/aqi/( a - r )getAqi";

import { setMaterialDataRequest } from "./Redux/Materials/( a - r )materials";

import {
  setMobileMode,
  setMobileNavItemClicked,
  setMobileShowOnMapClicked,
  setUploadAddressFromMap,
} from "./Redux/mobile/( a - r )mobileMenu";
// - <- Redux
// -.-.-.-.-

export class MainLayoutTest extends React.Component {
  constructor(props) {
    super(props);

    this.AppContainer = React.createRef();
    this.bodySectionRef = React.createRef();
    this.contentItemRef = React.createRef();

    this.state = {
      step: 0,
      grid: null,
      bodyTranslate: 0,
      containerWidth: null,
    };
  }

  contentItemWidth = undefined;
  fbSdkScript = undefined;

  componentDidMount() {
    let bounding = this.AppContainer.current.getBoundingClientRect();
    let width = bounding.width;
    if (width) {
      this.setState({
        containerWidth: width,
      });
    }

    // TURN ON - OFF MOBILE MODE
    this.setState({
      step: width / 8,
    });

    //  CONTENT ITEM WIDTH -                     --------            -       -----
    this.contentItemWidth = this.contentItemRef.current.getBoundingClientRect().width;
    console.log(
      "####### DID MOUNT MAIN LAYOUT QUERIES",
      this.props.query,
      " last Snapshot ",
      this.props.lastSnapshot
    );

    let query = this.props.query ?? null;

    let { singleCase, docId, empty, length, lastSnapshot } = this.props.query;

    length = parseInt(length);

    if (singleCase === "true") {
      if (empty == "true") {
        console.log("4444444444444444 EMPTY STATE ");

        this.props.getMainDataRequest({
          isLoading: this.props.isLoading,
          lastSnapshot: lastSnapshot,
          fromScroll: null,
          docId: docId,
          length: length,
          empty: true,
        });
      }
      let singleCase = null;
      let material_data = this.props.material_data.data;

      if (material_data) {
        material_data.map((item) => {
          if (item.id === docId) {
            singleCase = item;
          }
        });

        this.props.setMaterialDataRequest({
          data: [singleCase],
          isError: this.props.material_data.isError,
          isLoading: this.props.material_data.isLoading,
        });
      }

      console.log("333333333333333333333 SINGLE CASE", singleCase);
    } else {
      this.props.getMainDataRequest({
        isLoading: this.props.isLoading,
        lastSnapshot: this.props.lastSnapshot,
        fromScroll: null,
        docId: docId,
        length: this.props.length,
      });
    }

    // CITY MATERIALS MAIN REQUEST

    // AQI REQUEST
    this.props.getAqiRequest();
  }

  componentDidUpdate() {
    console.log("********************* COMPONENT DID UPDATE APP.JS");

    if (this.props.mobileMode) {
      this.bodyTranslateValue =
        this.props.mobileTabIndex * this.contentItemWidth;
      this.bodySectionRef.current.scrollLeft = this.bodyTranslateValue;

      this.props.setMobileShowOnMapClicked(false);

      // IF
      //DROP DOWN MENU ITEM IS
      //CLICKED
      if (this.props.mobileNavItemClicked) {
        this.bodyTranslateValue =
          this.props.mobileTabIndex * this.contentItemWidth;
        this.bodySectionRef.current.scrollLeft = this.bodyTranslateValue;
        this.props.setMobileNavItemClicked(false);
      }

      if (this.props.mobileShowOnMapClicked) {
        // console.log('Show on map');
        //  // -           2 <- is index of mobile menu
        //  //                    to show map
        //  this.bodyTranslateValue = 2 * this.contentItemWidth;
        //  this.bodySectionRef.current.scrollLeft = this.bodyTranslateValue;

        this.props.setMobileShowOnMapClicked(false);
      }

      // IN UPLOADING MODE FROM MOBILE
      // AFTER CLICKING MAP ADDRESS ITEM
      // SCROLL BACK TO UPLOADING SECTION
      if (this.props.mobileUploadAddressFromMap) {
        this.bodyTranslateValue = 0;
        this.bodySectionRef.current.scrollLeft = this.bodyTranslateValue;

        this.props.setUploadAddressFromMap(false);
      }
    }
  }

  componentWillUnmount() {
    console.log(
      "|||||||||||||||||||||| MAIN LAYOUT UNMOUNTED ||||||||||||||||||||"
    );
    // this.props.lastSnapshotRefresh(null);
  }

  bodyTranslateValue = 0;

  mobileMenuClick = (val) => {
    console.log(
      "val -> " +
        val +
        " contentItemWidth " +
        this.contentItemWidth +
        " translateValue => " +
        this.bodyTranslateValue
    );
    this.bodyTranslateValue = val * this.contentItemWidth;
    this.bodySectionRef.current.scrollLeft = this.bodyTranslateValue;
  };

  render() {
    return (
      <>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <div ref={this.AppContainer} className="app_container">
          <Header setIndex={this.mobileMenuClick} />
          <MobileMenuComponent setIndex={this.mobileMenuClick} />

          <ul ref={this.bodySectionRef} className="body_section_list clearfix">
            <li
              ref={this.contentItemRef}
              className="body_section_item content_item"
            >
              {this.props.inUploadingSection ? <FormSection /> : <Content />}
            </li>
            <li className="body_section_item aqi_item">
              <AqiSection />
            </li>
            <li className="body_section_item map_item">
              <MapContainer />
            </li>
            {/* <li className="body_section_item reload_item">
              <div className="contentSectionReload">
                <ReloadButtonComponent />
              </div>
            </li> */}
            {/* <li className="body_section_item chart_item">
            <AqiChartSection />
          </li> */}
          </ul>

          {/* <footer className="footer_section"></footer> */}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  getMainDataRequest,
  getAqiRequest,
  setAqiCityDataRequest,
  setMaterialDataRequest,
  setMobileMode,
  setMobileNavItemClicked,
  setMobileShowOnMapClicked,
  setUploadAddressFromMap,
  lastSnapshotRefresh,
};

const stateToProps = (state) => {
  return {
    uploading: state.upload.uploading,
    lastSnapshot: state.main_data.lastSnapshot,
    inUploadingSection: state.upload.inUploadingSection,
    isLoading: state.main_data.isLoading,
    isError: state.main_data.isError,
    data: state.main_data.content,
    material_data: state.material_data,
    mobileMode: state.mobile.mobileMode,
    mobileTabIndex: state.mobile.menuTabIndex,
    mobileNavItemClicked: state.mobile.navItemClicked,
    mobileShowOnMapClicked: state.mobile.showOnMapClicked,
    mobileUploadAddressFromMap: state.mobile.uploadAddressFromMap,
    length: state.main_data.length,
  };
};

export default connect(stateToProps, mapDispatchToProps)(MainLayoutTest);
