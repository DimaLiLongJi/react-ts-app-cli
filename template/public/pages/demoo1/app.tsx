import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { Toast } from "antd-mobile";
import { Dispatch } from "redux";

import { getMethod } from "Service";
import * as Demoo1Action from "./store/actions/demoo1";

import Page1 from "./container/page1";
import { parseUrlParams, stringifyUrlParams } from "Utils/index";

export interface Props extends Typings.RouteProps<any, any> {}
export interface State {}

const mapStateToProps = (state: Typings.Demoo1State) => ({
  // user: state.tutor.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Typings.Demoo1Actions>) => ({
  // updateUser: (params: Typings.TutorInfo) => dispatch(UserActions.updateUser(params)),
});

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class App extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
  }

  public render(): React.ReactChild {
    // 自行创建路由
    return (
        <Switch>
          <Route path="/demo" component={Page1} />
        </Switch>
    );
  }
}
