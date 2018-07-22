Module.module('Util', () => {
  return {
    inherit (subClass, superClass) {
      function F () {}
      F.prototype = superClass.prototype
      var p = new F()
      p.constructor = subClass
      subClass.prototype = p
    },
    TIME: 1000,
    MAXORDERDISHES: 4
  }
})
