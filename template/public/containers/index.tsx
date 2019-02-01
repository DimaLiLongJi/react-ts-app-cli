import { Props, State } from './types';

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { Dispatch } from 'redux';

import { get } from 'Service';
import * as DemoAction from '../store/actions/demo';

import Demo from 'Pages/demo';
import { parseUrlParams, stringifyUrlParams } from 'Utils/index';

const mapStateToProps = (state: Typings.StoreState) => ({
  // user: state.tutor.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Typings.DemoActions>) => ({
  // updateUser: (params: Typings.TutorInfo) => dispatch(UserActions.updateUser(params)),
});

@(connect(mapStateToProps, mapDispatchToProps) as any)

export default class Container extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
  }


  public render(): React.ReactChild {
    // 自行创建
    return (
      <Switch>
        <Route path="/demo" component={Demo}/>
      </Switch>
    );
  }
}
