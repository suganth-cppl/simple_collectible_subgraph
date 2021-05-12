import { BigInt } from "@graphprotocol/graph-ts"
import {
  SimpleCollectible,
  Approval,
  ApprovalForAll,
  Transfer
} from "../generated/SimpleCollectible/SimpleCollectible"
import { TransferEntity, TransferHistoryEntity, ApprovalEntity, ApprovalHistoryEntity, ApprovalAllEntity, ApprovalAllHistoryEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  
  let entity = ApprovalEntity.load(event.transaction.from.toHex());

  if(entity == null){
    entity = new ApprovalEntity(event.transaction.from.toHex());
    entity.count = BigInt.fromI32(1)
  }else{
    entity.count = entity.count.plus(BigInt.fromI32(1));
  }
   entity.save();
    
  let id = event.transaction.from.toHex()
      .concat('-')
      .concat(entity.count.toString())

   let addHistory = new ApprovalHistoryEntity(id);
  addHistory.owner = event.params.owner;
  addHistory.approved = event.params.approved;
  addHistory.tokenId = event.params.tokenId;
  addHistory.approval = event.transaction.from.toHex();
   addHistory.save();


}

export function handleApprovalForAll(event: ApprovalForAll): void {

  
  let entity = ApprovalAllEntity.load(event.transaction.from.toHex());

  if(entity == null){
    entity = new ApprovalAllEntity(event.transaction.from.toHex());
    entity.count = BigInt.fromI32(1)
  }else{
    entity.count = entity.count.plus(BigInt.fromI32(1));
  }
   entity.save();
    
  let id = event.transaction.from.toHex()
      .concat('-')
      .concat(entity.count.toString())

   let addHistory = new ApprovalAllHistoryEntity(id);
  addHistory.owner = event.params.owner;
  addHistory.operator = event.params.operator;
  addHistory.approved = event.params.approved;
  addHistory.approvalAll = event.transaction.from.toHex();
   addHistory.save();


}

export function handleTransfer(event: Transfer): void {
 
  let entity = TransferEntity.load(event.transaction.from.toHex());

  if(entity == null){
    entity = new TransferEntity(event.transaction.from.toHex());
    entity.count = BigInt.fromI32(1)
  }else{
    entity.count = entity.count.plus(BigInt.fromI32(1));
  }
   entity.save();
    
  let id = event.transaction.from.toHex()
      .concat('-')
      .concat(entity.count.toString())

   let addHistory = new TransferHistoryEntity(id);
  addHistory.from = event.params.from;
  addHistory.to = event.params.to;
  addHistory.tokenId = event.params.tokenId;
  addHistory.transfer = event.transaction.from.toHex();
   addHistory.save();

}
