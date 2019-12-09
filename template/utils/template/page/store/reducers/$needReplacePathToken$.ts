import { $needReplaceUpToken$ } from '../actions/$needReplacePathToken$';

const defaultData = {
  status: 1,
};

export default (state: Typings.$needReplaceUpLowToken$State["$needReplacePathToken$"] = defaultData, action: Typings.$needReplaceUpLowToken$Actions): Typings.$needReplaceUpLowToken$State["$needReplacePathToken$"] => {
  switch (action.type) {
  case $needReplaceUpToken$:
    return {
      ...state,
      status: action.status,
    };
    break;
  default:
    return state;
  }
};
