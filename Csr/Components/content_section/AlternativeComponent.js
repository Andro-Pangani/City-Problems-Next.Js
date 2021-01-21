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
    if (props.clickedState !== clicked) {
      setClicked(props.clickedState);
    }
    console.log("3333333 alt Component Updated", props.clickedState, clicked);
    //clicked
    if (clicked && !window_opened) {
      OpenAltWindow();
    }
    //clicked
    if (window_opened && !clicked) {
      CloseAltWindow();
    }
  });

  function handleClick(props) {
    setClicked(!clicked);
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
      props.clickedStatus(false);
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
      <div>
        {props.item.alternative.data.files ? (
          <AlternativeDataComponent
            // clickedStatus={props.clickedStatus}
            // clickedState={props.clickedState}
            altButton={clicked}
            id={props.item.id}
            item={props.item}
            alternativeUploading={alternativeUploading}
            closeWindow={CloseFromChild}
            data={props.item.alternative.data}
          />
        ) : (
          <AddAlternativeComponent
            // clickedStatus={props.clickedStatus}
            // clickedState={props.clickedState}
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
