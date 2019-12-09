import { Props, State } from './types';

import * as React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Dispatch } from 'redux';

import * as $needReplaceUpLowToken$Action from 'Pages/$needReplacePathToken$/store/actions/$needReplacePathToken$';
import { postMethod } from 'Service';

import './style.less';

const mapStateToProps = (state: Typings.$needReplaceUpLowToken$State) => ({
  // tutor: state.tutor.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Typings.$needReplaceUpLowToken$Actions>) => ({
  // verifyUser: (params: Typings.VerifyParmas) => dispatch(UserActions.verifyUser(params)),
});

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Page1 extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
  }

  public render(): React.ReactChild {
    return (
      <div>
        page: $needReplacePathToken$
      </div>
    );
  }
}
