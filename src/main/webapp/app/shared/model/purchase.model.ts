export interface IPurchase {
  id?: number;
  name?: string;
  address?: string;
  age?: number;
}

export class Purchase implements IPurchase {
  constructor(public id?: number, public name?: string, public address?: string, public age?: number) {}
}
