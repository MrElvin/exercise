Module.module(['Role'], function (Role) {
  let restaurant = new Role.Restaurant({
    menu: [
      new Role.Dish('fish', '38', '48'),
      new Role.Dish('chicken', '50', '60'),
      new Role.Dish('beef', '80', '100'),
      new Role.Dish('rice', '3', '5'),
      new Role.Dish('juice', '18', '24'),
      new Role.Dish('hamburger', '28', '40')
    ],
    customerQueue: [
      new Role.Customer('Lina'),
      new Role.Customer('Bob'),
      new Role.Customer('Jason'),
      new Role.Customer('Maria'),
      new Role.Customer('Elvin')
    ]
  })

  let waiter = new Role.Waiter('Sarah', 8000)
  let cook = new Role.Cook('John', 12000)
  restaurant.hire(waiter).hire(cook)


  let main = function () {
    console.log('*********************')
    let currentCustomer = restaurant.customerQueue[0]
    currentCustomer.sit()
    let dish = currentCustomer.order(restaurant)
    waiter.completeOneTask([dish], currentCustomer)
    waiter.giveCook([dish])
    cook.cooking([dish])
    cook.completeOneTask([dish])
    waiter.completeOneTask()
    currentCustomer.eat()
    currentCustomer.leave(restaurant, function () {
      main()
    })
  }

  main()
})


