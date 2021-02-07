import React, { Fragment, useRef, useEffect } from "react";
import {
  alternativeUploadingReducer,
  getAlternativeUploadingRequest,
} from "../../Redux/Upload/Alternative/( a - r ) alternative";
import { useStore, useDispatch, useSelector } from "react-redux";

function AlternativeUploadForm(props) {
  const _altUploading = useSelector((state) => state.alternative_uploading);
  const { uploading, uploaded, failure } = _altUploading;
  const fileInput = useRef(null);
  const descInput = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {}, [_altUploading]);

  function handleSubmit(e) {
    e.preventDefault();
    let files = fileInput.current.files;

    if (files.length > 3) {
      return;
    }

    let alternative = {
      hasAlternative: props.hasAlternative,
      id: props.id,
      files,
      description: descInput.current.value,
    };
    dispatch(getAlternativeUploadingRequest(alternative));
  }

  return (
    <div className="alternative_uploading_block">
      {uploaded ? (
        <div className="form_notification">
          თქვენს მიერ მოწოდებული მასალა წარმატებით იქნა ატვირთული
        </div>
      ) : uploading ? (
        <div className="form_notification">მასალა იტვირთება ...</div>
      ) : failure ? (
        <div className="form_notification">შეფერხება, სცადეთ მოგვიანებით </div>
      ) : null}
      <form className="alternative_uploading_form" onSubmit={handleSubmit}>
        <ul>
          <li className="form_list-item">
            <div className="form_item_title">
              შეგიძლიათ ატვირთოთ ვიდეო ან ფოტო მასალა
            </div>
            <input
              ref={fileInput}
              name="alternativeFiles"
              type="file"
              multiple
            />
          </li>
          <li className="form_list-item">
            <div className="form_item_title">კომენტარი</div>
            <textarea
              ref={descInput}
              className="descriptionInput"
              placeholder="სურვილისამებრ დაურთეთ განმარტება"
              name="description"
            />
          </li>
          <li className="form_list-item">
            <input type="submit" value="დამატება" />
          </li>
        </ul>
      </form>
    </div>
  );
}

export function AddAlternativeComponent(props) {
  useEffect(() => {});

  function handleClick(e) {
    let answer = e.currentTarget.value;
    console.log(e.currentTarget.value);
    if (answer == "true") {
      props.closeWindow(answer);
    } else {
      props.closeWindow(answer);
      console.log(props.closeWindow, " child");
    }
  }

  return (
    <div>
      {props.alternativeUploading ? (
        <AlternativeUploadForm
          hasAlternative={props.hasAlternative}
          backButton={handleClick}
          id={props.item.id}
        />
      ) : (
        <div className="alternative_question_block">
          <span className="alternative_block-question">
            {" "}
            გსურთ შესთავაზოთ აზრი პრობლემის გადაწყვეტასთან დაკავშირებით ?{" "}
          </span>
          <div className="alternative_block-answer">
            <button onClick={handleClick} value={true}>
              დიახ
            </button>
            <button onClick={handleClick} value={false}>
              დაბრუნება
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
