import { createSelector } from "reselect";
import { getSetAqiChartData } from "../../Redux/aqi/( a - r )getAqiChart";
import { store } from "../../Redux/Store";
import { getMapReferenceReducer } from "../../Redux/Map/A_R_getMapReference";
import { checkForAlarm, setAqiColor } from "../functions/aqi/aqiFunctions";

let chartSet = false;
let alarm = false;

// only one city stations
export const aqiCityDataSelected = createSelector(
  (state) => state.aqi.cityData,
  (cityData) => {
    let chartData = {};

    let _cityData = cityData.data
      ? cityData.data.map((station) => {
          // station ex. (Tbilisi-Marjanishvili)
          let empty = true;
          station.stationequipment_set.map((substance) => {
            let data = substance.data1hour_set;
            if (data.length > 0) {
              empty = false;
            }
          });

          if (empty) {
            station.empty = true;
          } else {
            station.empty = false;
            station.stationequipment_set.map((substance) => {
              let lastIndex = substance.data1hour_set.length - 1;
              let lastValue = substance.data1hour_set[lastIndex];

              let name = substance.substance.name;

              let aqiIndexLevelSet =
                substance.substance.airqualityindexlevel_set[0];

              let aqiData = setAqiColor(
                lastValue ? lastValue.value : null,
                aqiIndexLevelSet
              );

              substance.data1hour_set.map((item) => {
                // set each value of data1HOUR -
                item.level = setAqiColor(
                  item.value ? item.value : null,
                  aqiIndexLevelSet
                );
              });

              substance.substance.aqi_data = aqiData;

              if (alarm == false && lastValue) {
                alarm = checkForAlarm(lastValue.value, aqiIndexLevelSet);
              }

              if (lastValue && !chartSet) {
                chartSet = true;

                chartData = {
                  address: station.address,
                  name: name,
                  data: substance.data1hour_set,
                  aqi_data: aqiData,
                  aqiLevel: substance.substance.airqualityindexlevel_set[0],
                };
              }
            });
            station.alarm = alarm;
            alarm = false;
          }

          return station;
        })
      : cityData;

    if (_cityData) {
      _cityData.dataState = cityData.dataState;
    }
    return { cityData: _cityData, chartData: chartData };
  }
);
