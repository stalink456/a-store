const { capitalizeFirstLetter } = require('utils/common');

describe('should test capitalizeFirstLetter function', () => {
  test('should get a word with a capital letter', () => {
    const result = capitalizeFirstLetter('word');

    expect(result).toEqual('Word');
  });
});
