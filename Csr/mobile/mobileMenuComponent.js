import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setMobileTabIndex } from "../Components/content_section/reduxThunk/mobile/( a - r ) mobileMenu";
import { setMaterialDataRequest } from "../Redux/Materials/( a - r )materials";
import {
  getMobileMenuClicked,
  setMobileMode,
} from "../Redux/mobile/( a - r )mobileMenu";
import { getUploadingSectionRequest } from "../Redux/Upload/( a - r )upload";
import { MobileHomeComponent } from "./Home_component";
import { MapMobMenuItem } from "./Map_component";
import { O2Component } from "./O2_component";

function MobileMenu(props) {
  const isLoading = useSelector((state) => state.main_data.isLoading);
  const isError = useSelector((state) => state.main_data.isError);
  const data = useSelector((state) => state.main_data.content);
  const inUploadingSection = useSelector(
    (state) => state.upload.inUploadingSection
  );
  const _mMenuState = useSelector((state) => state.mobile.menuButtonClicked);
  const showOnMapClicked = useSelector(
    (state) => state.mobile.showOnMapClicked
  );

  const dispatch = useDispatch();
  const mobileMenuRef = useRef(null);
  const MenuClickHandler = () => {
    dispatch(getMobileMenuClicked(!_mMenuState));
  };

  useEffect(() => {
    let width = mobileMenuRef.current.getBoundingClientRect().width;

    if (width <= 850) {
      //  SET MOBILE MODE ON
      dispatch(setMobileMode());
    }
  });

  const menuItemClick = (e) => {
    let mobSectionIndex = e.currentTarget.value;
    // ? e.target.value
    // : e.currentTarget.value
    // ? e.currentTarget.value
    // : 0;
    console.log(mobSectionIndex);

    // -translates body
    //     -----
    props.setIndex(mobSectionIndex);
    dispatch(getMobileMenuClicked(false));

    dispatch(setMobileTabIndex(mobSectionIndex));

    // if Clicked ITEM is not uploading BUTTON
    if (mobSectionIndex === 0) {
      // -if uploading section is open, 
      // -close uploading section
      if (inUploadingSection) {
        // closes uploading section
        dispatch(getUploadingSectionRequest(false));
      }

      // set all data to content
      dispatch(
        setMaterialDataRequest({
          data: data,
          isLoading,
          isError,
        })
      );
    }
  };

  return (
    <section ref={mobileMenuRef} className="mobileMenu">
      <ul className="mobileMenuList">
        <li
          onClick={menuItemClick}
          value={0}
          className="mobileMenuItem mCases unselectable"
        >
          <MobileHomeComponent />
        </li>
        <li onClick={menuItemClick} value={1} className="mobileMenuItem mAqi">
          <O2Component />
        </li>
        <li onClick={menuItemClick} value={2} className="mobileMenuItem mMap">
          <MapMobMenuItem />
        </li>
        <li onClick={MenuClickHandler} className="mobileMenuItem mMenu ">
          <span className="mMenuText unselectable">menu</span>
        </li>
      </ul>
    </section>
  );
}

const stateToProps = (state) => ({
  _mMenuButtonState: state.mobile.MenuButtonClicked,
});
export const MobileMenuComponent = connect(stateToProps, null)(MobileMenu);
