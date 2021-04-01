export interface IClothing {
  id?: number;
  imgContentType?: string;
  img?: any;
  barnd?: string;
  type?: string;
  price?: number;
}

export class Clothing implements IClothing {
  constructor(
    public id?: number,
    public imgContentType?: string,
    public img?: any,
    public barnd?: string,
    public type?: string,
    public price?: number
  ) {}
}
