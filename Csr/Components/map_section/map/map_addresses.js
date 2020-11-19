import React, { Component, Fragment } from "react";
import {
  addNewAddress,
  stopUploadingProcess,
} from "../../../Redux/Upload/( a - r )upload";
import { connect, useDispatch } from "react-redux";
import {
  setMobileNavItemClicked,
  setMobileShowOnMapClicked,
  setUploadAddressFromMap,
} from "../../../Redux/mobile/( a - r )mobileMenu";

//  AddressItem ==>

const AddressItem = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    props.newAddressData({
      address: props.name,
      coords: props.coords,
    });

    // SET MARKER FOR MOBILE NAV SYSTEM
    dispatch(setUploadAddressFromMap(true));
    // REFRESH
    //MOBILE NAVIGATION SISTEM
    dispatch(setMobileNavItemClicked(false));
    dispatch(setMobileShowOnMapClicked(false));
    console.log(" HANDLE CLICK MAP ADDRESS ITEM ");
  };

  return (
    <Fragment>
      <li onClick={handleClick} className="map_list_item">
        <div className="mapAddressName">{props.name}</div>
      </li>
    </Fragment>
  );
};

// MapAddressList ==>

class MapAddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
  }

  mapAddressList_click = (val) => {
    // var addressObj = [{ name: this.props.name, coords: this.props.coords }];
    console.log("*********** BEFORE SENDADDRESS *********** ", val);
    this.props.addNewAddress(val);
    // store -> mapTempAddressList : [empty]
    // this.props.clearList();
    // this.props.addLocation(addressObj);
  };

  CloseList = () => {
    console.log("close");
    this.setState({
      closed: !this.state.closed,
    });
    // this.props.stopUploadingProcess();
  };

  openList = () => {
    // this.setState({
    //   closed: false,
    // });

    console.log("open List from map addresses");
  };

  componentDidMount() {
    // this.props.openAddressList(this.openList);
  }

  componentDidUpdate() {
    let mapClicked = this.props.openAddressList(this.state.closed);
    if (this.state.closed && mapClicked) {
      this.setState({
        closed: false,
      });
    }
    console.log(
      "did update address list ?>>>>>>><<<<<<< closed > ",
      this.state.closed,
      " Mark",
      mapClicked
    );
  }

  arrowDown = "\u25BC";

  render() {
    return (
      <Fragment>
        <div className="mapListContainer">
          <div className="AddressListHeader">
            <div className="listHeader-text">დააჭირეთ რუქას</div>
            <div onClick={this.CloseList} className="closeList">
              {this.state.closed ? this.arrowDown : "X"}
            </div>
          </div>
          <ul
            style={
              this.state.closed ? { height: "0" } : { height: "fit-content" }
            }
            className="MapAddressList"
          >
            {this.props.data
              ? this.props.data.map((val, index) => {
                  return (
                    <Fragment key={index}>
                      <AddressItem
                        newAddressData={this.mapAddressList_click}
                        clearList={this.props.clearList}
                        addLocation={this.props.addLocation}
                        name={val.name}
                        coords={val.latLng}
                      />
                    </Fragment>
                  );
                })
              : null}
          </ul>
        </div>
      </Fragment>
    );
  }
}

const dispatchToProps = {
  stopUploadingProcess,
  addNewAddress,
};

export default connect((state) => {
  return {
    inUploadingSection: state.upload.inUploadingSection,
  };
}, dispatchToProps)(MapAddressList);
