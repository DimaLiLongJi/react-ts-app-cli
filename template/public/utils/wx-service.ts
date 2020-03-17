import { PageHelper } from 'Utils/page-helper';
import { getJsConfig } from 'Utils/base-service';
import { Config } from 'Constants/config';

type WXConfig = {
  debug?: boolean, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId?: string // 必填，公众号的唯一标识
  timestamp: number, // 必填，生成签名的时间戳
  nonceStr: string, // 必填，生成签名的随机串
  signature: string, // 必填，签名
  jsApiList?: string[], // 必填，需要使用的JS接口列表
};

type WXMessage = {
  title?: string, // 分享标题
  desc?: string, // 分享描述
  link?: string, // 分享链接
  imgUrl?: string, // 分享图标
  type?: string, // 分享类型,music、video或link，不填默认为link
  dataUrl?: string,
  successCallback?: () => void;
  errorCallback?: () => void;
};

// 分享朋友
export function shareAppMessage(message: WXMessage) {
  window.wx.onMenuShareAppMessage({
    title: message.title || '', // 分享标题
    desc: message.desc || '', // 分享描述
    link: message.link || '', // 分享链接
    imgUrl: message.imgUrl || '', // 分享图标
    type: message.type || '', // 分享类型,music、video或link，不填默认为link
    dataUrl: message.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
    success() {
      // 用户确认分享后执行的回调函数
      if (message.successCallback) message.successCallback();
    },
    cancel() {
      // 用户取消分享后执行的回调函数
      if (message.errorCallback) message.errorCallback();
    },
  });
}

// 分享朋友圈
export function shareTimeLine(message: WXMessage) {
  window.wx.onMenuShareTimeline({
    title: message.title ? message.title : '', // 分享标题
    link: message.link ? message.link : '', // 分享链接
    imgUrl: message.imgUrl ? message.imgUrl : '', // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
      if (message.successCallback) message.successCallback();
    },
    cancel() {
      // 用户取消分享后执行的回调函数
      if (message.errorCallback) message.errorCallback();
    },
  });
}

export function shareQQ(message: WXMessage) {
  window.wx.onMenuShareQQ({
    title: message.title ? message.title : '', // 分享标题
    desc: message.desc ? message.desc : '', // 分享描述
    link: message.link ? message.link : '', // 分享链接
    imgUrl: message.imgUrl ? message.imgUrl : '', // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
      if (message.successCallback) message.successCallback();
    },
    cancel() {
      // 用户取消分享后执行的回调函数
      if (message.errorCallback) message.errorCallback();
    },
  });
}

export function shareWeibo(message: WXMessage) {
  window.wx.onMenuShareWeibo({
    title: message.title ? message.title : '', // 分享标题
    desc: message.desc ? message.desc : '', // 分享描述
    link: message.link ? message.link : '', // 分享链接
    imgUrl: message.imgUrl ? message.imgUrl : '', // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
      if (message.successCallback) message.successCallback();
    },
    cancel() {
      // 用户取消分享后执行的回调函数
      if (message.errorCallback) message.errorCallback();
    },
  });
}

export function shareQZone(message: WXMessage) {
  window.wx.onMenuShareQZone({
    title: message.title ? message.title : '', // 分享标题
    desc: message.desc ? message.desc : '', // 分享描述
    link: message.link ? message.link : '', // 分享链接
    imgUrl: message.imgUrl ? message.imgUrl : '', // 分享图标
    success() {
      // 用户确认分享后执行的回调函数
      if (message.successCallback) message.successCallback();
    },
    cancel() {
      // 用户取消分享后执行的回调函数
      if (message.errorCallback) message.errorCallback();
    },
  });
}

export function commonConfig(config: WXConfig, message: WXMessage = {}) {
  return new Promise((resolve, reject) => {
    window.wx.config({
      debug: config.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: config.appId, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature, // 必填，签名，见附录1
      jsApiList: config.jsApiList || [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
      ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    window.wx.ready(() => {
      shareAppMessage(message);
      shareTimeLine(message);
      shareQQ(message);
      shareWeibo(message);
      shareQZone(message);
      resolve();
    });
    window.wx.error(() => {
      console.error('设置config失败');
      reject();
    });
  },
  );
}

export function setWxConfig() {
  if (PageHelper.isWechat()) {
    const activity = JSON.parse(sessionStorage.getItem(Config.activityInfoKey));
    if (!activity || !activity.wxShareInfo) return;
    const shareMessage = JSON.parse(activity.wxShareInfo);
    getJsConfig(window.location.href).then(res => {
      commonConfig(res.payload, shareMessage);
    });
  }
}
