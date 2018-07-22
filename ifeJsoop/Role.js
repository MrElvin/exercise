Module.module('Role', ['Util'], (Util) => {
  let Restaurant = function (params) {
    this.cash = params.cash || 10000
    this.seats = params.seats || 5
    this.staff = params.staff || []
    this.menu = params.menu || []
    this.customerQueue = params.customerQueue || []
    this.hire = function (employee) {
      console.log('雇佣：' + employee.name)
      this.staff.push(employee)
      return this
    }
    this.fire = function (employee) {
      console.log('解雇： ' + employee.name)
      this.staff = this.staff.filter(function (item) {
        return item.id !== employee.id
      })
    }
  }

  let Employee = (function () {
    var EmployeeID = 0
    return function (name, salary) {
      this.id = EmployeeID++
      this.name = name || ''
      this.salary = salary || 0
    }
  })()

  let Waiter = (function () {
    let instance = null
    let WaiterFunc = function (name, salary) {
      Employee.call(this, name, salary)
      this.listenOrder = function (dishes) {
        return Promise.resolve(dishes)
      }
      this.giveCook = function (dishes) {
        console.log('已经下单到后厨！！！')
        return Promise.resolve(dishes)
      }
      this.serve = function (dish) {
        console.log('为顾客上' + dish.name)
        return Promise.resolve(dish)
      }
    }
    Util.inherit(WaiterFunc, Employee)
    return function (name, salary) {
      if (!instance) {
        instance = new WaiterFunc(name, salary)
      }
      return instance
    }
  })()

  let Cook = (function () {
    let instance = null
    let CookFunc = function (name, salary) {
      Employee.call(this, name, salary)
      this.cookDishes = function (dishes) {
        // console.log(dishes)
        let promises = dishes.map((dish) => {
          return function () {
            console.log('正在烹饪' + dish.name + '...')
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(dish.name + '烹饪完成！！！')
                resolve(dish)
              }, dish.useTime * Util.TIME)
            })
          }
        })
        return Promise.resolve(promises)
      }
      this.passDishToWaiter = function (dish) {
        return Promise.resolve(dish)
      }
    }
    Util.inherit(CookFunc, Employee)
    return function (name, salary) {
      if (!instance) {
        instance = new CookFunc(name, salary)
      }
      return instance
    }
  })()

  let Customer = function (name) {
    let dishesToEatPromises = []
    let haveEatenCount = 0
    this.name = name
    this.status = '闲坐中...'
    this.orderDishes = []
    this.order = function (restaurant) {
      this.status = '点餐中...'
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          for (let i = 0; i < Math.floor(Math.random() * restaurant.menu.length + 1); i++) {
            this.orderDishes.push(restaurant.menu.length ? restaurant.menu[Math.floor(Math.random() * restaurant.menu.length)] : null)
          }
          this.status = '等餐中...'
          resolve(this.orderDishes)
        }, 1 * Util.TIME)
      })
    }
    this.eat = function (dish) {
      this.status = '吃饭中...'
      let p = function () {
        console.log('正在享用' + dish.name + '...')
        arguments.callee.isResolved = true
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(dish.name + '吃完啦！！！')
            this.status = '等餐中...'
            resolve()
          }, 3 * Util.TIME)
        })
      }
      p.isResolved = false
      dishesToEatPromises.push(p)
      return dishesToEatPromises
        .filter(promise => !promise.isResolved)
        .reduce((a, b) => a.then(b)
          .then(() => {
            haveEatenCount++
            return Promise.resolve(haveEatenCount)
          })
          , Promise.resolve())
    }
    this.sit = function () { console.log('我坐下啦！！！') }
    this.payAndLeave = function () {
      console.log(this.name + '买单离店啦！！！')
      return Promise.resolve()
    }
  }

  let Dish = function (name, cost, price) {
    this.name = name
    this.cost = cost
    this.price = price
    this.useTime = Math.floor(Math.random() * this.useTimeMax + 1)
  }
  Dish.prototype.useTimeMax = 10

  return {
    Restaurant,
    Employee,
    Waiter,
    Cook,
    Customer,
    Dish
  }
})
