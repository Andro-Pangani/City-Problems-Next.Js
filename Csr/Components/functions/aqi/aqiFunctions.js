export const colors = {
 good: "rgb(28 125 134)",
 fair: "rgb(75 121 75)",
 moderate: "rgb(151 96 0)",
 poor: "rgb(171 37 37)",
 very_poor: "rgb(189 0 0)",
};

export const aqiLevelArray = [
 'very_poor', 'poor', 'moderate', 'fair', 'good',
]

export function checkForAlarm(value, aqi) {
switch (true) {
  case value >= aqi.poor_from && value < aqi.poor_to:
   return true;

  case value >= aqi.very_poor_from && value <= aqi.very_poor_to:
   return true;
  default:
  return false
 }
}

export function setAqiColor(value, aqi) {
 switch (true) {
   case value >= aqi.good_from && value < aqi.good_to:
     return { color: colors.good, aqi_level: "good" };
   case value >= aqi.fair_from && value < aqi.fair_to:
     return { color: colors.fair, aqi_level: "fair" };

   case value >= aqi.moderate_from && value < aqi.moderate_to:
     return { color: colors.moderate, aqi_level: "moderate" };

   case value >= aqi.poor_from && value < aqi.poor_to:
     return { color: colors.poor, aqi_level: "poor" };

   case value >= aqi.very_poor_from && value <= aqi.very_poor_to:
     return { color: colors.very_poor, aqi_level: "very_poor" };
   default:
     return { color: "gray", aqi_level: 'station_off' };
 }
}

export function aqiMarkerSetup(value){
 switch(value){
  case 'very_poor':
   return {color: colors.very_poor};
   case 'poor': 
   return {color: colors.poor};
   case 'moderate':
    return {color: colors.moderate}
    case 'fair':
     return {color: colors.fair}
     case 'good':
      return {color: colors.good}
      default: return {color: 'gray'}
 }
}