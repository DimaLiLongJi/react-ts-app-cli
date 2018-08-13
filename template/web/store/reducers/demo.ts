import { DEMO } from '../actions/demo';

const defaultData = {
  status: 1,
};

export default (state: CFTypings.StoreState["demo"] = defaultData, action: CFTypings.DemoAction): CFTypings.StoreState["demo"] => {
  switch (action.type) {
  case DEMO:
    return {
      ...state,
      status: action.status,
    };
    break;
  default:
    return state;
  }
};
