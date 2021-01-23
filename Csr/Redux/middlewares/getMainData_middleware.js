import { _url } from "../../_urls";
import { type } from "../types";
import { getMainDataSuccess } from "../( a-r )getMainData";
import { setMaterialDataRequest } from "../Materials/( a - r )materials";
import { getScrollContentSuccess } from "../scollContent/getScrollContent";

// : 3 TYPES OF REQUEST
// : 1. MAIN REQUEST. WITHOUT ANY PARAMETERS
// : 2. REQUEST FROM FACEBOOK WITH DOC ID
// : 3. REQUEST FROM SCROLL WITH LAST SNAPSHOT ID
//

// request url *
let url = _url.main;

export const getMainData_middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case type.getMainDataRequest:
      // Checking for Loading state >
      let isLoadingStore = store.getState().main_data.isLoading;

      // setup url with query parameters
      if (action.payload) {
        url = `${_url.main}?lastSnapshot=${action.payload.lastSnapshot}&isLoading=${action.payload.isLoading}&length=${action.payload.length}&empty=${action.payload.empty}`;
      }

      if (isLoadingStore == false) {
        fetch(url, { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            store.dispatch(getMainDataSuccess(data));

            let main_data = store.getState().main_data;
            let isLoading = main_data.isLoading;
            let isError = main_data.isError;

            // SETUP - SINGLE CASE FROM FACEBOOK

            let docId = action.payload.docId;

            if (docId) {
              console.log("######### ACTION PAYLOAD DOC ID ### ", docId);

              // FIND DOCUMENT WITH CURRENT DOC ID
              let single_document = null;
              main_data.content.map((item) => {
                if (docId === item.id) {
                  single_document = item;
                }
              });

              if (single_document) {
                store.dispatch(
                  setMaterialDataRequest({
                    data: [single_document],
                    isLoading,
                    isError,
                  })
                );
              } else {
              }
            } else {
              // SETS VISIBLE CONTENT
              store.dispatch(
                setMaterialDataRequest({
                  data: main_data.content,
                  isLoading,
                  isError,
                })
              );
            }
          })

          .catch((err) => {
            console.log(
              "<<< ERROR Main Data Request",
              err,
              "<<< ERROR !!!! >>>"
            );
          });
      }
      break;
    case type.Scroll.getContentRequest:
      url = _url.main;
      // isLoadingStore = store.getState().main_data.isLoading;

      if (action.payload) {
        url = `${_url.main}?lastSnapshot=${action.payload.lastSnapshot}&isLoading=${action.payload.isLoading}&length=${action.payload.length}&docId=${action.payload.docId}`;
      }

      if (store.getState().main_data.isLoading == false) {
        fetch(url, { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            store.dispatch(getScrollContentSuccess(data));
            let main_data = store.getState().main_data;
            let isLoading = main_data.isLoading;
            let isError = main_data.isError;

            store.dispatch(
              setMaterialDataRequest({
                data: main_data.content,
                isLoading,
                isError,
              })
            );
          })

          .catch((err) => {
            console.log(
              "<<< ERROR GET SCROLL CONTENT Request",
              err,
              "<<< ERROR @@@@@ >>>"
            );
          });
      }
      break;
    default:
      break;
  }

  return next(action);
};
