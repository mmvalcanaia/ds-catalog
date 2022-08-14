import { formatPrice } from 'util/formatters';

test('formatPrice should format number pt-BR when value 10.1 given', () => {
  //ARRANGE
  const value = 10.1;

  //ACT
  const result = formatPrice(value);

  //ASSERT
  expect(result).toEqual('10,10');
});
