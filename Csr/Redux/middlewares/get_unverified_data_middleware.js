import { getUnverifiedDataSuccess } from "../( a - r ) getUnverifiedData";
import { _url } from "../../_urls";
import { setMaterialDataRequest } from "../Materials/( a - r )materials";
import { type } from "../types";

export const getUnverifiedDataMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case type.getUnverified.DataRequest:
      let { logged, isLoading, isError } = store.getState().main_data.logged;
      console.log("from unverified data request ");
      fetch(`${_url.getUnverified}?logged=${logged}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("################ from Unverified request ", data);

          store.dispatch(getUnverifiedDataSuccess(data.content));

          store.dispatch(
            setMaterialDataRequest({
              data: data.content,
              isLoading,
              isError,
            })
          );
        });

      break;

    default:
      break;
  }

  next(action);
};
