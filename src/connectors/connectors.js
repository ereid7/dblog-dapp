import { InjectedConnector } from '@web3-react/injected-connector'

const chainId = 1337 // TODO evan update when changing networks 3

export const injected = new InjectedConnector({ supportedChainIds: [chainId, 3] })