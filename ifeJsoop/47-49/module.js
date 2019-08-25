;(function (ModuleManager) {
  var moduleCache = {}
  ModuleManager.module = function (url, modDeps, modCallback) {
    var args = Array.prototype.slice.call(arguments)
    var callback = args.pop()
    var dependences = (args.length && args[args.length - 1] instanceof Array ? args.pop() : [])
    var url = args.length ? args.pop() : null
    var params = []
    var depCount = 0
    var i = 0
    if (dependences.length) {
      while (i < dependences.length) {
        (function (i) {
          depCount++
          loadModule(dependences[i], function (mod) {
            params[i] = mod
            depCount--
            if (depCount === 0) {
              setModule(url, params, callback)
            }
          })
        })(i)
        i++
      }
    } else {
      setModule(url, [], callback)
    }
  }
  function loadModule (moduleName, callback) {
    if (moduleCache[moduleName]) {
      var _module = moduleCache[moduleName]
      if (_module.status === 'loaded') {
        setTimeout(callback(_module.exports), 0)
      } else {
        _module.onload.push(callback)
      }
    } else {
      moduleCache[moduleName] = {
        moduleName,
        status: 'loading',
        exports: null,
        onload: [callback]
      }
      loadScript(getUrl(moduleName))
    }
  }
  function setModule (moduleName, dependences, callback) {
    if (moduleCache[moduleName]) {
      var _module = moduleCache[moduleName]
      _module.status = 'loaded'
      _module.exports = callback ? callback.apply(_module, dependences) : null
      while (fn = _module.onload.shift()) {
        fn(_module.exports)
      }
    } else {
      callback && callback.apply(null, dependences)
    }
  }
  function getUrl (moduleName) {
    return String(moduleName).replace(/\.js$/g, '') + '.js'
  }
  function loadScript (src) {
    var _script = document.createElement('script')
    _script.type = 'text/javascript'
    _script.src = src
    _script.charset = 'UTF-8'
    _script.async = true
    document.getElementsByTagName('head')[0].appendChild(_script)
  }
})((function () {
  return window.Module = {}
})())