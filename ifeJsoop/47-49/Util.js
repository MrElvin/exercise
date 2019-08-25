Module.module('Util', () => {
  return {
    TIME: 1000,
    MAXORDERDISHES: 4,
    inherit (subClass, superClass) {
      function F () {}
      F.prototype = superClass.prototype
      var p = new F()
      p.constructor = subClass
      subClass.prototype = p
    },
    log (text) {
      let container = document.getElementsByClassName('info')[0]
      let p = document.createElement('p')
      p.innerText = text
      container.appendChild(p)
    },
    changeMoney (money) {
      let moneyText = document.getElementsByTagName('strong')[0]
      let currMoney = +moneyText.innerText
      moneyText.innerText = currMoney + money
    },
    customerMove (type) {
      let theImg = document.getElementsByClassName('customer')[0].getElementsByTagName('img')[0]
      if (type === 'in') {
        theImg.classList.add('c-tomove', 'c-movein')
      } else if (type === 'out') {
        theImg.classList.remove('c-movein')
        theImg.classList.add('c-moveout')
        document.getElementsByClassName('customer')[0].removeChild(theImg)
      }
    },
    waiterMove (type) {
      let waiter = document.getElementsByClassName('waiter')[0].getElementsByTagName('img')[0]
      if (type === 'wel') {
        waiter.classList.add('w-tomove', 'w-wel', 'w-serving')
      } else if (type === 'serve') {
        waiter.classList.remove('w-wel')
        waiter.classList.add('w-serve')
      } else if (type === 'clearMove') {
        waiter.classList.remove('w-serve')
      } else if (type === 'clearAll') {
        waiter.classList.remove('w-tomove', 'w-wel', 'w-serving', 'w-serve')
      }
    }
  }
})
