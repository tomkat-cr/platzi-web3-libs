import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3/dist/web3.min";

export const connector = new InjectedConnector(
    { supportedChainIds: [5] }
) // Goerli

export const getLibrary = (provider) => {
    return new Web3(provider);
}
