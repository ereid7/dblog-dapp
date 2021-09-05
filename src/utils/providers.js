import { ethers } from 'ethers'

// TODO change
const RPC_URL = "http://localhost:7545"

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
