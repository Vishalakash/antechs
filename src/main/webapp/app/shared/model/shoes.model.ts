export interface IShoes {
    id?: number;
    imgContentType?: string;
    img?: any;
    type?: string;
    price?: number;
  }
  
  export class Shoes implements IShoes {
    constructor(
      public id?: number,
      public imgContentType?: string,
      public img?: any,
      public type?: string,
      public price?: number
    ) {}
  }
  