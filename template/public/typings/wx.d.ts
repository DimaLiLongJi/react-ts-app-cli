export type WXConfig = {
  appId?: string, // 必填，公众号的唯一标识
  timestamp?: number, // 必填，生成签名的时间戳
  nonceStr?: string, // 必填，生成签名的随机串
  signature?: string, // 必填，签名，见附录1
}

export type WXMessage = {
  title?: string, // 分享标题
  desc?: string, // 分享描述
  link?: string, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl?: string, // 分享图标
  type?: 'music' | 'video' | 'link' | null, // 分享类型,music、video或link，不填默认为link
  dataUrl?: string,
}

export type WXCallBacks = {
  success?: (res: any) => void,
  fail?: (res: any) => void,
  complete?: (res: any) => void,
  cancel?: (res: any) => void,
}

declare global {
  interface Window {
      wx: any;
      app86Platform: any;
  }
}
