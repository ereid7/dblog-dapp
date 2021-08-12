import { useContext } from 'react'
import { UserTransactionContext } from '../contexts/UserTransactionContext'

const useUserTransactionContext = () => {
  const userTransactionContext = useContext(UserTransactionContext)

  if (userTransactionContext === undefined) {
    throw new Error('User transaction context undefined')
  }

  return userTransactionContext
}

export default useUserTransactionContext
