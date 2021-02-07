import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnverifiedDataRequest } from "../../Redux/( a - r ) getUnverifiedData";
import { LanguagesComponent } from "./languagesComponent.tsx";

export const HeaderMenuButton = () => {
  const [clicked, setClicked] = useState(false);
  const logged = useSelector((state) => state.main_data.logged);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setClicked(!clicked);
    e.stopPropagation();
  };

  const unverifiedRequestHandler = () => {
    dispatch(getUnverifiedDataRequest());
  };

  return (
    <>
      <div className="header_admin_menu" onClick={handleClick}>
        <div className="admin_menu_button">---</div>
      </div>
      {clicked ? (
        <>
          <div className="admin_menu_button-content">
            <LanguagesComponent />
            <div className="unverified_container">
              {logged ? (
                <button
                  className="unverified_button"
                  onClick={unverifiedRequestHandler}
                >
                  Show <span className="unverified_text">unfverified</span>
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
