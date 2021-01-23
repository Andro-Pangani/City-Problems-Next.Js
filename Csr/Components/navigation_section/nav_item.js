import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMaterialDataRequest } from "../../Redux/Materials/( a - r )materials";
import {
  getMobileMenuClicked,
  setMobileNavItemClicked,
} from "../../Redux/mobile/( a - r )mobileMenu";
import {
  getUploadingSectionRequest,
  stopUploadingProcess,
} from "../../Redux/Upload/( a - r )upload";
import { setMobileTabIndex } from "../content_section/reduxThunk/mobile/( a - r ) mobileMenu";
import { navItemStyle } from "./headerJsxStyles";

export function NavItem(props) {
  const [active, setActive] = useState(false);
  const isLoading = useSelector((state) => state.main_data.isLoading);
  const isError = useSelector((state) => state.main_data.isError);
  const mobileMode = useSelector((state) => state.mobile.mobileMode);

  const dispatch = useDispatch();

  const inUploadingSection = useSelector(
    (state) => state.upload.inUploadingSection
  );

  const mobileMenuClicked = useSelector(
    (state) => state.mobile.menuButtonClicked
  );

  useEffect(() => {
    if (props.nowActive === props.type) {
      setActive(true);
    } else if (active) {
      setActive(false);
    }
  }, [props]);

  function handleClick() {
    props.updateActive(props.type);
    // if uploading section is open, close uploading section
    if (inUploadingSection) dispatch(getUploadingSectionRequest(false));
    // set Content
    dispatch(
      setMaterialDataRequest({
        data: props.data,
        isLoading,
        isError,
      })
    );
    if (mobileMenuClicked) dispatch(getMobileMenuClicked(false));

    if (mobileMode) {
      dispatch(setMobileTabIndex(0));
      dispatch(setMobileNavItemClicked(true));
    }
  }

  return (
    <span
      className="nav_item-title"
      onClick={handleClick}
      style={navItemStyle(active, props.lang)}
    >
      <span className="nav_item-type">{props.type}</span>
      {props.data ? (
        <span className="item_count">{props.data.length}</span>
      ) : null}
    </span>
  );
}
