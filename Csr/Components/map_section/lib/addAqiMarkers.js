import { aqiInfoWindow, aqiMapMarker } from "../map/map_style";
import { myOvelayMarker } from "../map/mapOverlayFunc";

export function AddAqiMarkers(addresses) {
  if (window.google) {
    if (addresses) {
      if (addresses.length && window.google.maps) {
        const image = {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",

          // This marker is 20 pixels wide by 32 pixels high.
          size: new window.google.maps.Size(10, 10),
        };

        let aqiMarkers = [];
        addresses.forEach((item) => {
          if (typeof item.coords.lat === "number") {
            // aqiMarker.fillColor = aqiMapMarker[item.props.aqi_level].color;
            // aqiMarker.strokeColor = item.props.color;
            let infoWindow = new window.google.maps.InfoWindow({
              content: aqiInfoWindow(item, this.props.language),
              maxWidth: 300,
            });
            var marker = "";
            if (window.google) {
              marker = new window.google.maps.Marker({
                position: item.coords,
                map: this.mapTag,
                station_id: item.station_id.toString(),
                infoWindow: infoWindow,
                marker: marker,
                icon: image,
              });

              marker.addListener("click", (e) => {
                infoWindow.open(this.mapTag, marker);
              });
              this.markers.push(marker);
              marker.setMap(this.mapTag);

              aqiMarkers.push(marker);

              myOvelayMarker({
                coords: item.coords,
                mapTag: this.mapTag,
                infoWindow: infoWindow,
                marker: marker,
                props: {
                  color: aqiMapMarker[item.props.aqi_level].color,
                },
              });
            }
          }
        });

        // set aqiMarkers to store here with
        // aqiMarkers var
        this.props.setAqiMarkersToStore(aqiMarkers);
      }
    }
  }
}
