import { type } from "../types";
import { _url } from "../../_urls";
import {
  getMainDataRequest,
  getMainDataSuccess,
  getMainDataRequestPush,
} from "../( a-r )getMainData";
import {
  getDeletionFailure,
  getDeletionSuccess,
} from "../AdminRoom/a - r _adminRoom";
import { setMaterialDataRequest } from "../Materials/( a - r )materials";

export const adminRoomMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case type.Delete.get_Deletion_Request:
      console.log(" DELETION ", action.payload, " => ", action.type);
      let coords = action.payload.coords;
      (async () => {
        try {
          const res = await fetch(_url.delete, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(action.payload),
          });

          let result = await res.json();
          if (result.deleted == true) {
            store.dispatch(getDeletionSuccess());
          } else if (result.deleted == false) {
            store.dispatch(getDeletionFailure());
          }

          let dataAfterDeletion = store.getState().main_data;
          dataAfterDeletion.content = dataAfterDeletion.content.filter(
            (item) => item.id !== action.payload.docId
          );

          store.dispatch(getDeletionSuccess());

          store.dispatch(
            getMainDataRequestPush({
              content: dataAfterDeletion.content,
              lastSnapshot: dataAfterDeletion.lastSnapshot,
            })
          );
          store.dispatch(
            setMaterialDataRequest({
              data: dataAfterDeletion.content,
              isLoading: false,
              isError: false,
            })
          );

          // = = =  =  MARKERS DELETION =  = = =
          let tempStore = store.getState();
          let mapTag = tempStore.mapRef;
          let markers = tempStore.map.markers;

          if (window.google) {
            markers.map((marker) => {
              if (
                marker.position.lat() === coords.lat &&
                marker.position.lng() === coords.lng
              ) {
                marker.setMap(null);
              }
            });
          }

          console.log(
            result,
            " - - - - -  result after deleting - - - - - - - - -"
          );

          //getting updated data
        } catch (error) {
          console.error(" Error FROM DELETION - ", error);
        }
      })();
      break;
    case type.Verification.get_Verification_Request:
      console.log(action.payload, " => ", action.type);
      break;
    case type.Approove.get_Approoving_Request:
      (async () => {
        try {
          const res = await fetch(_url.approove, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(action.payload),
          });

          let result = await res;

          // filtering store data

          store.dispatch(getMainDataRequest());
          console.log(res, " result after Approoving ");
        } catch (error) {
          console.error(" Error - ", error);
        }
      })();

      break;
    default:
      break;
  }

  return next(action);
};
