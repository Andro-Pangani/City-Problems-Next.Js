import React, { useEffect, useRef, useState } from "react";
import "./content.scss";
import { connect, useDispatch } from "react-redux";
import { Case } from "./case";
import { getMainDataRequest } from "../../Redux/( a-r )getMainData";
import { getScrollContentRequest } from "../../Redux/scollContent/getScrollContent";

function Content(props) {
  const contentSectionRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setData] = useState(props.data);
  const [isLoading, setLoading] = useState(props.isLoading);
  const [isError, setError] = useState(props.isError);
  let send = false;

  useEffect(() => {
    if (data !== props.data) {
      setData(props.data);
    }

    if (isLoading !== props.isLoading) {
      setLoading(props.isLoading);
    }

    if (isError !== props.isError) {
      setError(props.isError);
    }


  });

  const centerMap = (val) => {
   
    if (val && typeof val.lng === "number") {
      if (props.mapReference) {
        props.mapReference.setCenter(val);
      }
    }
  };

  const handleScroll = () => {
    let content = contentSectionRef.current;
    let bounding = content.getBoundingClientRect();
    let scrollEnd = content.scrollHeight - bounding.height - 5;

    if (isLoading === false) {
     
      if (content.scrollTop >= scrollEnd) {
        if (send == false) {
          dispatch(
            getScrollContentRequest({
              lastSnapshot: props.lastSnapshot,
              isLoading: props.isLoading,
              fromScroll: true,
            })
          );

          send = true;

          return;
        }
      }
    }
  };

  return (
    <section
      onScroll={handleScroll}
      ref={contentSectionRef}
      className="content_section"
    >
      {isLoading ? (
        <div className="isLoading_container">
          <div className="isLoading">
            <div className="isLoading-text">loading ...</div>
          </div>
        </div>
      ) : isError ? (
        <div>is error !</div>
      ) : data ? (
        data.map((item, index) => {
          return <Case centerMap={centerMap} key={index} item={item} />;
        })
      ) : (
        <div>no data</div>
      )}
    </section>
  );
}

const dispatchToProps = {
  getMainDataRequest,
};

const stateToProps = (state) => {
  return {
    mapReference: state.map.mapRef,
    isLoading: state.main_data.isLoading,
    isError: state.main_data.isError,
    data: state.material_data.data,
    lastSnapshot: state.main_data.lastSnapshot,
  };
};

export default connect(stateToProps, dispatchToProps)(Content);