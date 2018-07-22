Module.module(['Role'], function (Role) {
  let restaurant = new Role.Restaurant({
    menu: [
      new Role.Dish('水煮鱼', '38', '48'),
      new Role.Dish('辣子鸡丁', '50', '60'),
      new Role.Dish('香煎牛排', '80', '100'),
      new Role.Dish('东北大米', '3', '5'),
      new Role.Dish('果汁', '18', '24'),
      new Role.Dish('汉堡', '28', '40')
    ],
    customerQueue: [
      new Role.Customer('Lina'),
      new Role.Customer('MrElvin'),
    ]
  })

  let waiter = new Role.Waiter('Sarah', 8000)
  let cook = new Role.Cook('John', 12000)
  restaurant.hire(waiter).hire(cook)

  let main = function () {
    console.log('*********************')
    let currentCustomer = restaurant.customerQueue[0]
    currentCustomer.sit()
    currentCustomer.order(restaurant)
      .then(dishes => waiter.listenOrder(dishes))
      .then(dishes => waiter.giveCook(dishes))
      .then(dishes => cook.cookDishes(dishes))
      .then(dishesPromise => {
        return dishesPromise.reduce((a, b) => a.then(b)
          .then(dish => cook.passDishToWaiter(dish))
          .then(dish => waiter.serve(dish))
          .then(dish => currentCustomer.eat(dish))
          .then(count => {if (count === currentCustomer.orderDishes.length) return Promise.resolve()})
          , Promise.resolve())
      })
      .then(() => currentCustomer.payAndLeave())
      .then(() => {
        restaurant.customerQueue.shift()
        if (restaurant.customerQueue.length) {
          main()
        } else {
          console.log('*********************')
          console.log('*********************')
          console.log('没有客人啦，打烊啦！！！！！')
        }
      })
  }
  main()
})


