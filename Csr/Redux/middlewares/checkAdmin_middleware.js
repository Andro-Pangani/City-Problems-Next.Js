import { type } from "../types";
import { getAdminSuccess, getAdminReject } from "../( a - r )getAdmin";
import { _url } from "../../_urls";

export const getAdmin_middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case type.getAdminRequest:
      fetch(_url.admin, { method: "GET" })
        .then((res) => res)
        .then((data) => {
          console.log(data, " admin data response");
          store.dispatch(getAdminSuccess(data));
        });
    default:
      break;
  }
  return next(action);
};
