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






