import { type } from "./types";

export const lastSnapshotRefresh = (payload) => {
  return {
    type: type.getLastSnapshotRefresh,
    payload,
  };
};
