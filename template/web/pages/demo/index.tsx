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

const mapStateToProps = (state: CFTypings.StoreState) => ({
  // tutor: state.tutor.user,
});

const mapDispatchToProps = (dispatch: Dispatch<CFTypings.DemoAction>) => ({
  // verifyUser: (params: CFTypings.VerifyParmas) => dispatch(UserActions.verifyUser(params)),
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
