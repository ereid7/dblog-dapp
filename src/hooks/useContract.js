import useActiveWeb3React from '../hooks/useActiveWeb3React'
import { 
  getContract, 
  getDBlogContract, 
  getDBlogPostContract, 
  getDBlogFactoryContract,
  getProviderOrSigner 
} from '../utils/contractHelpers.js'
import { useMemo } from 'react'

export const useDBlogContract = (address) => {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => getDBlogContract(address, getProviderOrSigner(library, account)), [address, library, account])
}

export const useDBlogPostContract = (address) => {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => getDBlogPostContract(address, getProviderOrSigner(library, account)), [address, library, account])
}

export const useDBlogFactoryContract = (address) => {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => getDBlogFactoryContract(address, getProviderOrSigner(library, account)), [address, library, account])
}

// returns null on errors
export const useContract = (address, ABI, withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}