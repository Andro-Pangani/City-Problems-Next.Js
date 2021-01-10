export const type = {
  getMainDataRequest: "GET_MAIN_DATA_REQUEST",
  getMainDataSuccess: "GET_MAIN_DATA_SUCCESS",
  getMainDataFailure: "GET_MAIN_DATA_FAILURE",
  getLastSnapshotRefresh: "GET_LAST_SNAPSHOT_REFRESH",
  getAdminRequest: "GET_ADMIN_REQUEST",
  getAdminSuccess: "GET_ADMIN_SUCCESS",
  getAdminReject: "GET_ADMIN_REJECT",
  Languages: {
    setLanguage_En: "SET_LANGUAGE_EN",
    setLanguage_Ge: "SET_LANGUAGE_GE",
    setLanguage_Ru: "SET_LANGUAGE_RU",
  },
  Scroll: {
    getContentRequest: "GET_SCROLL_CONTENT_REQUEST",
    getContentSuccess: "GET_SCROLL_CONTENT_SUCCESS",
  },
  Material: {
    getMaterialDataRequest: "GET_MATERIAL_DATA_REQUEST",
  },
  Map: {
    TempAddressClick: "TempAddressClick",
    TempAddressListRequest: "TempAddressListRequest",
    TempAddressListClear: "TempAddressListClear",
    getMapReferenceRequest: "GET_MAP_REFERENCE",
    setMarkersToStoreRequest: "SET_MARKERS_TO_STORE_REQUEST",
    getDataByMarker: "GET_DATA_BY_MARKER",
    setMapReferenceToState: "SET_MAP_REFERENCE_TO_STATE",
    getMapSetCenter: "GET_MAP_SET_CENTER",
    setAqiMarkersToStore: "SET_AQI_MARKERS_TO_STORE",
  },
  Alternative: {
    single: {
      approove: "ALTERNATIVE_SINGLE_APPROOVE",
      delete: "ALTERNATIVE_SINGLE_DELETE",
    },
  },
  Upload: {
    getUploadingSectionRequest: "GET_UPLOADING_SECTION_REQUEST",
    get_Uploading_Request: "GET_UPLOADING_REQUEST",
    get_Uploading_Success: "GET_UPLOADING_SUCCESS",
    get_Uploading_Failure: "GET_UPLOADING_FAILURE",
    startUploadingProcess: "UPLOADING_PROCESS",
    stopUploadingProcess: "STOP_UPLOADING_PROCESS",
    addNewAddress: "ADD_NEW_ADDRESS",
    clearNewItemAddress: "CLEAR_NEW_ITEM_ADDRESS",
    alternative: {
      getUploadingRequest: "GET_ALTERNATIVE_UPLOADING_REQUEST",
      getUploadingSuccess: "GET_ALTERNATIVE_UPLOADING_SUCCESS",
      getUploadingFailure: "GET_ALTERNATIVE_UPLOADING_FAILURE",
      getUploadingRefresh: "GET_ALTERNATIVE_UPLOADING_REFRESH",
    },
  },
  Delete: {
    refresh_Deleting_Process: "REFRESH_DELETING_PROCESS",

    get_Deletion_Request: "GET_DELETION_REQUEST",
    get_Deletion_Success: "GET_DELETION_SUCCESS",
    get_Deletion_Failure: "GET_DELETION_FAILURE",
  },

  Approove: {
    get_Approoving_Request: "GET_APPROOVING_REQUEST",
    get_Approoving_Success: "GET_APPROOVING_SUCCESS",
  },
  Verification: {
    get_Verification_Request: "GET_VERIFICATION_REQUEST",
  },

  Aqi: {
    get_Aqi_Request: "GET_AQI_REQUEST",
    get_Aqi_Success: "GET_AQI_SUCCESS",
    get_Aqi_Failure: "GET_AQI_FAILURE",

    Chart: {
      get_SetAqiChartData: "GET_AQI_CHART_REQUEST",
    },
    set_City_Data_Request: "set_City_Data_Request",
    set_City_Data_Success: "set_City_Data_Success",
    set_City_data_Failure: "set_City_Data_Failure",
  },
  Mobile: {
    Menu_Button_Clicked: "MOBILE_MENU_BUTTON_CLICKED",
    Set_Mobile_Menu_Tab_Index: "SET_MOBILE_MENU_TAB_INDEX",
    set_Mobile_Mode: "SET_MOBILE_MODE",
    nav_Item_Clicked: "MOBILE_NAV_ITEM_CLICKED",
    showOnMapClicked: "SHOW_ON_MAP_CLICKED",
    upload: {
      addressFromMap: "UPLOAD_ADDRESS_FROM_MAP",
    },
  },
};
