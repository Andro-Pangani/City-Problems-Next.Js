import React, { useState, useEffect, Fragment } from "react";

import { connect } from "react-redux";
import { setAqiCityDataRequest } from "../../Redux/aqi/( a - r )getAqi";

import CityAqiData from "./cityAqiData";
import { languages } from "../../language/languages";
import { aqiSectionTitleStyle } from "./jsxStyles";

let activeStyle = {
  border: ".1rem solid transparent",
  color: "rgb(162 121 86)",
  background: "rgb(62 62 62)",
};

function AqiMenuItem(props) {
  const [active, setActive] = useState(false);

  function handleClick(e) {
    props.setAqiCityDataRequest(props.city);

    props.handleActive(props.city);
    // HANDLE ACTIVE
  }

  useEffect(() => {
    if (props.city === props.activeCity) {
      setActive(true);
    } else if (active) {
      setActive(false);
    }
  });

  return (
    <li onClick={handleClick} className="aqi_nav_item">
      <span className="aqi_city_sign"></span>
      <span className="aqi_nav_item-text" style={active ? activeStyle : null}>
        {props.city}
      </span>
    </li>
  );
}

const AqiMenuItemConnected = connect(null, { setAqiCityDataRequest })(
  AqiMenuItem
);

function AqiSection(props) {
  let [stateId, setStateId] = useState(1);
  const [active, setActive] = useState("Tbilisi");
  const aqiContentRef = React.createRef();

  function getCity(e) {
    console.log(e);
  }

  function scrollHandler(e) {
    let result =
      aqiContentRef.current.scrollHeight - aqiContentRef.current.scrollTop ===
      aqiContentRef.current.clientHeight;
    if (result) console.log(result, " ** result **");

    // aqiContentRef.current.scrollTo(0, aqiContentRef.current.scrollHeight);
  }

  function handleActive(title) {
    // console.log("<<<< Handle Active >>>>>>>>  ", title);
    setActive(title);
    return active;
  }

  useEffect(() => {});

  return (
    <div className="aqi_section">
      <div
        className="aqi_section_title"
        style={aqiSectionTitleStyle(props.language)}
      >
        {languages.aqiSection.headerTitle[props.language]}
      </div>

      <ul className="aqi_nav_menu">
        <AqiMenuItemConnected
          handleActive={handleActive}
          activeCity={active}
          stateId={stateId}
          city={`Tbilisi`}
          id={1}
        />
        <AqiMenuItemConnected
          handleActive={handleActive}
          activeCity={active}
          stateId={stateId}
          city={`Rustavi`}
          id={2}
        />
        <AqiMenuItemConnected
          handleActive={handleActive}
          activeCity={active}
          stateId={stateId}
          city={"Kutaisi"}
          id={3}
        />
        <AqiMenuItemConnected
          handleActive={handleActive}
          activeCity={active}
          stateId={stateId}
          city={"Batumi"}
          id={4}
        />
      </ul>

      <div ref={aqiContentRef} onScroll={scrollHandler} className="aqi_content">
        <CityAqiData />
      </div>
    </div>
  );
}

const stateToProps = (state) => {
  return {
    aqiData: state.aqi.data,
    language: state.language,
  };
};

export default connect(stateToProps, null)(AqiSection);
