import React, { useEffect, useState, Fragment } from "react";
import { ImageTag } from "./image_data";
import { VideoTag } from "./video_data";
import {
  AlternativeItemAdd,
  AlternativeItemApproove,
  AlternativeItemDelete,
} from "./alternativeTools";
import { AddAlternativeComponent } from "./AddAlternativeComponent";

export function AlternativeDataComponent(props) {
  const [data] = useState(props.data);
  const [addButtonClicked, changeAddButtonState] = useState(false);
  const [altButton, setAltButton] = useState(props.altButton);
  const [listLength, setListLength] = useState(props.data.files.length);
  const [fileIndex, setFileIndex] = useState(1);
  const [x, setX] = useState(0);

  const liRef = React.createRef();

  function changeX(value) {
    if (listLength == 1) {
      setX(0);
      setListLength(props.data.files.length);
      setFileIndex(1);
    } else {
      setX(x + value);
      setListLength(listLength - 1);
      setFileIndex(fileIndex + 1);
    }
  }

  function handleClick(e) {
    if (e.target.className === "main_image_tag") {
      let bounding = liRef.current.getBoundingClientRect();
      changeX(bounding.width);
    }
  }

  function AddHandleClick() {
    changeAddButtonState(!addButtonClicked);
  }

  useEffect(() => {
    setAltButton(props.altButton);

    if (!props.altButton) {
      setX(0);
      setListLength(props.data.files.length);
    }
  }, [props.altButton]);

  return (
    <ul className="alternativeDataBlock">
      <li className="altSectionHeader">
        <div className="alternativeDataHeader">
          <div className="alternativeDataTitle">Alternative</div>
          <div className="fileQuantity">
            {fileIndex}/{props.data.files.length}
          </div>
        </div>
        <div className="addYourAlternative" onClick={AddHandleClick}>
          {addButtonClicked ? "Back" : "Add"}
        </div>
      </li>
      <li className="altSectionContent">
        <ul
          onClick={handleClick}
          className="data_list"
          style={{
            transform: addButtonClicked
              ? `translateX(-${0}px)`
              : `translateX(-${x}px)`,
          }}
        >
          {addButtonClicked ? (
            <li className="data_list_item">
              <AddAlternativeComponent
                hasAlternative={true}
                // 1. alternative section open/close mechanism functions
                // 2. item with all props
                item={props.item}
                alternativeUploading={props.alternativeUploading}
                closeWindow={props.closeWindow}
              />
            </li>
          ) : (
            data.files.map((item, index) => {
              return (
                <li key={index} className="data_list_item" ref={liRef}>
                  {item.type === "image" ? (
                    <AltImage id={props.id} item={item} />
                  ) : item.type === "video" ? (
                    <AltVideo id={props.id} item={item} />
                  ) : null}
                </li>
              );
            })
          )}
        </ul>
      </li>
    </ul>
  );
}

function AltImage(props) {
  return (
    <Fragment>
      <div className="alternativeToolsSection">
        <ImageTag link={props.item.link} />
        <ul className="altToolsList">
          {!props.item.approoved ? (
            <li className="altToolsItem">
              <AlternativeItemApproove id={props.id} item={props.item} />
            </li>
          ) : null}
          <li className="altToolsItem">
            <AlternativeItemDelete id={props.id} item={props.item} />
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

function AltVideo(props) {
  return (
    <Fragment>
      <div className="alternativeToolsSection">
        <VideoTag link={props.item.link} />
        <ul className="altToolsList">
          {!props.item.approved ? (
            <li className="altToolsItem">
              <AlternativeItemApproove id={props.id} item={props.item} />
            </li>
          ) : null}
          <li className="altToolsItem">
            <AlternativeItemDelete id={props.id} item={props.item} />
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
