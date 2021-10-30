import { InjectedConnector } from '@web3-react/injected-connector'

const chainId = 3 // update when changing networks

export const injected = new InjectedConnector({ supportedChainIds: [chainId, 3] })