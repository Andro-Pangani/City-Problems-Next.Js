import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainDataRequest } from "../Redux/( a-r )getMainData";

export function ReloadButtonComponent(props) {
  const dispatch = useDispatch();
  const { isLoading, lastSnapshot } = useSelector((state) => state.main_data);

  const handleClick = () => {
    dispatch(
      getMainDataRequest({
        isLoading: isLoading,
        lastSnapshot: null,
        fromScroll: null,
      })
    );
  };

  return (
    <div onClick={handleClick} className="reloadButtonSvg">
      <svg
        version="1.1"
        id="reloadButton"
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
            <path
              d="M463.702,162.655L442.491,14.164c-1.744-12.174-16.707-17.233-25.459-8.481l-30.894,30.894
			C346.411,12.612,301.309,0,254.932,0C115.464,0,3.491,109.16,0.005,248.511c-0.19,7.617,5.347,14.15,12.876,15.234l59.941,8.569
			c8.936,1.304,17.249-5.712,17.125-15.058C88.704,165.286,162.986,90,254.932,90c22.265,0,44.267,4.526,64.6,13.183l-29.78,29.78
			c-8.697,8.697-3.761,23.706,8.481,25.459l148.491,21.211C456.508,181.108,465.105,172.599,463.702,162.655z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M499.117,249.412l-59.897-8.555c-7.738-0.98-17.124,5.651-17.124,16.143c0,90.981-74.019,165-165,165
			c-22.148,0-44.048-4.482-64.306-13.052l28.828-28.828c8.697-8.697,3.761-23.706-8.481-25.459L64.646,333.435
			c-9.753-1.393-18.39,6.971-16.978,16.978l21.21,148.492c1.746,12.187,16.696,17.212,25.459,8.481l31.641-31.626
			C165.514,499.505,210.587,512,257.096,512c138.794,0,250.752-108.618,254.897-247.28
			C512.213,257.088,506.676,250.496,499.117,249.412z"
            />
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
  );
}
