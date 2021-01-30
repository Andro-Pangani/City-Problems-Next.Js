import { createSelector } from "reselect";

export const addresses = createSelector(
  (state) => ({ content: state.main_data.content, markers: state.map.markers }),
  (content) => {
    let markersOnMap = content.markers;
    let allMarkers = content.content;

    // -  if map is clear

    if (markersOnMap.length == 0) {
      // console.log(
      //   "############### RETURED ALL MARKERS FROM SELECTOR!!!!!!!!!!! ",
      //   allMarkers
      // );

      return allMarkers;
    }

    // -  do not add on map existing marker

    let markersToAdd = [];

    allMarkers.map((markerAll) => {
      let addMarker = true;

      markersOnMap.map((markerMap) => {
        let map_lat = markerMap.position.lat();
        let map_lng = markerMap.position.lng();
        // IF MARKER IS NEW
        if (
          markerAll.coords.lat === map_lat &&
          markerAll.coords.lng === map_lng
        ) {
          addMarker = false;
        }
      });

      if (addMarker) {
        markersToAdd.push(markerAll);
        addMarker = true;
        return markerAll;
      }
    });
    return markersToAdd;
  }
);

export const stationCoords = createSelector(
  (state) => state.aqi.data.data.stationCoords,
  (stationCoords) => stationCoords
);
