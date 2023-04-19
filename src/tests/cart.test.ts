const items = require('./mocks/get-cart-items-200.json');
const {
  calcTotalPrice,
  calculateTotalCount,
  getCartFromLS,
} = require('../utils/cart');

const mockedItems = items['items'];

describe('Cart utils', () => {
  it('should calculate total price with calcTotalPrice function', () => {
    const result = calcTotalPrice(mockedItems);

    expect(result).toBe(29994);
  });

  it('should calculate total price with calcTotalPrice function and return zero', () => {
    const result = calcTotalPrice([]);

    expect(result).toBe(0);
  });

  it('should calculate total count with calculateTotalCount function', () => {
    const result = calculateTotalCount(mockedItems);

    expect(result).toBe(6);
  });

  it('should calculate total count with calculateTotalCount function and return zero', () => {
    const result = calculateTotalCount([]);

    expect(result).toBe(0);
  });

  it('should calculate total count with getCartFromLS function', () => {
    const { items, cartTotalPrice } = getCartFromLS();

    expect(items).toStrictEqual([]);
    expect(cartTotalPrice).toBe(0);
  });
});
