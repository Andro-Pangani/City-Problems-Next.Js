import { languages } from "../../../language/languages";

export const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#202426",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#B5B5AF",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#B56969",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#9DA65D",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "poi.school",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#83B28B",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#9191BA",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#9D5B1E",
      },
      {
        weight: 1,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#A67484",
      },
      {
        weight: 0.5,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8C88",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#CCDAD9",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "white",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#8273A0",
      },
      {
        weight: 1,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#504191",
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#B5B5B5",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        // color: "#F2F2F2",
        color: "#5455B2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.stroke",
    stylers: [
      {
        // color: "#F2F2F2",
        color: "#9E2AB2",
      },
      {
        weight: 3,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

// export const mapStyle = [
//   {
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#A3A3A3",
//       },
//     ],
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#FFFFF7",
//       },
//     ],
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#8E846D",
//       },
//     ],
//   },
//   {
//     featureType: "administrative",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#757575",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.country",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#B56969",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.land_parcel",
//     stylers: [
//       {
//         visibility: "on",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.locality",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#bdbdbd",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#3E2813",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#181818",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#9DA65D",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#A7ED81",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#1b1b1b",
//       },
//     ],
//   },
//   {
//     featureType: "poi.school",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#83B28B",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#9191BA",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#5F3D1D",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#EAEAEA",
//       },
//     ],
//   },

//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#8C8C88",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#CCDAD9",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "white",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway.controlled_access",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#4e4e4e",
//       },
//     ],
//   },
//   {
//     featureType: "road.arterial",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#373737",
//       },
//     ],
//   },
//   {
//     featureType: "road.arterial",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#DECFAB",
//       },
//       {
//         weight: 3,
//       },
//     ],
//   },
//   // {
//   //   featureType: "road.arterial",
//   //   elementType: "geometry.stroke",
//   //   stylers: [
//   //     {
//   //       color: "#A67484",
//   //     },
//   //     {
//   //       weight: 0.5,
//   //     },
//   //   ],
//   // },
//   {
//     featureType: "road.local",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#D0D0D0",
//       },
//       {
//         weight: 1.1,
//       },
//     ],
//   },
//   {
//     featureType: "road.local",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#949A59",
//       },
//       {
//         weight: 0.2,
//       },
//     ],
//   },
//   {
//     featureType: "road.local",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#C5C5C5",
//       },
//     ],
//   },
//   {
//     featureType: "road.local",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#747474",
//       },
//     ],
//   },
//   {
//     featureType: "transit",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#FFFFFF",
//       },
//     ],
//   },
//   {
//     featureType: "transit",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#3D382B",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#000000",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         // color: "#F2F2F2",
//         color: "#65DEDC",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         // color: "#F2F2F2",
//         color: "#9E2AB2",
//       },
//       {
//         weight: 3,
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#3d3d3d",
//       },
//     ],
//   },
// ];

// export const mapStyle = []
export const aqiMapMarker = {
  good: {
    color: "cyan",
    recomendations: `ჯანდაცვით რეკომენდაციებს არ საჭიროებს`,
  },
  fair: {
    color: "rgb(52 168 83)",
    recomendations: `განსაკუთრებით მგრძნობიარე ადამიანებმა 
  უნდა შეამცირონ გახანგრძლივებული ან დატვირთული გარე 
  ფიზიკური აქტივობა`,
  },
  moderate: {
    color: "rgb(206 155 26)",
    recomendations: `შემდეგმა ჯგუფებმა უნდა შეამცირონ გახანგრძლივებული ან დატვირთული გარე ფიზიკური აქტივობა:
  გულის ან ფილტვის დაავადებების მქონე პირები
  ბავშვები და ხანდაზმულები`,
  },
  poor: {
    color: "#d21d1d",
    recomendations: `ყველამ შეიძლება განიცადოს ზემოქმედება ჯანმრთელობაზე; ხოლო, სენსიტიური ჯგუფების წევრები შესაძლებელია განიცდიდნენ უფრო სერიოზულ ზემოქმედებას, ვიდრე მოსახლეობა ზოგადად`,
  },
  very_poor: {
    color: "#a70000",
    recomendations: `ჰაერის ხარისხი საგანგაშოა ჯანმრთელობისათვის; ყველამ შეიძლება განიცადოს სერიოზული ზეგავლენა ჯანრმთელობაზე.`,
  },
  station_off: {
    color: "#949494",
    recomendations: "სადგური გათიშულია. იყავით ფრთხილად",
  },
};

// Takes  -- --  *StationCoors from  -> aqi:data:data:stationCoords ->
//  {
//    -address: .. -, -coords:{lat:.., lng:..} -,
//    -props: ..?undefined -,
//    -station_id: .. -, -substances: [..] -
// }

export const aqiInfoWindow = (data, lang) => {
  console.log(lang, " @@@@@@@@@@@@ lang from mapStyles");

  return `<div style="color: ${data.props.color}" 
  class="infoWindowContainer"> 

   <h1 class="aqiInfoAddress"
   style="background-color: ${aqiMapMarker[data.props.aqi_level].color}"
   > ${data.address}
   
   </h1>

  <div class="aqiInfoContent"> 
  
  <h2 class="aqiInfoLevel">

   <span class="aqi_info_level-text">
   ${languages.aqiSection.recomendations[lang][data.props.aqi_level].level}
   </span>
  </h2>

   <div class="aqiInfoRecomendations">
    ${
      languages.aqiSection.recomendations[lang][data.props.aqi_level]
        .recomendations
    }
   </div>

  </div>

 </div>`;
};
