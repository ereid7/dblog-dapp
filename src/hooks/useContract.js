import useActiveWeb3React from '../hooks/useActiveWeb3React'
import { getContract, getDBlogContract, getDBlogPostContract, getDBlogFactoryContract } from '../utils/contractHelpers.js'
import { useMemo } from 'react'

export const useDBlogContract = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getDBlogContract(address, library.getSigner()), [address, library])
}

export const useDBlogPostContract = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getDBlogPostContract(address, library.getSigner()), [address, library])
}

export const useDBlogFactoryContract = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getDBlogFactoryContract(address, library.getSigner()), [address, library])
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