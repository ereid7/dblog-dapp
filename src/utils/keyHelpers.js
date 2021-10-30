export const readDBlogFactoryAddress = () => {
  const fs = require('fs');
  const address = fs.readFileSync(".factorycontract").toString().trim();

  return address;
}