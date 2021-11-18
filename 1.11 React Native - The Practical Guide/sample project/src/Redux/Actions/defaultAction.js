import { DEFAULT_TYPE } from "../Constants";

export const defaultAction = examplePayload => (
  {
    type: DEFAULT_TYPE,
    payload: examplePayload
  }
);