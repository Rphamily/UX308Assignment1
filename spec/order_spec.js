import { Order } from '../Order.js';

describe("Tests all stages of an order", function() {
  it("test hello", function() {
    const oOrder = new Order("Ryan");
    const aResults = oOrder.handleInput("hello");
    expect(aResults[0]).toBe("Welcome to Ryan's Food!");
  });

  it("test yes", function() {
    const oOrder = new Order("Ryan");
    oOrder.handleInput("hello");
    const aResults = oOrder.handleInput("yes");
    expect(aResults[0]).toBe("Menu:");
  });

  it("test no", function() {
    const oOrder = new Order("Ryan");
    oOrder.handleInput("hello");
    const aResults = oOrder.handleInput("no");
    expect(aResults[0]).toBe("Thank you. Goodbye!");
    expect(oOrder.isDone()).toBe(true);
  });
});
