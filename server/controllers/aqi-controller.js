const axios = require("axios");

//    * AIR QUALITY (AQI) *

exports.aqi = async (req, res, next) => {
  let date = new Date();
  let utc = date.getTime() + date.getTimezoneOffset() * 60000;
  let nd = new Date(utc + 3600000 * 4);

  let myDate = {
    year: nd.getFullYear(),
    month: nd.getMonth() + 1,
    day: nd.getDate(),
    time: {
      hours: nd.getHours(),
      minutes: nd.getMinutes(),
      seconds: nd.getSeconds(),
    },
  };

  // - -  setup TimeZoneOffset

  console.log(myDate, "**** Server Time ****");

  // Each Month firs Day
  let minusOffset = 1;
  let fromHours = myDate.time.hours;
  if (myDate.day === 1) {
    console.log(myDate, " <-- date ");
    fromHours = 0;
    minusOffset = 0;
  }
  const apiUrl = `http://air.gov.ge/api/get_data_1hour/?from_date_time=${
    myDate.year
  }-${myDate.month}-${
    myDate.day - minusOffset
  }T${fromHours}:00:00&to_date_time=${myDate.year}-${myDate.month}-${
    myDate.day
  }T${
    myDate.time.hours
  }:00:00&station_code=all&municipality_id=all&substance=all&format=json`;

  let data = await axios
    .get(apiUrl)
    .then((data) => {
      res.json(data.data);
      // console.log(data, " Aqi Data from Aqi");
      return data.data;
    })
    .catch((err) => {
      res.send(false);
      console.log(err, " ----- Error from axios - in [/aqi] - - ");
    });
};
