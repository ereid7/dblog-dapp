import { ethers } from 'ethers'
import { simpleRpcProvider } from './providers'

import DBlogContract from '../abis/DBlogContract.json'
import DBlogPostContract from '../abis/DBlogPostContract.json'
import DBlogFactoryContract from '../abis/DBlogFactoryContract.json'

// CONTRACT GETTERS
export const getDBlogContract = (address, signer) => {
  return getContract(DBlogContract.abi, address, signer)
}

export const getDBlogPostContract = (address, signer) => {
  return getContract(DBlogPostContract.abi, address, signer)
}

export const getDBlogFactoryContract = (address, signer) => {
  return getContract(DBlogFactoryContract.abi, address, signer)
}


// HELPERS

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

export const getContract = (abi, address, signer) => {
  //console.log(signer._address)P
  const signerOrProvider = signer ? signer : simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

// TODO fix this
export const isAddressInstanceOfContract = async (address, contract) => {
  const code = await simpleRpcProvider.getCode(address)
  return true//contract.deployedBytecode === code
}