import React, { useEffect, useState } from "react";
import { AddAlternativeComponent } from "./AddAlternativeComponent";
import { AlternativeDataComponent } from "./AlternativeData";

export function AlternativeComponent(props) {
  const [clicked, setClicked] = useState(false);
  const [translate_x, setX] = useState(100);
  const [button_x, setButton_x] = useState(0);
  const [window_opened, set_window_opened] = useState(false);
  const [alternativeUploading, setAlternativeUploading] = useState(false);

  useEffect(() => {
    if (clicked && !window_opened) {
      OpenAltWindow();
    }

    if (window_opened && !clicked) {
      CloseAltWindow();
    }
  }, [clicked]);

  function handleClick(props) {
    setClicked(!clicked);
    console.log(clicked);
  }

  function CloseAltWindow() {
    setX(100);
    setButton_x(0);
    set_window_opened(!window_opened);
  }

  function OpenAltWindow() {
    setX(0);
    setButton_x(100);
    set_window_opened(!window_opened);
  }

  function CloseFromChild(value) {
    if (value === "false") {
      CloseAltWindow();
      setClicked(!clicked);
    }

    if (value == "true") {
      setAlternativeUploading(true);
    }
  }

  return (
    <div
      style={{
        transform: `translateX(${translate_x}%)`,
      }}
      className="alternative_container"
    >
      {/* alternative Button */}
      <div
        onClick={handleClick}
        style={{ left: `${button_x}%` }}
        className="alternative_button"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style={{ enableBackground: "new 0 0 512 512" }}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <path d="M179.2,486.4c0,14.08,11.52,25.6,25.6,25.6h102.4c14.08,0,25.6-11.52,25.6-25.6v-25.6H179.2V486.4z" />
                <path
                  d="M256,0C157.056,0,76.8,80.256,76.8,179.2c0,60.928,30.464,114.56,76.8,146.944V384c0,14.08,11.52,25.6,25.6,25.6h153.6
				c14.08,0,25.6-11.52,25.6-25.6v-57.856c46.336-32.384,76.8-86.016,76.8-146.944C435.2,80.256,354.944,0,256,0z M329.088,284.16
				L307.2,299.392V358.4H204.8v-58.88l-21.888-15.232C148.48,260.224,128,221.056,128,179.328c0-70.528,57.472-128,128-128
				s128,57.472,128,128C384,220.928,363.52,260.096,329.088,284.16z"
                />
              </g>
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </div>
      <div>
        {props.item.alternative.data.files ? (
          <AlternativeDataComponent
            altButton={clicked}
            id={props.item.id}
            item={props.item}
            alternativeUploading={alternativeUploading}
            closeWindow={CloseFromChild}
            data={props.item.alternative.data}
          />
        ) : (
          <AddAlternativeComponent
            hasAlternative={false}
            item={props.item}
            alternativeUploading={alternativeUploading}
            closeWindow={CloseFromChild}
          />
        )}
      </div>
    </div>
  );
}
