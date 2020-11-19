export const geocodeLatLng = async (geocoder, map, e) => {
  let latLng = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng(),
  };

  let addresses = [];

  await new Promise((resolve, reject) => {
    geocoder.geocode({ location: latLng }, (result, status) => {
      if (status === "OK") {
        if (result.length != 0) {
          for (let i = 0; i < result.length; i++) {
            addresses.push({
              name: result[i].formatted_address,
              latLng: latLng,
            });
          }
          console.log(
            addresses.length,
            " from GEOCODER *** *** *** ** (map_libraries.js)"
          );
          resolve(addresses);
        }
      }
    });
  }).then((result) => {
    console.log(result, "from Then Promise (map_libraries.js)");
  });

  console.log(
    "*** From *** Outof Geocoder *** ",
    addresses,
    " - length ",
    addresses.length
  );

  return addresses;
};
