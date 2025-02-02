import React, { useEffect, useState, useRef } from "react";
import { SubstanceValueChart } from "./substance_value_chart";
import { connect, useDispatch } from "react-redux";
import { aqiCityDataSelected } from "./aqiCityDataSelector";
import { getSetAqiChartData } from "../../Redux/aqi/( a - r )getAqiChart";
import { aqiStationAddressStyle } from "./jsxStyles";
import { LocationPin } from "./locatioPin";
import { languages } from "../../language/languages";
import { setMobileTabIndex } from "../content_section/reduxThunk/mobile/( a - r ) mobileMenu";
import Link from "next/link";

const fingerSvg = () => {
  return (
    <svg
      className="checkOnChart"
      viewBox="-73 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m54.425781 135.785156c8.164063-1.410156 13.636719-9.167968 12.230469-17.332031-7.988281-46.289063 27.71875-88.453125 74.394531-88.453125 46.535157 0 82.304688 41.964844 74.425781 88.269531-1.386718 8.167969 4.105469 15.914063 12.273438 17.304688 8.167969 1.394531 15.914062-4.105469 17.304688-12.273438 10.960937-64.449219-38.78125-123.300781-104.003907-123.300781-65.148437 0-115.128906 58.84375-103.957031 123.554688 1.410156 8.1875 9.199219 13.636718 17.332031 12.230468zm0 0" />
      <path d="m300.664062 240.644531c-11.242187-22.066406-38.019531-30.875-60-20-10.21875-20.058593-33.589843-29.535156-54.832031-22.160156v-91.863281c0-24.484375-19.675781-44.941406-43.867187-45.605469-25.347656-.71875-46.351563 19.582031-46.351563 44.984375v231.082031l-17.621093-18.453125c-16.914063-17.707031-45.234376-18.953125-63.136719-2.769531-18.890625 17.074219-19.832031 46.148437-2.4375 64.421875l101.273437 108.019531c14.121094 15.058594 34.066406 23.699219 54.714844 23.699219h122.144531c41.355469 0 75-33.644531 75-75v-156c0-33.230469-35.050781-55.117188-64.886719-40.355469zm34.886719 196.355469c0 24.8125-20.1875 45-45 45h-122.144531c-12.390625 0-24.355469-5.183594-32.828125-14.222656-.363281-.382813-101.050781-107.777344-101.414063-108.160156-5.800781-6.078126-5.523437-15.777344.804688-21.503907 5.964844-5.386719 15.53125-4.832031 21.324219 1.234375l43.46875 45.519532c9.320312 9.765624 25.847656 3.140624 25.847656-10.355469v-268.511719c0-8.429688 6.992187-15.234375 15.539063-14.996094 8.097656.222656 14.683593 7.226563 14.683593 15.617188 0 165.054687-.28125 90.238281-.28125 179.378906 0 8.308594 6.765625 15.078125 15.140625 14.992188 8.363282.085937 15.140625-6.679688 15.140625-14.992188v-47.851562c1.335938-6.914063 7.421875-12.148438 14.71875-12.148438 8.269531 0 15 6.730469 15 15v45c0 8.285156 6.714844 15 15 15 8.285157 0 15-6.714844 15-15v-25c0-8.269531 6.730469-15 15-15s15 6.730469 15 15v25c0 8.285156 6.714844 15 15 15 8.285157 0 15-6.714844 15-15v-5c0-8.269531 6.730469-15 15-15s15 6.730469 15 15zm0 0" />
    </svg>
  );
};

// SUBSTANCE BLOCK
function SubstanceBlock(props) {
  const handleClick = () => {
    let data24 = props.data1hour;

    props.getSetAqiChartData({
      address: props.address,
      substance: props.substanceName,
      aqi_level_current: props.aqi_level_current,
      data: data24,
      color: props.color,
      aqiLevel: props.aqiLevelSet,
    });
  };

  return (
    <ul
      className="substance_block"
      onClick={handleClick}
      key={props.index}
      style={
        props.aqi_level_current.aqi_level === "very_poor"
          ? {
              background: "linear-gradient(to right,#171717, #a33232)",
            }
          : null
      }
    >
      <li className="substance_name">
        <span className="aqi_name_text">{props.substanceName}</span>
      </li>
      <li ref={props.valueFieldRef} className="substance_value">
        {props.data1hour.length !== 0 && props.data1hour ? (
          <SubstanceValueChart
            parrentSize={props.size}
            data={props.data1hour[props.data1hour.length - 1].value.toFixed(4)}
            color={props.color}
            aqi_level_current={props.aqi_level_current}
            very_poor_from={props.aqiLevelSet.very_poor_from}
          />
        ) : (
          <div className="_no_data_sign"></div>
        )}
      </li>
      <li className="substance_level_share">
        {props.data1hour.length !== 0 && props.data1hour
          ? props.aqi_level_current.aqi_level
          : "no data"}
      </li>
    </ul>
  );
}

