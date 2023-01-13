import Web3 from "web3";
import { LedgerDIDDoc } from ".";
//get smart contract json in compile truffle
import DLTJSON from "./build/contracts/DLT.json";
const contract = require("truffle-contract");
type DltDeployedTypes = {
  createDID: (didDoc: LedgerDIDDoc) => Promise<any>;
  updateDID: (didDoc: LedgerDIDDoc) => Promise<any>;
  deleteDID: (dids: string[]) => Promise<any>;
  getStorage: () => Promise<any>;
  foundDID: (did: string) => Promise<LedgerDIDDoc>;
  address: string;
};
export async function dltDeoployed(): Promise<DltDeployedTypes> {
  //provider
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  //get smart contract for deploy
  const dlt = contract(DLTJSON);
  dlt.setProvider(provider);
  //get accounts
  const web3 = new Web3("http://127.0.0.1:7545");
  const accounts = await web3.eth.getAccounts();
  //get default account for transactions
  dlt.defaults({ from: accounts[0] });
  //deployinga
  const dltDeployed: DltDeployedTypes = await dlt.deployed();
  return dltDeployed;
}
