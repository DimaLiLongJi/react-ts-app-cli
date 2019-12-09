import { DEMO } from '../actions/demo';

const defaultData = {
  status: 1,
};

export default (state: Typings.DemoState["demo"] = defaultData, action: Typings.DemoActions): Typings.DemoState["demo"] => {
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
