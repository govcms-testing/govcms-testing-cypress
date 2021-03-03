module.exports = (on, config) => {
  on('task', {
    moduleCheck (jsonObj) {
      let keys = Object.keys(jsonObj)
      console.log(keys)
      return keys
    }
  })
}