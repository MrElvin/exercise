Module.module(['Role', 'Util'], function (Role, Util) {
  let restaurant = new Role.Restaurant({
    menu: [
      new Role.Dish('水煮鱼', 38, 48),
      new Role.Dish('辣子鸡丁', 50, 60),
      new Role.Dish('香煎牛排', 80, 100),
      new Role.Dish('东北大米', 3, 5),
      new Role.Dish('果汁', 18, 24),
      new Role.Dish('汉堡', 28, 40),
      new Role.Dish('铁板饭', 20, 32),
      new Role.Dish('夏威夷披萨', 50, 80),
      new Role.Dish('水果沙拉', 12, 20)
    ],
    customerQueue: [
      new Role.Customer('Lina'),
      new Role.Customer('Elvin'),
      new Role.Customer('Elaie'),
      new Role.Customer('Byue'),
      new Role.Customer('Melon'),
    ]
  })

  let waiter = new Role.Waiter('Sarah', 3000)
  let cook = new Role.Cook('John', 5000)
  restaurant.hire(waiter).hire(cook)

  let main = function () {
    Util.log('*********************')
    let currentCustomer = restaurant.customerQueue[0]
    currentCustomer.sit()
      .then(() => waiter.welcome())
      .then(() => currentCustomer.order(restaurant))
      .then(dishes => waiter.listenOrder(dishes))
      .then(dishes => waiter.giveCook(dishes))
      .then(dishes => cook.cookDishes(dishes))
      .then(dishesPromise => {
        return dishesPromise.reduce((a, b) => a.then(b)
          .then(dish => cook.passDishToWaiter(dish))
          .then(dish => waiter.serve(dish))
          .then(dish => currentCustomer.eat(dish))
          , Promise.resolve())
      })
      .then(() => currentCustomer.payAndLeave())
      .then(() => {
        restaurant.customerQueue.shift()
        if (restaurant.customerQueue.length) {
          main()
        } else {
          Util.log('*********************')
          Util.log('*********************')
          Util.waiterMove('clearAll')
          Util.log('没有客人啦，打烊啦！！！！！')
        }
      })
  }
  main()
})


