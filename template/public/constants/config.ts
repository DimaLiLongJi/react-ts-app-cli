export const Config = {
  headerKey: 'HEADER-MOOAO-AC',

  activityInfoKey: 'NEW_MOOAO_ACTIVITY_INFO',
  activityIdKey: 'NEW_MOOAO_ACTIVITY_ID',

  sessionOpenidKey: 'NEW_OPENID_SESSION_ITEM',
  sessionAliUserIdKey: 'NEW_OPENID_SESSION_ALI_USER_ID',
  sessionPhoneKey: 'NEW_PHONE_SESSION_ITEM',
  sessionEncryptPhoneKey: 'NEW_ENCRYPT_PHONE_SESSION_ITEM',

  pageRoot: `${(process.env.config as any).baseUrl}`,
  serverRoot: `${(process.env.config as any).serverUrl}`,

  wechatServerRootOpenId: `${(process.env.config as any).serverUrl}/remote/get_openid`,
  wechatServerRootUserInfo: `${(process.env.config as any).serverUrl}/remote/get_userinfo`,
  wechatServerRootCode: `${(process.env.config as any).serverUrl}/remote/get_code`,

  alipayAuthCodeRedirectUrl: `${(process.env.config as any).serverUrl}/mod/remote/alipay_code`,
  alipayUserInfoRedirectUrl: `${(process.env.config as any).serverUrl}/mod/remote/alipay_userinfo`,


  bindUrl: 'http://wx.10086.cn/website/bind/bindAccount/new?redirecttourl=',
};
