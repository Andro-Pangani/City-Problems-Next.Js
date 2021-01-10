import React, { useEffect, useState } from "react";

export function SubstanceValueChart(props) {
  const [width, setWidth] = useState(0);
  const aqiValueChart = React.createRef();

  useEffect(() => {
    let valuePercent = props.data
      ? (props.data / props.very_poor_from) * 100
      : null;

    let chartWidth = props.parrentSize
      ? (valuePercent / 100) * props.parrentSize
      : null;

    if (width !== chartWidth) {
      setWidth(chartWidth);
    }
    let size = aqiValueChart.current.getBoundingClientRect();
  });

  return (
    <div
      className="substance_value_chart-container"
      style={{
        color: props.aqi_level_current.color,
      }}
    >
      <div
        style={{
          width: "fit-content",
        }}
        className="substance_value"
      >
        {props.data}
      </div>
      <div
        style={{
          width: `${width}px`,
          backgroundColor: props.aqi_level_current.color,
        }}
        ref={aqiValueChart}
        className="aqi_value_minichart"
      ></div>
      {props.aqi_level_current.aqi_level === "very_poor" ? (
        <div className="alertVeryPoor">
          საგანგაშო! დახურეთ ფანჯრები,ნუ გახვალთ გარეთ!
          {/* <div className="cancerZone">დამაზიანებელია ყველასათვის</div> */}
        </div>
      ) : null}
    </div>
  );
}
