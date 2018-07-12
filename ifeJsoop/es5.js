function inherit (subClass, superClass) {
  function F () {}
  F.prototype = superClass.prototype
  var p = new F()
  p.constructor = subClass
  subClass.prototype = p
}
var Restaurant = function (params) {
  this.cash = params.cash
  this.seats = params.seats
  this.staff = params.staff
  this.hire = function (employee) {
    console.log('Hired: ' + employee.name)
    this.staff.push(employee)
  }
  this.fire = function (employee) {
    console.log('Fired： ' + employee.name)
    this.staff = this.staff.filter(function (item) {
      return item.id !== employee.id
    })
  }
}
var Employee = (function () {
  var EmployeeID = 0
  return function (name, salary) {
    this.id = EmployeeID++
    this.name = name || ''
    this.salary = salary || 0
  }
})()
Employee.prototype.completeOneTask = function () { console.log('one task ok!') }

var Waiter = (function () {
  var instance = null
  var WaiterFunc = function (name, salary) {
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
  inherit(WaiterFunc, Employee)
  return function (name, salary) {
    if (!instance) {
      instance = new WaiterFunc(name, salary)
    }
    return instance
  }
})()

var Cook = (function () {
  var instance = null
  var CookFunc = function (name, salary) {
    Employee.call(this, name, salary)
    this.cooking = function (dishes) {
      console.log('cooking ' + dishes[0].name + ' ...')
    }
    this.completeOneTask = function (dishes) {
      console.log(dishes[0].name + ' cooked!')
    }
  }
  inherit(CookFunc, Employee)
  return function (name, salary) {
    if (!instance) {
      instance = new CookFunc(name, salary)
    }
    return instance
  }
})()

var Customer = function (name) {
  this.name = name
  this.order = function () { return menu[Math.floor(Math.random() * 6)] }
  this.eat = function () { console.log('Eating...') }
  this.sit = function () { console.log('I want to order something') }
  this.leave = function () {
    console.log('I have finished!')
    CustomerQueue.shift()
    if (CustomerQueue.length) {
      return main()
    } else {
      console.log('*********************')
      return console.log('No customers!!!')
    }
  }
}

var Dish = function (name, cost, price) {
  this.name = name
  this.cost = cost
  this.price = price
}

var menu = [
  new Dish('fish', '38', '48'),
  new Dish('chicken', '50', '60'),
  new Dish('beef', '80', '100'),
  new Dish('rice', '3', '5'),
  new Dish('juice', '18', '24'),
  new Dish('hamburger', '28', '40')
]

var CustomerQueue = [
  new Customer('Lina'),
  new Customer('Bob'),
  new Customer('Jason'),
  new Customer('Maria'),
  new Customer('Elvin')
]

var waiter = new Waiter('Sarah', 8000)
var cook = new Cook('John', 12000)

var main = function () {
  console.log('*********************')
  var currentCustomer = CustomerQueue[0]
  currentCustomer.sit()
  var dish = currentCustomer.order()
  waiter.completeOneTask([dish], currentCustomer)
  waiter.giveCook([dish])
  cook.cooking([dish])
  cook.completeOneTask([dish])
  waiter.completeOneTask()
  currentCustomer.eat()
  currentCustomer.leave()
}

main()






