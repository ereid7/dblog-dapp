export const isAddressInstanceOfContract = async (address, contract) => {
  const code = await window.web3.eth.getCode(address)
  return contract.deployedBytecode == code
}