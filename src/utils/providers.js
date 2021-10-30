import { ethers } from 'ethers'
import config from '../config.json'

const RPC_URL = config.ROPSTEN_RPC_URL
export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
