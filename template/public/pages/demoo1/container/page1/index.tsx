import { Props, State } from './types';

import * as React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Dispatch } from 'redux';

import * as Demoo1Action from 'Pages/demoo1/store/actions/demoo1';
import { postMethod } from 'Service';

import './style.less';

const mapStateToProps = (state: Typings.Demoo1State) => ({
  // tutor: state.tutor.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Typings.Demoo1Actions>) => ({
  // verifyUser: (params: Typings.VerifyParmas) => dispatch(UserActions.verifyUser(params)),
});

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Page1 extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
  }

  public render(): React.ReactChild {
    console.log(2222);
    return (
      <div>
        page: demoo1
      </div>
    );
  }
}
