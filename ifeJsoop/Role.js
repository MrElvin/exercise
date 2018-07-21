Module.module('Role', ['Util'], (Util) => {
  let Restaurant = function (params) {
    this.cash = params.cash || 10000
    this.seats = params.seats || 5
    this.staff = params.staff || []
    this.menu = params.menu || []
    this.customerQueue = params.customerQueue || []
    this.hire = function (employee) {
      console.log('Hired: ' + employee.name)
      this.staff.push(employee)
      return this
    }
    this.fire = function (employee) {
      console.log('Fired： ' + employee.name)
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
  Employee.prototype.completeOneTask = function () { console.log('one task ok!') }

  let Waiter = (function () {
    let instance = null
    let WaiterFunc = function (name, salary) {
      Employee.call(this, name, salary)
      this.completeOneTask = function (workType, customer) {
        if (Object.prototype.toString.call(workType) === '[object Array]') {
          console.log(customer.name + ' ordered dish: ' + workType[0].name)
        } else {
          console.log('dish to customer')
        }
      }
      this.giveCook = function (dishes) {
        console.log('cook ' + dishes[0].name)
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
      this.cooking = function (dishes) {
        console.log('cooking ' + dishes[0].name + ' ...')
      }
      this.completeOneTask = function (dishes) {
        console.log(dishes[0].name + ' cooked!')
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
    this.name = name
    this.order = function (restaurant) { return restaurant.menu.length ? restaurant.menu[Math.floor(Math.random() * 6)] : null }
    this.eat = function () { console.log('Eating...') }
    this.sit = function () { console.log('I want to order something') }
    this.leave = function (restaurant, cb) {
      console.log('I have finished!')
      restaurant.customerQueue.shift()
      if (restaurant.customerQueue.length) {
        cb()
      } else {
        console.log('*********************')
        return console.log('No customers!!!')
      }
    }
  }

  let Dish = function (name, cost, price) {
    this.name = name
    this.cost = cost
    this.price = price
  }

  return {
    Restaurant,
    Employee,
    Waiter,
    Cook,
    Customer,
    Dish
  }
})
