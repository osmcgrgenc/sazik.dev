const db = require("../init");

module.exports = class GenericRepository {
  /**
   * Start the repository.
   *
   * @author Osman Cagri GENC
   */
  static async init() {
    db();

    return this;
  }

  /**
   * Returns all records found in the desired model based on the parameters sent.
   *
   * @author Osman Cagri GENC
   */
  static async find(model, params) {
    return await model.query().select().where(params);
  }

  /**
   * Searches for the parameters in the desired model and returns the first record found.
   *
   * @author Osman Cagri GENC
   * @param {*} model
   * @param {*} params
   */
  static async findOne(model, params) {
    return await model.query().select().where(params);
  }

  /**
   * Search data by id.
   *
   * @author Osman Cagri GENC
   */
  static async findById(model, params) {
    return await model.findById(params);
  }

  /**
   * Create a new data.
   *
   * @author Osman Cagri GENC
   */
  static async create(model, params) {
    return await model.query().insert(params);
  }

  /**
   * Get count of registers based on received parameter.
   *
   * @author Osman Cagri GENC
   * @param {*} model
   * @param {*} params
   */
  static async count(model, params) {
    return await model.query().select().where(params).resultSize();
  }

  /**
   * Delete data by id.
   *
   * @author Osman Cagri GENC
   */
  static async deleteById(model, params) {
    return await model.query().deleteById(params);
  }

  /**
   * Delete data.
   *
   * @author Osman Cagri GENC
   */
  static async delete(model, params) {
    return await model.query().delete().where(params);
  }

  /**
   * Update a register.
   *
   * @author Osman Cagri GENC
   * @param {*} paramsSearch
   * @param {*} paramsUpdate
   */
  static async update(model, paramsSearch, paramsUpdate) {
    return await model.query().patch(paramsUpdate).where(paramsSearch); // findOneAndUpdate(paramsSearch, paramsUpdate);
  }
};
