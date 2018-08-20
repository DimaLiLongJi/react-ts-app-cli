import { Props, State } from './types';

import * as React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import Cookie from 'easier-cookie';
import { Dispatch } from 'redux';

import * as DemoAction from 'Actions/demo';
import { post } from 'Service';

import './style.less';

const mapStateToProps = (state: Typings.StoreState) => ({
  // tutor: state.tutor.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Typings.DemoActions>) => ({
  // verifyUser: (params: Typings.VerifyParmas) => dispatch(UserActions.verifyUser(params)),
});

@(connect(mapStateToProps, mapDispatchToProps) as any)

export default class Login extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
  }

  public render(): React.ReactChild {
    return (
      <div>
        page: demo
      </div>
    );
  }
}
