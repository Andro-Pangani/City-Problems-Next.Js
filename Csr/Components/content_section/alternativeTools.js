import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAlternativeUploadingRefresh } from "../../Redux/Upload/Alternative/( a - r ) alternative";
import tools from "./reduxThunk/alternativeSingle";

export function AlternativeItemApproove(props) {
  const [approoveState, setApprooveState] = useState(false);

  async function handleClick() {
    let res = await tools.altSingleApproove({
      id: props.id,

      fileId: props.item.fileId,
    });

    if (res.status == 200) {
      setApprooveState(true);
    }
  }

  return (
    <div className="alternativeItemApproove">
      <button onClick={handleClick} className="alternativeItemButton-approove">
        {approoveState ? "Approoved" : "Approove"}
      </button>
    </div>
  );
}

export function AlternativeItemDelete(props) {
  const [deleteState, setDeleteState] = useState(false);
  const dispatch = useDispatch();

  async function handleClick() {
    let res = await tools.altSingleDelete({
      docId: props.id,
      fileId: props.item.fileId,

      filename: props.item.filename,
    });

    if (res.status == 200) {
      setDeleteState(true);
      dispatch(getAlternativeUploadingRefresh());
    }
  }

  return (
    <div className="alternativeItemDelete">
      <button onClick={handleClick} className="alternativeItemButton-delete">
        {deleteState ? "Deleted" : "Delete"}
      </button>
    </div>
  );
}

export function AlternativeItemAdd(props) {
  return (
    <div className="alternativeItemAdd">
      <button className="alternativeItem-add">Add+</button>
    </div>
  );
}
