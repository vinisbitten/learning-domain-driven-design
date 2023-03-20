import Address from "../value-object/address";

export default interface CustomerInterface {
  get id(): string;
  get address(): Address;
  get name(): string;
  get rewardPoints(): number;
}
