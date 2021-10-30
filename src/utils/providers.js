import { ethers } from 'ethers'

//const RPC_URL = "http://localhost:7545"
const RPC_URL = "https://eth-ropsten.gateway.pokt.network/v1/lb/<pocket-portal-id>"

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
