import React, { Fragment } from "react";
import "./map.scss";

import { ConnectedMapComponent } from "./MapComponent";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRef: props.giveMapRef ? this.props.giveMapRef : null,
      markers: props.Markers ? props.Markers : null,
    };
  }

  render() {
    return (
      <Fragment>
        <div className="map_container">
          <ConnectedMapComponent
            giveMapRef={this.state.mapRef}
            Markers={this.state.markers}
          />
        </div>
      </Fragment>
    );
  }
}

// Renaming  * enterAddress to * sendAddress
