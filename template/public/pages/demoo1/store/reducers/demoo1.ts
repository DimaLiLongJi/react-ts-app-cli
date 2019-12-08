import { DEMOO1 } from '../actions/demoo1';

const defaultData = {
  status: 1,
};

export default (state: Typings.Demoo1State["demoo1"] = defaultData, action: Typings.Demoo1Actions): Typings.Demoo1State["demoo1"] => {
  switch (action.type) {
  case DEMOO1:
    return {
      ...state,
      status: action.status,
    };
    break;
  default:
    return state;
  }
};
