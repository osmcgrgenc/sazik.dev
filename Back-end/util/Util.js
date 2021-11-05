module.exports = class Util {
  /**
   * Init class
   *
   * @author Osman Cagri GENC
   */
  static init() {
    return this;
  }

  /**
   * Checks if the object sent by parameter is null, undefined, or empty.
   *
   * @author Osman Cagri GENC
   */
  static isNullOrEmpty(obj) {
    if (obj === null || obj === undefined || obj.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};
