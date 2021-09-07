import { ethers } from 'ethers'

// TODO change
//const RPC_URL = "http://localhost:7545"
const RPC_URL = "https://ropsten.infura.io/v3/40580902c916411f96434d82d30b46f3"

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
