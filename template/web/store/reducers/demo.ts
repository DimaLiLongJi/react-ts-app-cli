import { DEMO } from '../actions/demo';

const defaultData = {
  status: 1,
};

export default (state: Typings.StoreState["demo"] = defaultData, action: Typings.DemoActions): Typings.StoreState["demo"] => {
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
