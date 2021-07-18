import { InjectedConnector } from '@web3-react/injected-connector'

const chainId = 1337

export const injected = new InjectedConnector({ supportedChainIds: [chainId] })