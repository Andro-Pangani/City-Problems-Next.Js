import { getAqiSuccess } from "../aqi/( a - r )getAqi";
import { type } from "../types";

export const addAqiMarkersMiddleware = (store) => (next) => (action) => {
  //  -  S E T S   -   M A R K E R S   -   T O  -  A Q I  ->  S T O R E ->

  switch (action.type) {
    case type.Map.setAqiMarkersToStore:
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Aqi Markers Middleware', action.payload);
      let aqiData = store.getState().aqi.data.data;
      let aqiMarkers = action.payload;

      for (let city in aqiData) {
        // console.log(" @@@@@@@@@@@@  @@@@@@@@@@@@@@@@ ",city ,' - ', aqiData[city]);
        if (city !== "stationCoords") {
          aqiData[city].map((station) => {
            aqiMarkers.map((marker) => {
              if (marker.station_id === station.id.toString()) {
                console.log(" Marker Found");

                station.marker = marker;
              }
            });
          });
        }
      }
      // console.log(aqiData, ' <<<<<<<<<<<<<<<<<<< ');
      store.dispatch(getAqiSuccess(aqiData));

    default:
      break;
  }

  return next(action);
};