const SubstanceBlockConnected = connect(null, {
  getSetAqiChartData,
})(SubstanceBlock);

// ------------------------------- AQI STATION -----
function AqiStation(props) {
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();
  const valueFieldRef = useRef(null);

  let newSize = null;

  useEffect(() => {
    if (valueFieldRef.current) {
      newSize = valueFieldRef.current.getBoundingClientRect().width;
    }
    if (size !== newSize) {
      setSize(newSize);
    }
  });

  const centerMap = (val) => {
    if (val && typeof val.lng === "number") {
      if (props.mapReference) {
        props.mapReference.setCenter(val);
      }
    }
  };

  const handleClick = () => {
    console.log("// Handle click");
  };

  // logs - -  -
  // props.data.marker
  // console.log(props.data, " <<<<<<<<<<< props data from city AqiStation");

  const showMarker = () => {
    console.log(props.data.marker);
  };

  return (
    <div className="aqi_station">
      <div
        className="aqi_station_header"
        onClick={() => {
          centerMap({ lat: props.data.lat, lng: props.data.long });
          // in Mobile Mode Translate body
          dispatch(setMobileTabIndex(2));

          setTimeout(() => {
            window.google.maps.event.trigger(props.data.marker, "click");
          }, 1500);
        }}
      >
        <div
          onClick={showMarker}
          className="aqi_station_address"
          style={aqiStationAddressStyle(props.language, props.data.alarm)}
        >
          {props.language == "Georgian"
            ? props.data.address
            : props.data.address_en}
        </div>
        <div className="aqi_station_location">
          <LocationPin />
        </div>
      </div>
      <div className="station_data_container">
        {" "}
        {props.empty ? (
          <div className="no_data_section">
            <div className="no_data_text">
              {
                languages.aqiSection.recomendations[props.language].station_off
                  .level
              }
            </div>
          </div>
        ) : (
          <div className="substance_block_container">
            {props.data.stationequipment_set.map((item, index) => {
              return (
                <SubstanceBlockConnected
                  address={props.address}
                  key={index}
                  index={index}
                  address={props.data.address}
                  color={item.substance.aqi_data.color}
                  substanceName={item.substance.name}
                  data1hour={item.data1hour_set}
                  aqiLevelSet={item.substance.airqualityindexlevel_set[0]}
                  aqi_level_current={item.substance.aqi_data}
                  size={size}
                  valueFieldRef={valueFieldRef}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="aqi_station_more">
        <Link href={`/aqiShare`}>
          <a className="aqi_station_more-text">More</a>
        </Link>
      </div>
    </div>
  );
}

const AqiStationConnected = connect(
  (state) => ({
    mapReference: state.map.mapRef,
    language: state.language,
  }),
  null
)(AqiStation);

//  ------------------  CITY BLOCK ---------------
function CityAqiData(props) {
  const [cityData] = useState(props.aqiData.cityData);
  const [isLoading, setIsLoading] = useState(props.isLoading);
  const [isLoaded, setIsLoaded] = useState(
    props.aqiData.cityData.dataState.isLoaded
  );
  const [isError, setIsError] = useState(
    props.aqiData.cityData.dataState.isError
  );

  useEffect(() => {
    setIsLoading(props.aqiData.cityData.dataState.isLoading);
    setIsLoaded(props.aqiData.cityData.dataState.isLoaded);
    setIsError(props.aqiData.cityData.dataState.isError);

    let chartData = props.aqiData;
  }, [props]);

  if (isLoading) {
    return (
      <div className="aqiDataLoading">
        Loading
        <div className="firstPreloader">
          <div className="secondPreloader"></div>
        </div>
      </div>
    );
  } else if (isLoaded) {
    let sortedStations = [];
    let stationWithData = [];
    let stationEmpty = [];

    props.aqiData.cityData
      ? props.aqiData.cityData.length > 0
        ? props.aqiData.cityData.map((item, index) => {
            if (item.empty) {
              stationEmpty.push(item);
            } else {
              stationWithData.push(item);
            }
          })
        : null
      : null;
    sortedStations = [...stationWithData, ...stationEmpty];
    return sortedStations.length != 0 ? (
      sortedStations.map((item, index) => {
        return (
          <AqiStationConnected
            key={index}
            address={item.address}
            empty={item.empty}
            data={item}
          />
        );
      })
    ) : (
      <div className="no_aqi_data_container">
        <div className="no_aqi_data-text">
          არ არის ჰაერის ხარისხის მონაცემები
        </div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="no_aqi_data_container">
        <div className="no_aqi_data-text">
          არ არის ჰაერის ხარისხის მონაცემები
        </div>
      </div>
    );
  } else return <div>no data</div>;
}

export default connect(
  (state) => ({
    // aqiCityData => {cityData: data, chartData}
    aqiData: aqiCityDataSelected(state),
    isLoading: state.aqi.cityData.dataState.isLoading,
  }),
  { getSetAqiChartData }
)(CityAqiData);
