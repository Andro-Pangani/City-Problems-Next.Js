import React from "react";
import { useDispatch } from "react-redux";
import { setMobileShowOnMapClicked } from "../../../Redux/mobile/( a - r )mobileMenu";
import { setMobileTabIndex } from "../reduxThunk/mobile/( a - r ) mobileMenu";

export const ShowOnMapComponent = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setMobileShowOnMapClicked(true));
    dispatch(setMobileTabIndex(2));

    // centers Google's Map
    props.handleClick();
  };

  return (
    <svg
      onClick={handleClick}
      version="1.1"
      id="Capa_1"
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
            d="M205.36,208.221c-6.252-10.061-11.261-20.752-15.002-31.842v162.838l52.446-89.906
C227.996,238.083,215.286,224.192,205.36,208.221z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M334.769,4.923c-67.748,0-122.866,55.118-122.866,122.866c0,9.476,1.115,18.783,3.212,27.78
c0.047,0.204,0.095,0.409,0.143,0.612c0.233,0.98,0.479,1.956,0.736,2.928c0.051,0.192,0.103,0.384,0.156,0.575
c1.145,4.245,2.514,8.411,4.097,12.485c0.07,0.179,0.137,0.359,0.208,0.539c0.353,0.895,0.718,1.785,1.091,2.67
c0.11,0.263,0.222,0.525,0.335,0.787c0.373,0.868,0.752,1.733,1.145,2.592c0.101,0.223,0.207,0.443,0.31,0.665
c1.305,2.811,2.713,5.57,4.223,8.272c0.11,0.198,0.217,0.397,0.328,0.595c0.425,0.752,0.865,1.496,1.307,2.238
c0.21,0.352,0.418,0.705,0.631,1.055c0.425,0.699,0.857,1.393,1.296,2.083c0.24,0.379,0.485,0.755,0.731,1.131
c0.439,0.675,0.88,1.349,1.332,2.016c0.244,0.359,0.496,0.715,0.744,1.071c0.929,1.336,1.881,2.654,2.861,3.953
c0.202,0.268,0.399,0.542,0.603,0.807c0.436,0.568,0.885,1.126,1.332,1.688c0.357,0.449,0.713,0.899,1.077,1.344
c0.435,0.531,0.876,1.056,1.32,1.579c0.397,0.469,0.797,0.933,1.2,1.396c0.434,0.498,0.871,0.994,1.313,1.485
c0.446,0.494,0.9,0.983,1.354,1.47c0.418,0.449,0.833,0.901,1.258,1.344c0.664,0.692,1.341,1.373,2.021,2.05
c0.481,0.479,0.969,0.952,1.458,1.423c0.632,0.609,1.266,1.214,1.911,1.81c0.401,0.369,0.808,0.731,1.214,1.094
c0.573,0.514,1.148,1.025,1.731,1.528c0.419,0.362,0.842,0.721,1.266,1.077c0.604,0.507,1.213,1.007,1.826,1.504
c0.405,0.328,0.809,0.657,1.219,0.979c0.729,0.574,1.468,1.136,2.21,1.695c0.302,0.226,0.599,0.46,0.903,0.684
c1.04,0.766,2.093,1.516,3.16,2.251c0.307,0.212,0.62,0.415,0.929,0.623c0.789,0.533,1.581,1.059,2.384,1.575
c0.404,0.259,0.812,0.513,1.219,0.768c0.734,0.459,1.472,0.912,2.217,1.356c0.419,0.25,0.84,0.499,1.262,0.745
c0.789,0.458,1.585,0.904,2.386,1.345c0.373,0.206,0.743,0.414,1.119,0.616c1.174,0.631,2.357,1.249,3.556,1.843l21.309,32.854
L320,299.218l2.379,3.668c2.723,4.198,7.387,6.732,12.39,6.732c5.004,0,9.667-2.533,12.39-6.732l2.379-3.668l1.41-2.174
l16.873-26.013l21.48-33.115c1.202-0.596,2.389-1.215,3.564-1.847c0.378-0.203,0.75-0.415,1.126-0.621
c0.799-0.44,1.592-0.885,2.379-1.342c0.43-0.249,0.857-0.503,1.283-0.758c0.736-0.439,1.465-0.885,2.19-1.339
c0.419-0.263,0.84-0.525,1.255-0.792c0.764-0.491,1.52-0.995,2.272-1.502c0.351-0.236,0.706-0.468,1.054-0.708
c1.064-0.735,2.117-1.482,3.155-2.247c0.276-0.204,0.544-0.416,0.817-0.62c0.771-0.579,1.538-1.162,2.293-1.758
c0.422-0.333,0.837-0.672,1.254-1.011c0.598-0.483,1.191-0.97,1.779-1.464c0.447-0.376,0.89-0.755,1.331-1.137
c0.545-0.473,1.086-0.951,1.624-1.434c0.446-0.401,0.893-0.8,1.333-1.206c0.531-0.49,1.053-0.99,1.573-1.49
c0.422-0.405,0.851-0.804,1.267-1.214c0.849-0.836,1.686-1.684,2.509-2.543c0.476-0.496,0.938-1.004,1.405-1.508
c0.401-0.432,0.803-0.864,1.198-1.302c0.488-0.542,0.967-1.091,1.444-1.641c0.352-0.405,0.702-0.81,1.048-1.219
c0.492-0.581,0.979-1.166,1.459-1.756c0.303-0.372,0.602-0.747,0.9-1.123c0.504-0.634,1.007-1.268,1.5-1.911
c0.19-0.249,0.374-0.503,0.563-0.753c1.823-2.424,3.555-4.913,5.194-7.463c0.138-0.216,0.279-0.428,0.415-0.645
c0.507-0.799,1.001-1.606,1.49-2.417c0.145-0.24,0.288-0.481,0.431-0.721c0.496-0.837,0.984-1.678,1.46-2.526
c0.088-0.156,0.172-0.313,0.259-0.469c2.186-3.932,4.158-7.984,5.906-12.143c0.015-0.035,0.031-0.071,0.045-0.106
c0.432-1.031,0.849-2.068,1.252-3.11c0.028-0.07,0.054-0.141,0.082-0.211c2.501-6.491,4.46-13.214,5.837-20.11
c0-0.001,0.001-0.003,0.001-0.004c1.557-7.802,2.384-15.816,2.384-23.956C457.635,60.041,402.519,4.923,334.769,4.923z
M334.769,194.501c-36.784,0-66.712-29.927-66.712-66.712c0-36.785,29.927-66.713,66.712-66.713s66.712,29.927,66.712,66.713
C401.481,164.574,371.553,194.501,334.769,194.501z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M500.744,162.886l-16.77-4.107c-3.626,17.415-10.291,34.149-19.796,49.443c-13.505,21.729-32.148,39.63-54.247,52.172
l-22.456,34.62l52.749,64.371H512V177.231C512,170.427,507.352,164.504,500.744,162.886z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M18.282,123.501c-4.403-1.079-9.061-0.075-12.631,2.725C2.084,129.027,0,133.311,0,137.846v142.769h78.769
c3.96,0,7.754,1.59,10.53,4.414l71.521,72.733V158.408L18.282,123.501z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M297.597,318.959l-31.259-48.19h-1.856l-74.124,127.07v106.058L320,472.148v-135.53
C310.92,333.417,303.013,327.309,297.597,318.959z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M433.23,388.923c-4.425,0-8.617-1.985-11.423-5.409l-51.257-62.551c-5.338,7.325-12.677,12.717-21.012,15.653v134.726
l144.179,35.309c1.163,0.285,2.34,0.424,3.512,0.424c3.273,0,6.492-1.088,9.119-3.15c3.568-2.8,5.652-7.083,5.652-11.619V388.923
H433.23z"
          />
        </g>
      </g>
      <g>
        <g>
          <path d="M72.579,310.154H0v142.769c0,6.804,4.647,12.727,11.256,14.345l149.564,36.628V399.891L72.579,310.154z" />
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
  );
};