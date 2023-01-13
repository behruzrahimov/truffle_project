import { DLT, LedgerDIDDoc } from "./index";
import { dltDeoployed } from "./dltDeployed";
const dlt = new DLT();

async function dltFunctionTest() {
  const ledgerDIDDoc: LedgerDIDDoc = {
    Id: "12345",
    PublicKeys: ["hello"],
    Authentication: ["world shohimardon"],
    Hash: "hashcode",
  };
  const createDID = await dlt.createDID(ledgerDIDDoc);
  console.log("create", await (await dltDeoployed()).getStorage());
  const ledgerDIDDoc1: LedgerDIDDoc = {
    Id: "12345",
    PublicKeys: ["helloooo"],
    Authentication: ["world"],
    Hash: "dkfghduhierugueirhgiuh",
  };
  const updateDID = await dlt.updateDID(ledgerDIDDoc1);
  console.log("Updated", await (await dltDeoployed()).getStorage());

  const foundDID = await dlt.findDID("12345");
  console.log("FoundDID", JSON.stringify(foundDID));

  const deleteDID = await dlt.deleteDID(["12345"]);
  console.log("Deleted", await (await dltDeoployed()).getStorage());
}

dltFunctionTest();
