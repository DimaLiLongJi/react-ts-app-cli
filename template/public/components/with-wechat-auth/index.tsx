import * as React from "react";
import { Config } from "Constants/config";
import { PageHelper } from "Utils/page-helper";
import { setWxConfig } from "Utils/wx-service";
import { loadWxInfo, getActivityInfo } from "Utils/base-service";
import { Toast } from "antd-mobile";

interface Props extends Typings.RouteProps<any, any> {}

interface State {
  hasActivity: string;
  hasOpenid: string;
  hasPhone: string;
}

export function WithWechatAuth(activityId: string) {
  return function(WrapperComponent: React.ComponentType): any {
    return class Component extends React.Component<Readonly<Props>, Readonly<State>> {
      constructor(props: Readonly<Props>) {
        super(props);

        // 活动id
        let hasActivity = null;
        // Config.activityIdKey
        // sessionStorage.setItem(activityId, activityId);
        sessionStorage.setItem(Config.activityIdKey, activityId);
        // Config.activityInfoKey
        const activity = sessionStorage.getItem(Config.activityInfoKey);
        if (activity) hasActivity = activity;

        // openid
        let hasOpenid = null;
        const openid = sessionStorage.getItem(Config.sessionOpenidKey);
        if (openid) hasOpenid = openid;

        // 手机号
        let hasPhone = null;
        const phone = sessionStorage.getItem(Config.sessionPhoneKey);
        if (phone) hasPhone = phone;

        this.state = {
          hasActivity,
          hasOpenid,
          hasPhone,
        };
      }

      public render(): React.ReactNode {
        Toast.hide();
        // 非微信环境直接进入
        if (!PageHelper.isWechat()) return <WrapperComponent {...this.props} />;

        if (this.state.hasPhone) {
          setWxConfig();
          return <WrapperComponent {...this.props} />;
        } else {
          if (this.state.hasOpenid) {
            this.getByOpenid();
            Toast.loading('加载中。。。', 0);
            return <React.Fragment />;
          } else if (this.state.hasActivity) {
            this.getByActivity();
            return <React.Fragment />;
          } else if (!activityId) {
            PageHelper.goNoFound();
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
            // 直接活动结束
            PageHelper.goNoFound();
          } else {
            this.setState({ hasActivity: JSON.stringify(res.payload) });
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
        // window.location.href = `${activity.openIdRedirectUrl}?actid=${activity.id}&rurl=${encodeURIComponent(window.location.href)}&${new Date().getTime()}`;
        window.location.replace(`${activity.openIdRedirectUrl}?actid=${activity.id}&rurl=${encodeURIComponent(window.location.href)}&${new Date().getTime()}`);
      }

      /**
       * 通过openid获取手机号
       *
       * @private
       */
      private async getByOpenid() {
        const res = await loadWxInfo(this.state.hasOpenid);
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
