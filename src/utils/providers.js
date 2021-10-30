import { ethers } from 'ethers'

const fs = require('fs');
const endpointid = fs.readFileSync(".endpoint").toString().trim();

//const RPC_URL = "http://localhost:7545"
const RPC_URL = `https://eth-ropsten.gateway.pokt.network/v1/lb/${endpointid}`

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
