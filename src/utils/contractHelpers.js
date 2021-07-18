import { ethers } from 'ethers'
import { simpleRpcProvider } from './providers'

import DBlogContract from '../abis/DBlogContract.json'
import DBlogPostContract from '../abis/DBlogPostContract.json'

// CONTRACT GETTERS
export const getDBlogContract = (address, signer) => {
  return getContract(DBlogContract.abi, address, signer)
}

export const getDBlogPostContract = (address, signer) => {
  return getContract(DBlogPostContract.abi, address, signer)
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
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const isAddressInstanceOfContract = async (address, contract) => {
  const code = await simpleRpcProvider.getCode(address)
  return contract.deployedBytecode === code
}