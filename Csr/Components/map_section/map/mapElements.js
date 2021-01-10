import { mapStyle } from "./map_style";

export const icon = "";
export const createGoogleMap = (MapRef, InputSearch) => {
  var InputSearch = InputSearch.current;
  var mapTag = new window.google.maps.Map(MapRef.current, {
    center: {
      lat: 41.70643377144898,
      lng: 44.79197260839353,
    },
    zoom: 14,
    mapTypeControlOptions: {
      style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: window.google.maps.ControlPosition.TOP_RIGHT,
      mapTypeIds: ["satellite", "hybrid", "terrain", "hybrid", "MyMap"],
    },
    disableDefaultUI: false,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("supports geolocation");
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      //  SETS CENTER AND MARKER TO MAP ->>

      mapTag.setCenter(pos);
      if (window.google) {
        let marker = new window.google.maps.Marker({
          position: pos,
          map: mapTag,
          title: "Current Position",
          // icon of current location *
          // icon: {
          // size: new window.google.maps.Size(30, 30),

          //   url:
          //     'https://storage.googleapis.com/deligation-40179.appspot.com/icons/myLogo.png',
          // },
        });

        marker.setMap(mapTag);
      }
    });

    let watchOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
    };

    // setInterval(() => {
    //   navigator.geolocation.watchPosition(
    //     (watchedPos) => {
    //       console.log(watchedPos, "  yea", watchedPos.coords.latitude);
    //     },
    //     function (err) {
    //       console.log(err);
    //     }
    //   );
    // }, 1000);
  } else {
    // Browser doesn't support Geolocation
    console.log("Doesn't support geolocation");
  }
  // Custom styles for map types =>
  var styledMapType = new window.google.maps.StyledMapType(mapStyle, {
    name: "MyMap",
  });
  mapTag.mapTypes.set("MyMap", styledMapType);
  mapTag.setMapTypeId("MyMap");

  //<=== - -.- - -.- - -.- - -.- -_   Searchbox   _- -.- - -.- - -.- - -.- - ===>=

  var searchBox = new window.google.maps.places.SearchBox(InputSearch);
  mapTag.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
    InputSearch
  );
  mapTag.addListener("bounds_changed", function () {
    searchBox.setBounds(mapTag.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new window.google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      icon = {
        url: place.icon,
        size: new window.google.maps.Size(10, 10),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(10, 10),
      };

      // Create a marker for each place.
      markers.push(
        new window.google.maps.MarkerImage({
          map: mapTag,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    mapTag.fitBounds(bounds);
  });

  return mapTag;
};
