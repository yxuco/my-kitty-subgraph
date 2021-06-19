import { BigInt } from "@graphprotocol/graph-ts";
import { Kitty, Pregnant } from "../generated/MyKittyContract/Kitty";
import { PregnantKitty } from "../generated/schema";

export function handlePregnant(event: Pregnant): void {
  // Entities can be loaded from the store using a string ID;
  // this ID is the pregnant matronId
  let entity = PregnantKitty.load(event.params.matronId.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new PregnantKitty(event.params.matronId.toHex());
  }

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner;
  entity.matronId = event.params.matronId;
  entity.sireId = event.params.sireId;
  entity.cooldownEndBlock = event.params.cooldownEndBlock;

  // Entities can be written to the store with `.save()`
  entity.save();
}
