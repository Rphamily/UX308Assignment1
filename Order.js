export class Order {
  constructor(sFrom) {
    this.sFrom = sFrom;
    this.done = false;
    this.order = { items: [] };
    this.curr = {}; 
    this.stateCur = this.OrderState.WELCOME;
  }

  OrderState = {
    WELCOME: (sInput) => {
      let aReturn = [];
      aReturn.push("Welcome to Ryan's Food!");
      aReturn.push("Would you like to place an order? (Yes/No)");
      this.stateCur = this.OrderState.MENU;
      return aReturn;
    },
    MENU: (sInput) => {
      let aReturn = [];
      if (sInput.toLowerCase().startsWith("y")) {
        aReturn.push("Menu:");
        aReturn.push("1. Pizza (Sizes: small, medium, large; Toppings: Pepperoni, Mushrooms, Extra Cheese)");
        aReturn.push("2. Burger (Sizes: single, double, triple; Add-ons: Bacon, Cheese, Avocado)");
        aReturn.push("Enter 1 or 2:");
        this.stateCur = this.OrderState.ITEM;
      } else {
        aReturn.push("Thank you. Goodbye!");
        this.done = true;
      }
      return aReturn;
    },
    ITEM: (sInput) => {
      let aReturn = [];
      let num = parseInt(sInput);
      if (num === 1) {
        this.curr = { type: "Pizza" };
        aReturn.push("Selected Pizza. Choose size (small/medium/large):");
      } else if (num === 2) {
        this.curr = { type: "Burger" };
        aReturn.push("Selected Burger. Choose size (single/double/triple):");
      } else {
        aReturn.push("Invalid selection. Enter 1 or 2:");
        return aReturn;
      }
      this.stateCur = this.OrderState.SIZE;
      return aReturn;
    },
    SIZE: (sInput) => {
      let aReturn = [];
      let size = sInput.toLowerCase();
      if (this.curr.type === "Pizza" && ["small", "medium", "large"].includes(size)) {
        this.curr.size = size;
        aReturn.push("Choose topping: Pepperoni, Mushrooms, or Extra Cheese:");
        this.stateCur = this.OrderState.ATTR;
      } else if (this.curr.type === "Burger" && ["single", "double", "triple"].includes(size)) {
        this.curr.size = size;
        aReturn.push("Choose add-on: Bacon, Cheese, or Avocado:");
        this.stateCur = this.OrderState.ATTR;
      } else {
        aReturn.push("Invalid size, please try again:");
      }
      return aReturn;
    },
    ATTR: (sInput) => {
      let aReturn = [];
      let option = sInput.toLowerCase();
      if (this.curr.type === "Pizza" && ["pepperoni", "mushrooms", "extra cheese"].includes(option)) {
        this.curr.attr = option;
      } else if (this.curr.type === "Burger" && ["bacon", "cheese", "avocado"].includes(option)) {
        this.curr.attr = option;
      } else {
        aReturn.push("Invalid option, please try again:");
        return aReturn;
      }
      this.order.items.push(this.curr);
      this.curr = {};
      aReturn.push("Order another item? (Yes/No)");
      this.stateCur = this.OrderState.ASKMORE;
      return aReturn;
    },
    ASKMORE: (sInput) => {
      let aReturn = [];
      if (sInput.toLowerCase().startsWith("y")) {
        aReturn.push("Select item: 1. Pizza or 2. Burger");
        this.stateCur = this.OrderState.ITEM;
      } else {
        aReturn.push("Would you like a drink? (Yes/No)");
        this.stateCur = this.OrderState.DRINKASK;
      }
      return aReturn;
    },
    DRINKASK: (sInput) => {
      let aReturn = [];
      if (sInput.toLowerCase().startsWith("y")) {
        aReturn.push("Choose drink: Coke, Sprite, or Water");
        this.stateCur = this.OrderState.DRINK;
      } else {
        this.stateCur = this.OrderState.CONFIRM;
        return this.OrderState.CONFIRM();
      }
      return aReturn;
    },
    DRINK: (sInput) => {
      let aReturn = [];
      let drink = sInput.toLowerCase();
      if (["coke", "sprite", "water"].includes(drink)) {
        this.order.drink = drink;
        aReturn.push(`Added ${drink}.`);
        this.stateCur = this.OrderState.CONFIRM;
      } else {
        aReturn.push("Invalid drink, try again:");
      }
      return aReturn;
    },
    CONFIRM: (sInput) => {
      let aReturn = ["Thank you for your order! Summary:"];
      this.order.items.forEach((item, i) => {
        if (item.type === "Pizza") aReturn.push(`${i + 1}. Pizza (${item.size}) with ${item.attr}`);
        else aReturn.push(`${i + 1}. Burger (${item.size}) with ${item.attr}`);
      });
      if (this.order.drink) aReturn.push("Drink: " + this.order.drink);
      aReturn.push("Enjoy your meal!");
      this.done = true;
      return aReturn;
    }
  };

  handleInput(sInput) {
    return this.stateCur(sInput);
  }
  
  isDone() {
    return this.done;
  }
}
