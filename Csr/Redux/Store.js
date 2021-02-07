import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import thunk from 'redux-thunk';
import { getMainData_middleware } from './middlewares/getMainData_middleware';
import { getAdmin_middleware } from './middlewares/checkAdmin_middleware';
import { uploadingMiddleware } from './middlewares/uploadingMiddleware';
import { getMainDataReducer } from './( a-r )getMainData';
import { getAdminReducer } from './( a - r )getAdmin';
import {
  uploadingProcessReducer,
  addNewAddressReducer,
  getUploadingSuccessReducer,
  getUploadingSectionRequestReducer,
  getUploadingFailureReducer,
} from './Upload/( a - r )upload';
import { mapTempAddressListReducer } from './Map/indexMap';
import { type } from './types';
import {
  aqiMarkersOnMapReducer,
  getMapReferenceReducer,
  setMapReferenceToState,
  setMarkersToStoreReducer,
} from './Map/A_R_getMapReference';
import { adminRoomMiddleware } from './middlewares/admin_room_middleware';
import { getAqiReducer, setAqiCityDataReducer } from './aqi/( a - r )getAqi';
import { getAqiMiddleware } from './middlewares/getAqiMiddleware';
import { setAqiCityDataMiddleware } from './middlewares/setAqiCityDataMiddleware';
import { setAqiChartDataReducer } from './aqi/( a - r )getAqiChart';
import { alternativeUploadingMiddleware } from './middlewares/alternativeUploadingMiddleware';
import { setMaterialDataReducer } from './Materials/( a - r )materials';
import { alternativeUploadingReducer } from './Upload/Alternative/( a - r ) alternative';
import {
  mobileMenuStateReducer,
  mobileModeReducr,
  mobileNavItemClickedReducer,
  showOnMapClickedReducer,
  uploadAddressFromMap,
} from './mobile/( a - r )mobileMenu';
import { MobileMenuReducer } from '../Components/content_section/reduxThunk/mobile/( a - r ) mobileMenu';
import { getDeletionReducer } from './AdminRoom/a - r _adminRoom';
import { setLanguagesReducer } from './languages/( a - r ) languages';
import { addAqiMarkersMiddleware } from './middlewares/add_aqi_markers_middleware';
import { alternativeButtonReducer } from './( a - r ) alternativeButton';
import { getUnverifiedDataReducer } from './( a - r ) getUnverifiedData';
import { getUnverifiedDataMiddleware } from './middlewares/get_unverified_data_middleware';
import { ContentScrollControllerReducer } from './domElements/( a - r ) ContentScrollController';

// ooo sorry for this andro 'll fix later
const getMapRefMiddleware = (store) => (next) => (action) => {
  if (action.type === type.Map.getMapReferenceRequest) {
    store.dispatch(setMapReferenceToState(action.payload));
  }
  return next(action);
};

export const store = createStore(
  combineReducers({
    mobile: combineReducers({
      menuButtonClicked: mobileMenuStateReducer,
      menuTabIndex: MobileMenuReducer,
      mobileMode: mobileModeReducr,
      navItemClicked: mobileNavItemClickedReducer,
      showOnMapClicked: showOnMapClickedReducer,
      uploadAddressFromMap: uploadAddressFromMap,
    }),
    main_data: getMainDataReducer,
    unverified_data: getUnverifiedDataReducer,
    material_data: setMaterialDataReducer,
    alternative_uploading: alternativeUploadingReducer,
    aqi: combineReducers({
      data: getAqiReducer,
      cityData: setAqiCityDataReducer,
      chartData: setAqiChartDataReducer,
    }),
    _a: getAdminReducer,
    upload: combineReducers({
      inUploadingSection: getUploadingSectionRequestReducer,
      uploading: uploadingProcessReducer,
      failure: getUploadingFailureReducer,
      uploaded: getUploadingSuccessReducer,
    }),
    deletion: getDeletionReducer,
    tempAddressList: mapTempAddressListReducer,
    new_item_address: addNewAddressReducer,
    map: combineReducers({
      mapRef: getMapReferenceReducer,
      markers: setMarkersToStoreReducer,
      aqiMarkers: aqiMarkersOnMapReducer,
    }),
    language: setLanguagesReducer,
    alternativeButtonState: alternativeButtonReducer,
    requestFromScroll: ContentScrollControllerReducer,
  }),
  compose(
    applyMiddleware(uploadingMiddleware),
    applyMiddleware(adminRoomMiddleware),
    applyMiddleware(alternativeUploadingMiddleware),
    applyMiddleware(getMainData_middleware),
    applyMiddleware(getUnverifiedDataMiddleware),
    applyMiddleware(getMapRefMiddleware),
    applyMiddleware(getAdmin_middleware),
    applyMiddleware(getAqiMiddleware),
    applyMiddleware(setAqiCityDataMiddleware),
    applyMiddleware(addAqiMarkersMiddleware),
    applyMiddleware(thunk)
  )
);

export const mainState = store.getState();

store.subscribe(() => {
  console.log(
    store.getState(),
    ' < < <   S T O R E  S U B S C R I B E   > > > '
  );
});

store.dispatch({ type: 'Test' });
