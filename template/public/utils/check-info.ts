/**
 * 校验手机号码
 * @param mobile
 */
export const checkMobile = (mobile: string): boolean => {
  if (!(/^1[3456789]\d{9}$/.test(mobile))) {
    return false;
  }
  return true;
};
/**
 * 校验身份证号
 * @param mobile
 */
export const checkIdCrad = (idCrad: string): boolean => {
  if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCrad))) {
    return false;
  }
  return true;
};

