import { type } from "../types";
import { setAqiCityDataSuccess } from "../aqi/( a - r )getAqi";
import { getSetAqiChartData } from "../aqi/( a - r )getAqiChart";

export const setAqiCityDataMiddleware = (store) => (next) => (action) => {
  if (action.type === type.Aqi.set_City_Data_Request) {
    // ------- - example - -----aqi.data[Tbilisi]
    console.log(" <  -  -  -  Aqi City Middleware  -  -  > ");
    let cityData = store.getState().aqi.data.data[action.payload];
    next(action);
    store.dispatch(setAqiCityDataSuccess(cityData));
    // setup Chart Data
    let _cityData = store.getState().aqi.cityData.data;

    let chartData = {};

    _cityData = _cityData
      ? _cityData.map((station) => {
          let empty = true;
          let activated = false;

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
              let value = substance.data1hour_set[lastIndex];
              let name = substance.substance.name;

              if (value && !activated) {
                activated = true;
                chartData = {
                  address: station.address,
                  substance: name,
                  color: substance.substance.aqi_data.color,
                  data: substance.data1hour_set,
                  aqi_level_current: substance.substance.aqi_data.aqi_level,
                  aqiLevel: substance.substance.airqualityindexlevel_set[0],
                };
              }
            });
          }

          return station;
        })
      : undefined;

    store.dispatch(getSetAqiChartData(chartData));
  }

  return next(action);
};
