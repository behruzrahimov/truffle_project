// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
contract DLT{
    struct LedgerDIDDoc {
      string Id;
      string[] PublicKeys;
      string[] Authentication;
      string Hash;
    }
    LedgerDIDDoc[] Storage; 
    LedgerDIDDoc ledgerDIDDoc;
    function createDID(LedgerDIDDoc memory _ledgerDIDDoc) public returns(string memory){
      uint counter = 0;
      for (uint i=0;i<Storage.length;i++){
        if (keccak256(abi.encodePacked(Storage[i].Id)) == keccak256(abi.encodePacked(_ledgerDIDDoc.Id))){
          counter++;
        }
      }
      bool registered = false;
      if(counter>0){
        registered = true;
      }else{
        registered = false;
      }
      if(registered == false){
        Storage.push(_ledgerDIDDoc);
        return "DID created!";
      }else{
        return "DID already created!";
      }
    }

    function updateDID(LedgerDIDDoc memory _ledgerDIDDoc)public returns(string memory){
      uint counter = 0;
        for (uint i=0;i<Storage.length;i++){
          if (keccak256(abi.encodePacked(Storage[i].Id)) == keccak256(abi.encodePacked(_ledgerDIDDoc.Id))){
            Storage[i].Id =_ledgerDIDDoc.Id;
            Storage[i].PublicKeys =_ledgerDIDDoc.PublicKeys;
            Storage[i].Authentication =_ledgerDIDDoc.Authentication;
            Storage[i].Hash =_ledgerDIDDoc.Hash;
            counter++;
          }
        }
      bool registered = false;
      if(counter>0){
        registered = true;
      }else{
        registered = false;
      }
      if(registered != false){
        return "DID updated!";
      }else{
        return "DID not found!";
      }
    } 


    function deleteDID(string[] memory dids)public returns(string memory){
        uint counter = 0;
        for (uint i = 0; i < dids.length; i++ ){
          for (uint j = 0; j < Storage.length; j++ ){
            if (keccak256(abi.encodePacked(Storage[j].Id)) == keccak256(abi.encodePacked(dids[i]))){
               Storage[j] = Storage[Storage.length - 1];
               Storage.pop();
               counter++;
            }
          }
        }
      bool registered = false;
      if(counter>0){
        registered = true;
      }else{
        registered = false;
      }
      if(registered != false){
        return "DID Deleted!";
      }else{
        return "DID not found!";
      }
    }

    function foundDID(string memory did)public view returns(LedgerDIDDoc memory _ledgerDIDDoc){
      for (uint i = 0; i < Storage.length; i++ ){
        if (keccak256(abi.encodePacked(Storage[i].Id)) == keccak256(abi.encodePacked(did))){
          return Storage[i];
        }
      }
    }
    
    function getStorage () public view returns(LedgerDIDDoc[] memory){
      return Storage;
    }
}