import { type } from "../types";
import { _url } from "../../_urls";

import { mapTempAddressListClear } from "../Map/A_R_mapTempAddressList";
import {
  getMainDataRequestPush,
  getMainDataSuccess,
} from "../../Redux/( a-r )getMainData";
import {
  getUploadingFailure,
  getUploadingSuccess,
  stopUploadingProcess,
} from "../Upload/( a - r )upload";
import { setMaterialDataRequest } from "../Materials/( a - r )materials";
export const uploadingMiddleware = (store) => (next) => (action) => {
  if (action.type === type.Upload.get_Uploading_Request) {
    let payload = action.payload;
    let files = payload.files;

    let formData = undefined;
    if (files[0]) {
      formData = new FormData();
      // console.log(files, files.length, " < < < <  files ");

      for (let i = 0; i < files.length; i++) {
        let fileName = files[i].name;
        formData.append(`MyFile`, files[i]);
        console.log(files[i], " props in obj -> []", i);
      }

      formData.append("description", payload.description);
      formData.append("type", payload.type);
      formData.append("address", payload.address);
      formData.append("latitude", payload.latitude);
      formData.append("longitude", payload.longitude);
      console.log(formData.get("type"), "-> 9 < -  -  formdata");
    }

    let options1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "joni" }),
    };

    let options = {
      method: "PUT",
      "Content-Type": "multipart/form-data",
      body: formData,
    };

    (async () => {
      try {
        const response = await fetch(_url.upload.case, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log("yea", result, result.body);
        store.dispatch(getUploadingSuccess(true));

        (async () => {
          await setTimeout(() => {
            store.dispatch(stopUploadingProcess());
            let {
              content,
              isLoading,
              lastSnapshot,
              isError,
            } = store.getState().main_data;
            store.dispatch(
              getMainDataRequestPush({
                content: [...result.content, ...content],
                isLoading: isLoading,
                lastSnapshot: payload.lastSnapshot,
                fromScroll: null,
              })
            );
          }, 3000);
        })();

        // clear temp address list
      } catch (error) {
        // hiding uploading ... window
        // opening error Window
        store.dispatch(stopUploadingProcess());
        store.dispatch(getUploadingFailure(true));

        setTimeout(() => {
          // hide error window after 2 secs
          store.dispatch(getUploadingFailure(false));
        }, 2000);

        console.error(" Error from Uploading Middleware - ", error);
      }
    })();
  }
  return next(action);
};
