import { type } from "../types";
import { _url } from "../../_urls";
import { getMainDataRequest } from "../../Redux/( a-r )getMainData";
import {
  getAlternativeUploadingRefresh,
  getAlternativeUploadingSuccess,
} from "../Upload/Alternative/( a - r ) alternative";

export const alternativeUploadingMiddleware = (store) => (next) => (action) => {
  if (action.type === type.Upload.alternative.getUploadingRequest) {
    let files = action.payload.files;
    let description = action.payload.description;

    let formData = undefined;
    if (files[0] || description) {
      formData = new FormData();

      if (files[0]) {
        for (let i = 0; i < files.length; i++) {
          let fileName = files[i].name;
          formData.append(`MyFile`, files[i]);
          console.log(files[i], " props in obj -> []", i);
        }

        formData.append("description", description);
        formData.append("id", action.payload.id);
        formData.append("hasAlternative", action.payload.hasAlternative);
        console.log(
          formData,
          "<<<<<<<<< form data from alternativeMiddleware >>>>>>>>>>>>>>"
        );
        (async () => {
          try {
            const response = await fetch(_url.alternative.upload, {
              method: "POST",
              body: formData,
            });

            const result = await response;
            store.dispatch(getAlternativeUploadingSuccess());
            (async () => {
              await setTimeout(() => {
                store.dispatch(getAlternativeUploadingRefresh());
                store.dispatch(getMainDataRequest());
              }, 5000);
            })();

            // clear temp address list
            console.log("yea", result);
            if (result.status == 200) {
            } else {
              console.log("smth wrong ");
            }
            console.log(formData, " < alternative");
          } catch (error) {
            console.error(" Error - ", error);
          }
        })();
      }
    }
  }
  return next(action);
};
