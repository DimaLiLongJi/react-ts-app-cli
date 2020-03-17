import { Config } from 'Constants/config';

export class PageHelper {
  public static setPageTitle(title: string) {
    document.title = title;
  }

  public static isWechat() {
    return (/micromessenger/.test(navigator.userAgent.toLowerCase()));
  }

  public static isApp() {
    return navigator.userAgent.indexOf('10086APP') !== -1;
  }

  public static isAliPay() {
    return (/AlipayClient/.test(window.navigator.userAgent));
  }

  public static isiOS() {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }

  public static isAndroid() {
    return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
  }

  public static isWechatActivity(activity: any) {
    return activity && (activity.actType === 1 || activity.actType === 3);
  }

  public static getChannel() {
    let channel = '';
    if (this.isWechat()) {
      channel = 'wx';
    } else if (this.isApp()) {
      channel = 'app';
    } else if (this.isAliPay()) {
      channel = 'ali';
    } else {
      channel = 'all';
    }
    return channel;
  }

  public static hackiOSInput() {
    if (this.isiOS()) {
      window.addEventListener('focusout', () => {
        // 软键盘收起的事件处理
        setTimeout(() => {
          window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop);
        });
      });
    }
  }

  public static goLogin() {
    window.location.replace(`${Config.pageRoot}/login?rurl=${encodeURIComponent(window.location.href)}`);
  }

  public static goQrcode() {
    window.location.replace(`${Config.pageRoot}/qrcode`);
  }

  public static goNoFound() {
    window.location.replace(`${Config.pageRoot}/nofound`);
  }

  public static goBindUrl(url: string) {
    window.location.replace(`${Config.bindUrl}${encodeURIComponent(url)}`);
  }

  // public static go_auth() {
  //   this.go_qrcode();
  //   // this.go_login()
  // }

  // public static go_qrcode() {
  //   this.go('/qrcode');
  // }

  // public static go_login() {
  //   // this.$router.push('/login?rurl=' + encodeURIComponent(window.location.href));
  // }

  // public static go(url: string) {
  //   // vue.loadingShow();
  //   window.location.href = url;
  //   // setTimeout(vue.loadingHide, 1000);
  // }
}
