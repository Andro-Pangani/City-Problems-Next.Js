export const aqiSectionTitleStyle = (lang) => ({
  fontFamily: lang === "English" ? "system-ui" : null,
  fontSize: lang === "Russian" ? "2rem" : null,
});

export const aqiStationAddressStyle = (lang, alarm) => ({
  color: alarm ? "rgb(165 67 67)" : null,
  fontFamily: lang !== "Georgian" ? "Alk Tall Mtavruli" : "Alk Tall Mtavruli",
  // fontSize: lang !== 'Georgian' ? '1.2rem' : null
});
