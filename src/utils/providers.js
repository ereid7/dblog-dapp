import { ethers } from 'ethers'

// TODO change
const RPC_URL = 'HTTP://127.0.0.1:7545'

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
