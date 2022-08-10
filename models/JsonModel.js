const { Model } = require('sequelize')
const getRandom = require('../utils/getRandom')

/**
 * Custom model to handle the tedium of `this.get({plain:true})` 
 */
class JsonModel extends Model {
  static getJson(...args) {
    return this.findAll(...args).then(found => found.map(i => i.getJson()))
  }
  static getJsonByPk(...args) {
    return this.findByPk(...args).then(found => found ? found.getJson() : null)
  }

  static getRandomJson(...args) {
    return this.findAll(...args).then(found => {
      return found.length ? getRandom(found).getJson() : null
    })
  }

  getJson() {
    return this.get({ plain: true })
  }
}

module.exports = JsonModel