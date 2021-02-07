export function AddMarkers(addresses) {
  if (addresses) {
    if (addresses.length) {
      addresses.forEach((item) => {
        if (typeof item.coords.lat === "number") {
          var marker = "";
          if (window.google && window.google.maps) {
            marker = new window.google.maps.Marker({
              position: item.coords,
              map: this.mapTag,
              title: item.id,
            });
            marker.addListener("click", (e) => {
              this.markerEventHandlerFunc(marker, item);
            });
            this.markers.push(marker);
            marker.setMap(this.mapTag);
            this.props.setMarkersToStoreRequest(marker);

            // set markers request
          }
        }
      });
    }
  }
}
