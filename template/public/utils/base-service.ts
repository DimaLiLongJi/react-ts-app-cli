import { getMethod, postMethod } from './service';
import { Config } from 'Constants/config';

/**
 * 获取活动信息
 *
 * @export
 * @param {string} actId
 * @returns {Promise<Typings.HLJResponse>}
 */
export function getActivityInfo(actId: string): Promise<Typings.HLJResponse> {
  return getMethod(`${Config.serverRoot}/mod/base/activities/${actId}`);
}

/**
 * 操作记录
 *
 * @export
 * @param {string} phone
 * @param {string} operCode
 * @param {string} target
 * @param {string} fwCode
 * @returns {Promise<Typings.HLJResponse>}
 */
export function doOperate(phone: string, operCode: string, target: string, fwCode: string): Promise<Typings.HLJResponse> {
  return postMethod(`${Config.serverRoot}/agg/ucenter/biz/do_operate`, {
    data: {
      phone,
      operCode,
      target,
      sourceCode: fwCode,
    },
  });
}

/**
 * 微信操作记录
 *
 * @export
 * @param {string} openId
 * @param {string} phone
 * @param {string} operCode
 * @param {string} target
 * @param {string} fwCode
 * @returns {Promise<Typings.HLJResponse>}
 */
export function doWxOperate(openId: string, phone: string, operCode: string, target: string, fwCode: string): Promise<Typings.HLJResponse> {
  return postMethod(`${Config.serverRoot}/agg/ucenter/biz/do_operate`, {
    data: {
      openId,
      phone,
      operCode,
      target,
      sourceCode: fwCode,
    },
  });
}

/**
 * app 操作记录
 *
 * @export
 * @param {string} encryptPhone
 * @param {string} phone
 * @param {string} operCode
 * @param {string} target
 * @param {string} fwCode
 * @returns {Promise<Typings.HLJResponse>}
 */
export function doAppOperate(encryptPhone: string, phone: string, operCode: string, target: string, fwCode: string): Promise<Typings.HLJResponse> {
  return postMethod(`${Config.serverRoot}/agg/ucenter/biz/do_operate`, {
    data: {
      encryptPhone,
      phone,
      operCode,
      target,
      sourceCode: fwCode,
    },
  });
}

/**
 * 支付宝app操作记录
 *
 * @export
 * @param {string} aliUserId
 * @param {string} phone
 * @param {string} operCode
 * @param {string} target
 * @param {string} fwCode
 * @returns {Promise<Typings.HLJResponse>}
 */
export function doAliOperate(aliUserId: string, phone: string, operCode: string, target: string, fwCode: string): Promise<Typings.HLJResponse> {
  return postMethod(`${Config.serverRoot}/agg/ucenter/biz/do_operate`, {
    data: {
      aliUserId,
      phone,
      operCode,
      target,
      sourceCode: fwCode,
    },
  });
}

/**
 * 获取微信用户信息
 *
 * @export
 * @param {string} openId
 * @returns {Promise<Typings.HLJResponse>}
 */
export function loadWxInfo(openId: string): Promise<Typings.HLJResponse> {
  return getMethod(`${Config.serverRoot}/mod/base/wx_users/${openId}/info`);
}

/**
 * 获取app用户信息
 *
 * @export
 * @param {string} phone
 * @returns {Promise<Typings.HLJResponse>}
 */
export function loadAppInfo(phone: string): Promise<Typings.HLJResponse> {
  return getMethod(`${Config.serverRoot}/mod/base/app_users/app_info?phone=${encodeURIComponent(phone)}`);
}

/**
 * 获取支付宝
 *
 * @export
 * @param {string} aliUserId
 * @returns {Promise<Typings.HLJResponse>}
 */
export function loadAliInfo(aliUserId: string): Promise<Typings.HLJResponse> {
  return getMethod(`${Config.serverRoot}/mod/base/ali_users/${aliUserId}/info`);
}

/**
 * 微信jsconfig
 *
 * @export
 * @param {string} url
 * @returns {Promise<Typings.HLJResponse>}
 */
export function getJsConfig(url: string): Promise<Typings.HLJResponse> {
  return getMethod(`${Config.serverRoot}/mod/remote/jsapi_config?url=${url}`);
}

/**
 * 获取验证码
 *
 * @export
 * @param {string} phone
 * @returns {Promise<Typings.HLJResponse>}
 */
export function getCode(phone: string): Promise<Typings.HLJResponse> {
  return postMethod(`${Config.serverRoot}/mod/remote/sms/send`, {
    data: {
      phone,
    },
  });
}

/**
 * 验证手机号验证码
 *
 * @export
 * @param {string} mobile
 * @param {string} code
 * @returns {Promise<Typings.HLJResponse>}
 */
export function login(mobile: string, code: string): Promise<Typings.HLJResponse> {
  return postMethod(`${Config.serverRoot}/mod/remote/sms/check_code`, {
    data: {
      phone: mobile,
      verifyCode: code,
    },
  });
}
