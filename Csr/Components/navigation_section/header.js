import React from "react";
import "./header.scss";

import {
  getUploadingSectionRequest,
  startUploadingProcess,
} from "../../Redux/Upload/( a - r )upload";
import { connect } from "react-redux";
import { setMaterialDataRequest } from "../../Redux/Materials/( a - r )materials";
import { NavItem } from "./nav_item";
import { getMobileMenuClicked } from "../../Redux/mobile/( a - r )mobileMenu";
import { languages } from "../../language/languages";
import { LanguagesComponent } from "./languagesComponent.tsx";
import { navItemStyle } from "./headerJsxStyles";


const navMobileOn = {
  position: "absolute",
  display: "block",
  left: 0,
  right: 0,
  zIndex: 300,
};
const navMobileOff = {
  display: "none",
};

class Header_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerNav: languages.headerNavigation[props.language],
      nowActive: languages.headerNavigation.English.all,
      language: props.language
    };
  }
  startUploading = () => {
    console.log(" Start Uploading");
    this.props.getUploadingSectionRequest(true);
    this.props.getMobileMenuClicked(false);
    if (this.props.mobileTabIndex !== 0) {
      this.props.setIndex(0);
    }
  };

  updateActive = (category) => {
    this.setState({
      nowActive: category,
    });
  };

  componentDidMount(){
   this.setState({
    nowActive: this.state.headerNav.all,
   })

  }

  componentDidUpdate(){
   if(this.props.language !== this.state.language){
    
    this.setState({
     language: this.props.language,
     headerNav: languages.headerNavigation[this.props.language]
    })
   }
  }

  render() {
    let data = this.props.data;
    let content = {};
    let headerNav = this.state.headerNav ? this.state.headerNav : languages.English
    if (data)
      data.map((item, index) => {
        content[item.type]
          ? (content[item.type] = [...content[item.type], item])
          : (content[item.type] = [item]);
      });

    return (
      <section
        style={this.props.menuButtonClicked ? navMobileOn : null}
        className="header_section"
      >
        <nav className="navigation">
          <ul className="nav_menu">
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={data}
                type={headerNav.all}
                nowActive={this.state.nowActive}
              />
            </li>
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={content.school}
                type={headerNav.schools}
                nowActive={this.state.nowActive}
              />
            </li>
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={content.recreational}
                type={headerNav.recreational}
                nowActive={this.state.nowActive}
              />
            </li>
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={content.transport}
                type={headerNav.transport}
                nowActive={this.state.nowActive}
              />
            </li>
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={content.kids}
                type={headerNav.kids}
                nowActive={this.state.nowActive}
              />
            </li>
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={content.pollution}
                type={headerNav.pollution}
                nowActive={this.state.nowActive}
              />
            </li>
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={content.construction}
                type={headerNav.construction}
                nowActive={this.state.nowActive}
              />
            </li>
            <li className="nav_menu_item">
              <NavItem
                lang={this.props.language}
                updateActive={this.updateActive}
                data={content.food}
                type={headerNav.food}
                nowActive={this.state.nowActive}
              />
            </li>
            <li
              type={"ატვირთვა"}
              onClick={this.startUploading}
              className="nav_menu_item nav_item_upload"
            >
              <span>{languages.headerNavigation[this.props.language].upload}</span>
            </li>
            <li 
            type={"language"}
            className="nav_menu_item"
            >
              <LanguagesComponent />
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

const stateToProps = (state) => {
  return {
    data: state.main_data.content,
    isLoading: state.main_data.isLoading,
    isError: state.main_data.isError,
    menuButtonClicked: state.mobile.menuButtonClicked,
    mobileTabIndex: state.mobile.menuTabIndex,
    language: state.language
  };
};
const dispatchToProps = {
  setMaterialDataRequest,
  getUploadingSectionRequest,
  getMobileMenuClicked,
};

export const Header = connect(stateToProps, dispatchToProps)(Header_);
