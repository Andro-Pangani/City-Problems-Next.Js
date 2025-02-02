import { useEffect, useState } from "react";

export const AlternativeButton = ({ clickedStatus, clickedState }) => {
  const handleClick = () => {
    clickedStatus(!clickedState);
  };

  return (
    <div onClick={handleClick} className="alternative_button">
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
  );
};
