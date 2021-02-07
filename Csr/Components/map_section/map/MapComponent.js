import React, { createRef } from 'react';
import { connect } from 'react-redux';

import { createGoogleMap, icon } from './mapElements';
import { geocodeLatLng } from './map_libraries';
import MapAddressList from './map_addresses';

import {
  mapTempAddressList,
  mapTempAddressListClear,
} from '../../../Redux/Map/indexMap';

import {
  getMapReferenceRequest,
  removeCaseMarkersFromStore,
  setAqiMarkersToStore,
  setMarkersToStoreRequest,
} from '../../../Redux/Map/A_R_getMapReference';

import { startUploadingProcess } from '../../../Redux/Upload/( a - r )upload';

import { addLocation } from '../../../Redux/Map/addLocationRequest/indexAddLocation';
import { getDataByMarker } from '../../../Redux/Materials/( a - r )materials';
import { setMobileNavItemClicked } from '../../../Redux/mobile/( a - r )mobileMenu';
import { setMobileTabIndex } from '../../content_section/reduxThunk/mobile/( a - r ) mobileMenu';
import { aqiInfoWindow, aqiMapMarker } from './map_style';
import { myOvelayMarker } from './mapOverlayFunc';
import { addresses, stationCoords } from './mapSelectedData';
import { AddAqiMarkers } from '../lib/addAqiMarkers';
import { AddMarkers } from '../lib/addCaseMarkers';
import { setContentScrollController } from '../../../Redux/domElements/( a - r ) ContentScrollController';
const map_key = 'AIzaSyCYqtWX_pBEdxPVlz_0GAypoQtAmbdhR0w';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.googleMapRef = React.createRef();
    this.InputSearchRef = React.createRef();
    this.AddMarkers = AddMarkers.bind(this);
    this.AddAqiMarkers = AddAqiMarkers.bind(this);
    this.handleClickFunction = this.handleClickFunction.bind(this);
    this.state = {
      clickedOnMap: false,
      addresses: [],
      stationCoords: [],
      language: props.language,
      my_geolocation_info: false,
    };
  }

  mapTag = '';
  addresses = [];
  mapScript = '';
  mapOthers = '';

  // -->  -->  -->  Add Markers  <--   <--   <--
  markers = [];
  updated = 0;

  scriptOnload = async () => {
    this.mapTag = await createGoogleMap(this.googleMapRef, this.InputSearchRef);
    // gives MAP-> REFERENCE TO CASE FOR CENTERING
    this.props.getMapReferenceRequest(this.mapTag);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords.lat) {
          this.mapTag.setCenter(position.coords);
        }
      });
      // this.AddMarkers(this.props.addresses);
    }

    // this.AddMarkers(this.props.addresses);
    // this.props.getMapReferenceRequest(this.mapTag);
    this.handleClick();
  };

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    this.mapScript = googleMapScript;
    googleMapScript.setAttribute('async', '');
    googleMapScript.defer = true;
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${map_key}&libraries=places`;

    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', this.scriptOnload);
    console.log(
      ' ################# Map Component Did Mount PROPS ADDRESS',
      this.props.addresses,
      ' STATE ADDRESSES ',
      this.state.addresses
    );
  }

  componentWillUnmount() {
    this.props.removeCaseMarkersFromStore();
    this.setState({
      addresses: [],
    });

    let scripts = window.document.getElementsByTagName('script');
    this.mapOthers = window.document.body.getElementsByClassName(
      'pac-container'
    )[0];
    if (window.document.body.contains(this.mapScript)) {
      this.mapOthers.removeEventListener('load', this.scriptOnload);
      window.document.body.removeChild(this.mapScript);
      if (this.mapOthers) window.document.body.removeChild(this.mapOthers);
      window.google.maps = null;
    }

    if (this.mapTag) {
      console.log('################### this Map Tag', this.mapTag);
      // this.mapTag.removeEventListener("click", this.handleClickFunction);
    }
    console.log('||||||||||||||||||| MAP COMPONENT UNMOUNTED |||||||||||||| ');
  }

  componentDidUpdate() {
    this.AddMarkers(this.props.addresses);

    // if (this.props.addresses !== this.state.addresses) {
    //   console.log(
    //     "############# markers ADDED ######### ",
    //     this.props.addresses,
    //     " state>",
    //     this.state.addresses
    //   );
    //   this.AddMarkers(this.props.addresses);
    //   this.setState({
    //     addresses: this.props.addresses,
    //   });
    // } else {
    //   console.log(
    //     "############# markers NOT ADDED ######### map state addresses ",
    //     this.state.addresses,
    //     " props addresses ",
    //     this.props.addresses
    //   );
    // }

    if (this.props.stationCoords !== this.state.stationCoords) {
      this.AddAqiMarkers(this.props.stationCoords);
      this.setState({
        stationCoords: this.props.stationCoords,
      });
    }

    if (this.props.language !== this.state.language) {
      let markers = this.props.aqiMarkers.map((item) => {
        return item.setMap(null);
      });
      console.log(
        '@language Changed <<>>>>>>>>>>>  ',
        this.props.language,
        markers
      );

      this.AddAqiMarkers(this.props.stationCoords);
      this.setState({
        language: this.props.language,
      });
    }

    if (this.state.clickedOnMap == true) {
      this.setState({
        clickedOnMap: false,
      });
    }
    this.updated = this.updated + 1;
  }

  // MARKER CLICK HANDLER
  markerEventHandlerFunc = (marker, item) => {
    // TURNS OFF REQUEST TO [DB] FROM CONTENT
    // IN SCROLL *EVENT
    this.props.setContentScrollController(false);
    //
    // PUSHES DATA TO STORE
    this.props.getDataByMarker({
      data: [item],
      isLoading: this.props.isLoading,
      isError: this.props.isError,
    });

    // Mobile Navigation System
    if (this.props.mobileMode) {
      this.props.setMobileTabIndex(0);
      this.props.setMobileNavItemClicked(true);
    }
  };

  // OPEN ADDRESS LIST ON MAP CLICK

  openAddressList = (data) => {
    return !this.state.clickedOnMap;
  };

  // -->  -->  -->  Click on Map  <--   <--   <--
  handleClickFunction(e) {
    if (this.state.clickedOnMap == false) {
      this.setState({
        clickedOnMap: true,
      });
    }

    var geocoder = new window.google.maps.Geocoder();
    if (this.props.inUploadingSection) {
      // geocodeLatLng() returns value from map_libraries.js
      var data = geocodeLatLng(geocoder, this.googleMapRef, e);
      // dispatches to the store -> tempAddressListData : [data]
      data.then((result) => {
        this.props.mapTempAddressList(result);
      });
    }

    if (this.props.inUploadingSection) {
      this.openAddressList();
    }
  }

  //  CLICK EVENT ON MAP
  handleClick = () => {
    this.mapTag.addListener('click', this.handleClickFunction);
  };

  // removes store -> mapTempAddressList -> [ data ]
  mapTempAddressListClear = () => {
    this.props.mapTempAddressListClear();
  };

  // My Location handler
  myLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          if (window.google) {
            this.mapTag.setCenter(pos);
          }

          const geocoder = new window.google.maps.Geocoder();

          if (this.props.inUploadingSection) {
            geocoder.geocode({ location: pos }, (results, status) => {
              if (status === 'OK') {
                let addresses = [];
                if (results[0]) {
                  addresses = results.map((address) => ({
                    name: address.formatted_address,
                    latLng: pos,
                  }));

                  this.props.mapTempAddressList(addresses);

                  this.openAddressList();
                }
              }
            });
          }
        },
        (error) => {
          if (error.code == error.PERMISSION_DENIED) {
            console.log('@@@Permision Denied');
            this.setState({
              my_geolocation_info: true,
            });
          }
        }
      );
    }
  };

  render() {
    return (
      <>
        <input
          id="search-input"
          className="controls"
          type="text"
          placeholder="Search Box"
          ref={this.InputSearchRef}
        />
        <button
          onClick={this.myLocationHandler}
          className="currentLocationButton"
        >
          MyLocation
        </button>
        {this.state.my_geolocation_info ? (
          <div className="geolocationInfoWindow">
            <span className="my_geolocation_infowindow">
              Permission Denied. Setup you geolocation permission in browser
              settings.
            </span>
            <div
              className="closeGeolocationInfoWindow"
              onClick={() => {
                this.setState({
                  my_geolocation_info: false,
                });
              }}
            >
              X
            </div>
          </div>
        ) : null}
        <div id="map" ref={this.googleMapRef}>
          map
        </div>
        {/* temp addresses */}
        {this.props.inUploadingSection ? (
          <MapAddressList
            openAddressList={this.openAddressList}
            clearList={this.mapTempAddressListClear}
            addLocation={this.props.addLocation}
            data={this.props.tempAddressList}
          />
        ) : null}
      </>
    );
  }
}

const stateToProps = (state) => {
  return {
    addresses: addresses(state),
    stationCoords: stationCoords(state),
    aqiMarkers: state.map.aqiMarkers,
    tempAddressList: state.tempAddressList,
    uploading: state.upload.uploading,
    inUploadingSection: state.upload.inUploadingSection,
    mapReference: state.mapRef,
    mobileMode: state.mobile.mobileMode,
    language: state.language,
    isLoading: state.main_data.isLoading,
    isError: state.main_data.isError,
  };
};

const mapDispatchtoProps = {
  mapTempAddressList,
  mapTempAddressListClear,
  addLocation,
  startUploadingProcess,
  getMapReferenceRequest,
  setMarkersToStoreRequest,
  getDataByMarker,
  setMobileTabIndex,
  setMobileNavItemClicked,
  setAqiMarkersToStore,
  removeCaseMarkersFromStore,
  setContentScrollController,
};
export const ConnectedMapComponent = connect(
  stateToProps,
  mapDispatchtoProps
)(MapComponent);
