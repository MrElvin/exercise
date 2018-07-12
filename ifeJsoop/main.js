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
    this.staff.push(employee)
  }
  this.fire = function (employee) {
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

var Waiter = function (name, salary) {
  Employee.call(this, name, salary)
  this.completeOneTask = function (workType) {
    if (Object.prototype.toString.call(workType) === '[object Array]') {
      console.log('点菜')
    } else {
      console.log('上菜')
    }
  }
}
inherit(Waiter, Employee)

var Cook = function (name, salary) {
  Employee.call(this, name, salary)
  this.completeOneTask = function () {
    console.log('烹饪')
  }
}
inherit(Cook, Employee)

var Customer = function () {
  this.order = function () {
    console.log('点菜')
  }
  this.eat = function () {
    console.log('吃饭')
  }
}

var Dish = function (name, cost, price) {
  this.name = name
  this.cost = cost
  this.price = price
}

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
})

var newCook = new Cook("Tony", 10000)
ifeRestaurant.hire(newCook)

console.log(ifeRestaurant.staff)

ifeRestaurant.fire(newCook)
console.log(ifeRestaurant.staff)










