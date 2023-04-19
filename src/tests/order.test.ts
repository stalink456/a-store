const { getDeliveryPrice } = require('utils/order');

describe('should test getDeliveryPrice function', () => {
  it('should get a number with string', () => {
    const result = getDeliveryPrice('Hello 400');

    expect(result).toEqual(null);
  });

  it('should get a number with correct data', () => {
    const result = getDeliveryPrice('Доставка по России — 350₽');

    expect(result).toEqual(350);
  });

  it('should get a null with empty string', () => {
    const result = getDeliveryPrice('');

    expect(result).toEqual(null);
  });
});
