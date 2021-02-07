import { type } from "../types";
import { _url } from "../../_urls";
import {
  getAqiFailure,
  getAqiSuccess,
  setAqiCityDataFailure,
  setAqiCityDataRequest,
  setAqiCityDataSuccess,
} from "../aqi/( a - r )getAqi";
import {
  aqiLevelArray,
  aqiMarkerSetup,
  setAqiColor,
} from "../../Components/functions/aqi/aqiFunctions";

export const getAqiMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case type.Aqi.get_Aqi_Request:
      fetch(_url.aqi, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          if (!data || data.length === 0) {
            console.log("!!!!!!!!AqiIs Empty");
            store.dispatch(getAqiFailure([]));
          } else {
            // console.log('!!!!!!!!AqiData ',data);

            let aqidata = {};
            let aqiStationProps = [];
            let props = { aqi_level: "station_off", color: "gray" };
            if (data) {
              data.map((station) => {
                aqidata[station.settlement_en] = !aqidata[station.settlement_en]
                  ? [station]
                  : [...aqidata[station.settlement_en], ...[station]];

                // checking if Location is Dangerous
                // and setting color of station marker on Map
                let sortedSubstances = [];
                if (station.stationequipment_set) {
                  station.stationequipment_set.map((substance) => {
                    if (
                      substance.data1hour_set &&
                      substance.data1hour_set.length !== 0
                    ) {
                      let lastIndex = substance.data1hour_set.length - 1;
                      let lastValue = substance.data1hour_set[lastIndex].value;

                      let aqiLevel = substance.substance
                        .airqualityindexlevel_set[0]
                        ? substance.substance.airqualityindexlevel_set[0]
                        : null;

                      sortedSubstances.push({
                        substance: setAqiColor(lastValue, aqiLevel),
                      });
                    }
                  });
                }
                // * - *

                // Finally Set Color of Station Locaion Marker
                let propSet = false;
                aqiLevelArray.forEach((index) => {
                  if (propSet) {
                    return;
                  } else {
                    sortedSubstances.forEach((item) => {
                      if (index === item.substance.aqi_level) {
                        props = item.substance;
                        propSet = true;
                        return;
                      } else {
                        return;
                      }
                    });
                  }
                });

                aqiStationProps.push({
                  station_id: station.id,
                  coords: {
                    lat: station.lat,
                    lng: station.long,
                  },
                  substances: sortedSubstances,
                  props: props,
                  address: station.st_full_address_en,
                });
                // clean variables
                //
                sortedSubstances = [];
                props = { aqi_level: "station_off", color: "gray" };
                return;
              });

              aqidata.stationCoords = aqiStationProps;
              store.dispatch(getAqiSuccess(aqidata));
              store.dispatch(setAqiCityDataRequest("Tbilisi"));
            }
          }
        })
        .catch((err) => {
          console.log(
            "< - - - Aqi Catch Error - - >",
            err,
            " < - Aqi catch Error - >"
          );
        });
    default:
      break;
  }

  return next(action);
};
