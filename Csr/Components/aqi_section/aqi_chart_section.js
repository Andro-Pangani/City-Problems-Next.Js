import React from "react";
import "./aqi_section.scss";
import "./aqi_chart_component.scss";
import { connect } from "react-redux";

class AqiChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.pathRef = React.createRef();
    this.svgElement = React.createRef();

    let arr = new Array(24);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 500);
    }

    this.state = {
      arr_value: arr,
      svgWidth: undefined,
      firstValue: 0,
    };
  }

  componentDidMount() {
    let _svgElement = this.svgElement.current.getBoundingClientRect();
    let height = _svgElement.height;
    let width = _svgElement.width;

    this.setState({
      svgElement: this.svgElement,
      svgWidth: width,
      svgHeight: height,
    });
  }

  componentDidUpdate() {}

  mainStep = undefined;
  lineStep = 0;
  cord = "";
  step = undefined;
  firstValue = 0;
  alarm = false;
  alarmStyle = "dangerzone 1s infinite";
  render() {
    this.step = this.state.svgWidth / 26;

    this.mainStep = 0;
    this.cord = "";

    let _chartData = this.props.data
      ? this.props.data.map((item) => {
          return item;
        })
      : false;

    let lastIndex = _chartData.length - 1;
    let lastValue = _chartData[lastIndex]
      ? _chartData[_chartData.length - 1].value
      : null;

    let lastValueInPercent = (lastValue / 100) * this.state.svgHeight;

    let dangerZoneTitle = undefined;

    let dangerZoneStyle;
    let aqiLevelCurrent = this.props.aqi_level_current;

    switch (aqiLevelCurrent) {
      case "good":
        this.alarm = false;
        dangerZoneTitle = "ჰაერის ხარისხი დამაკმაყოფილებელია";
        break;
      case "fair":
        this.alarm = false;
        dangerZoneTitle =
          "განსაკუთრებით მგრძნობიარე ჯგუფებმა თავი შეიკავონ გახანგრძლივებული გარე ფიზიკური აქტივობისაგან";
        break;
      case "moderate":
        this.alarm = false;
        dangerZoneTitle =
          "ბავშვებმა, ხანდაზმულებმა, სენსიტიურ ჯგუფებმა თავი შეიკავონ გახანგრძლივებული გარე გიზიკური აქტივობისაგან";
        break;
      case "poor":
        this.alarm = true;
        dangerZoneTitle =
          "ჰაერის ხარისხი დამაზიანებელია ყველასთვის განსაკუთრებით ბავშვებისთვის და სხვა სენსიტიური ჯგუფებისთვის";
        break;
      case "very_poor":
        this.alarm = true;
        dangerZoneTitle =
          "ჰაერის ხარისხის მაჩვენებელი <საგანგაშოა>. ყველამ შეიძლება განიცადოს მავნე ზეგავლენა ჯანმრთელობაზე, განსაკუთრებით ბავშვებმა და სხვა სენსიტიურ ჯგუფებმა";
        break;
      default:
        this.alarm = false;

        dangerZoneTitle =
          "არ არის ჰაერის ხარისხის მონაცემები, გაუფრთხილდით ჯანმრთელობას";
        break;
    }

    let aqi_level_index = this.props.aqiLevel
      ? this.props.aqiLevel.very_poor_from * 2
      : undefined;

    return (
      <div className="aqi_chart_container">
        <svg
          ref={this.svgElement}
          className="svg_element"
          viewBox="0 0 100% 100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {this.state.svgWidth && _chartData ? (
            _chartData.map((item, index) => {
              //percent of aqi value level
              let value = item.value;

              let _y = (value / aqi_level_index) * 100;

              // percent of svg height
              let svgY = (_y / 100) * this.state.svgHeight;
              // let svgY = _y;


              let textY = `${15}%`;
              if (index % 2 == 0) {
                textY = `${90}%`;
              }

              let current_value_text = svgY;
              let firstValue = 0;
              if (index == 0) {
                this.firstValue = svgY;

                if (lastValueInPercent > 70) {
                  this.cord = `M${this.step} ${svgY / 2} `;
                } else if (lastValueInPercent < 20) {
                  this.cord = `M${this.step} ${svgY + 10} `;
                } else {
                  this.cord = `M${this.step} ${svgY} `;
                }
              }

              if (lastValueInPercent > 70) {
                svgY = svgY / 2;
                if (index === lastIndex) {
                  current_value_text = svgY;
                }
              } else if (lastValueInPercent < 20) {
                svgY = svgY + 10;
                if (index === lastIndex) {
                  current_value_text = svgY + 10;
                }
              }

              // setup les value Text

              this.mainStep += this.step;
              this.lineStep = this.mainStep;

              // offset of path line for make visual better
              // path value - main chart data line

              if (index > 0) {
                this.cord += `L${this.mainStep} ${svgY} `;
              }

              return (
                <g key={index}>
                  {index !== lastIndex ? (
                    <line
                      className="myLine"
                      x1={`${this.lineStep}`}
                      y1="90%"
                      x2={`${this.lineStep}`}
                      y2="10%"
                    />
                  ) : (
                    <line
                      className="myLine"
                      x1={`${this.lineStep}`}
                      y1="85%"
                      x2={`${this.lineStep}`}
                      y2="15%"
                      // style={{
                      //   animation: this.alarm ? this.alarmStyle : null,
                      // }}
                    />
                  )}
                  <text
                    className="svg_text"
                    x={`${this.lineStep}`}
                    y={textY}
                    textAnchor="middle"

                    // transform={`translate(${textY},${this.lineStep})`}
                  >
                    {`${item.date_time.match(/\d{2}:\d{2}/g)}`}
                  </text>
                  {index !== lastIndex ? (
                    <rect
                      className="_path_rect"
                      x={`${this.lineStep}`}
                      y={`${svgY - 5}`}
                      style={{
                        fill: item.level.color,
                        // animation: this.alarm ? this.alarmStyle : null,
                      }}
                      width="10"
                      height="10"
                    />
                  ) : (
                    <circle
                      cx={`${this.lineStep}`}
                      cy={`${svgY}`}
                      r="5"
                      fill={`${item.level.color}`}
                      stroke="white"
                      style={{
                        animation: this.alarm ? this.alarmStyle : null,
                      }}
                    />
                  )}
                  {index === lastIndex ? (
                    <g>
                      <rect
                        className="chartCurrentValueSign"
                        x={this.mainStep}
                        y={svgY}
                        style={{ fill: this.props.color }}
                      ></rect>
                      <text
                        className="chartCurrentValue"
                        x={this.mainStep}
                        y={`${current_value_text}%`}
                        style={{ fill: "#eae7e7" }}
                        style={{
                          animation: this.alarm ? this.alarmStyle : null,
                        }}
                      >
                        {value}
                      </text>
                    </g>
                  ) : null}{" "}
                </g>
              );
            })
          ) : (
            <g>
              <text
                className="no_chart_data_text"
                x="50%"
                y="50%"
                transform="translate(-100 -25)"
              >
                ${dangerZoneTitle}
              </text>
            </g>
          )}

          {
          /* <rect
            className="dangerZone"
            x={`${this.step}`}
            y={`${90}%`}
            width="5%"
            height="10"
            style={{ fill: this.props.color }}
          ></rect>
          <text
            style={{ fill: this.props.color }}
            className="appName"
            x={`${5}%`}
            y={`${90}%`}
            style={{
              animation: this.alarm ? this.alarmStyle : null,
            }}
          >
            {dangerZoneTitle}
          </text> */}
          <path
            style={{ stroke: this.props.color }}
            ref={this.pathRef}
            className="_path"
            d={this.cord}
          />
        </svg>
      </div>
    );
  }
}

const stateToProps = (state) => {
  let data = state.aqi.chartData;
  return {
    data: data.data,
    substance: data.substance,
    address: data.address,
    aqi_level_current: data.aqi_level_current,
    color: data.color,
    aqiLevel: data.aqiLevel,
  };
};

const AqiChartComponentConnected = connect(
  stateToProps,
  null
)(AqiChartComponent);

export default class AqiChartSection extends React.PureComponent {
  render() {
    return (
      <section className="aqi_chart_section">
        <AqiChartComponentConnected />
      </section>
    );
  }
}
