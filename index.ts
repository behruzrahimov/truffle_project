import { dltDeoployed } from "./dltDeployed";

export type LedgerDIDDoc = {
  Id: string;
  PublicKeys: string[];
  Authentication: string[];
  Hash: string;
};
export class DLT {
  async findDID(did: string): Promise<LedgerDIDDoc | undefined> {
    const foundDID = (await dltDeoployed()).foundDID(did);
    if ((await foundDID).Id !== "") {
      return foundDID;
    }
    return undefined;
  }

  async createDID(didDoc: LedgerDIDDoc) {
    const createDID = (await dltDeoployed()).createDID(didDoc);
    return createDID;
  }

  async updateDID(didDoc: LedgerDIDDoc) {
    const updateDID = (await dltDeoployed()).updateDID(didDoc);
    return updateDID;
  }

  async deleteDID(did: string[]) {
    const deleteDID = (await dltDeoployed()).deleteDID(did);
    return deleteDID;
  }

  async createProofOfExecution() {}
}
