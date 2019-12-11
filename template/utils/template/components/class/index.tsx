import { Props, State } from './types';
import * as React from 'react';

import './style.less';
export default class $ComponentName$ extends React.Component<Props, State> {
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
