import * as React from 'react';
import { Config } from 'Constants/config';
import { PageHelper } from 'Utils/page-helper';
import { loadAppInfo, getActivityInfo } from 'Utils/base-service';

import { Toast } from 'antd-mobile';

export interface Props extends Typings.RouteProps<any, any> {
}
export interface State {
  hasPhone: string;
  hasActivity: string;
}

export function WithAppAuth(activityId: string) {
  return function(WrapperComponent: React.ComponentType): any {
    return class Component extends React.Component<Readonly<Props>, Readonly<State>> {
      constructor(props: Readonly<Props>) {
        super(props);
        // 活动id
        let hasActivity = null;
        // sessionStorage.setItem(activityId, activityId);
        sessionStorage.setItem(Config.activityIdKey, activityId);
        const activity = sessionStorage.getItem(Config.activityInfoKey);
        if (activity) hasActivity = activity;
        
        // 手机号
        let hasPhone = null;
        const phone = sessionStorage.getItem(Config.sessionPhoneKey);
        if (phone) hasPhone = phone;
        this.state = {
          hasPhone,
          hasActivity,
        };
      }

      public componentDidMount() {
        const appPlatform = new window.app86Platform();
        appPlatform.getEncodePhone((res: string) => { // 获取加密手机号
          this.loadAppInfo(res);
        });
      }

      public render(): React.ReactElement {
        Toast.hide();
        if (!PageHelper.isApp()) return <WrapperComponent {...this.props} />;
        if (!this.state.hasActivity) {
          this.getByAuth();
          Toast.loading('加载中。。。', 0);
          return <React.Fragment />;
        }
        if (this.state.hasPhone) return <WrapperComponent {...this.props} />;
        else {
          Toast.loading('加载中。。。', 0);
          return <React.Fragment />;
        }
      }

      /**
       * 先获取活动id然后再登录
       *
       * @private
       */
      private async getByAuth() {
        const res = await getActivityInfo(activityId);
        if (res && res.code === 0) {
          sessionStorage.setItem(Config.activityInfoKey, JSON.stringify(res.payload));
          if (res.payload && new Date().getTime() > res.payload.endDate) {
            // 直接活动结束
            PageHelper.goNoFound();
          } else this.setState({ hasActivity: JSON.stringify(res.payload) });
        } else {
          // 直接活动结束
          PageHelper.goNoFound();
        }
      }

      private async loadAppInfo(encryptPhone: string) {
        const res = await loadAppInfo(encryptPhone);
        if (res.code === 0) {
          const ret = res.payload;
          if (ret && ret.phone) {
            sessionStorage.setItem(Config.sessionEncryptPhoneKey, encryptPhone);
            sessionStorage.setItem(Config.sessionPhoneKey, ret.phone);
            this.setState({hasPhone: ret.phone});
          } else {
            PageHelper.goLogin();
          }
        } else {
          Toast.info(res.description);
          PageHelper.goLogin();
        }
      }
    };
  };
}
