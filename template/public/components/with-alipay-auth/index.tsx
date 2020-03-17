import * as React from "react";
import { Config } from "Constants/config";
import { PageHelper } from "Utils/page-helper";
import { loadAliInfo, getActivityInfo } from "Utils/base-service";
import { Toast } from "antd-mobile";

interface Props extends Typings.RouteProps<any, any> {}

interface State {
  hasActivity: string;
  hasAliUserId: string;
  hasPhone: string;
}

export function WithAlipayAuth(activityId: string) {
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

        // 支付宝用户id
        let hasAliUserId = null;
        const aliUserId = sessionStorage.getItem(Config.sessionAliUserIdKey);
        if (aliUserId) hasAliUserId = aliUserId;

        // 手机号
        let hasPhone = null;
        const phone = sessionStorage.getItem(Config.sessionPhoneKey);
        if (phone) hasPhone = phone;

        this.state = {
          hasActivity,
          hasAliUserId,
          hasPhone,
        };
      }

      public render(): React.ReactNode {
        Toast.hide();
        // 非微信环境直接进入
        if (!PageHelper.isAliPay()) return <WrapperComponent {...this.props} />;

        if (this.state.hasPhone) return <WrapperComponent {...this.props} />;
        else {
          if (this.state.hasAliUserId) {
            this.getByAliUserId();
            Toast.loading('加载中。。。', 0);
            return <React.Fragment />;
          } else if (this.state.hasActivity) {
            this.getByActivity();
            return <React.Fragment />;
          } else if (!activityId) {
            PageHelper.goNoFound();
            return <React.Fragment />;
          } else {
            this.getByAuth();
            Toast.loading('加载中。。。', 0);
            return <React.Fragment />;
          }
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
            this.setState({ hasActivity: JSON.stringify(res.payload) });
            this.getByActivity();
          } else {
            // 直接活动结束
            PageHelper.goNoFound();
          }
        } else {
          // 直接活动结束
          PageHelper.goNoFound();
        }
      }

      /**
       * 通过活动跳转到/auth页面 然后带着openid回来
       *
       * @private
       */
      private async getByActivity() {
        const activity = JSON.parse(sessionStorage.getItem(Config.activityInfoKey));
        // const activity: any = {
        //   openIdRedirectUrl: "http://wx.10086.cn/heilongjiang/global/moowo/api/mod/remote/get_openid",
        //   userInfoRedirectUrl: "http://wx.10086.cn/heilongjiang/global/moowo/api/mod/remote/get_userinfo",
        //   frontendRedirectUrl: "http://wx.10086.cn/heilongjiang/global/h5agg/auth",
        //   alipayAuthCodeRedirectUrl: "http://wx.10086.cn/heilongjiang/global/moowo/api/mod/remote/alipay_code",
        //   alipayUserInfoRedirectUrl: "http://wx.10086.cn/heilongjiang/global/moowo/api/mod/remote/alipay_userinfo",
        //   alipayFrontendRedirectUrl: "http://wx.10086.cn/heilongjiang/global/broadband/aliauth",
        // };
        window.location.replace(`${activity.alipayAuthCodeRedirectUrl}?actid=${activity.id}&rurl=${encodeURIComponent(window.location.href)}&${new Date().getTime()}`);
        // window.location.href = `${activity.alipayAuthCodeRedirectUrl}?actid=${activity.id}&rurl=${encodeURIComponent(window.location.href)}&${new Date().getTime()}`;
      }

      /**
       * 通过aliuserid获取手机号
       *
       * @private
       */
      private async getByAliUserId() {
        const aliUserId = sessionStorage.getItem(Config.sessionAliUserIdKey);
        const res = await loadAliInfo(aliUserId);
        if (res.code === 0) {
          const ret = res.payload;
          if (ret && ret.phone) {
            const phone = ret.phone;
            sessionStorage.setItem(Config.sessionPhoneKey, phone);
            this.setState({ hasPhone: phone });
          } else {
            PageHelper.goQrcode();
          }
        } else {
          Toast.info(res.description);
          PageHelper.goLogin();
        }
      }
    };
  };
}
