export interface ILifeStyle {
    id?: number;
    imgContentType?: string;
    img?: any;
    type?: string;
    price?: number;
  }
  
  export class LifeStyle implements ILifeStyle {
    constructor(
      public id?: number,
      public imgContentType?: string,
      public img?: any,
      public type?: string,
      public price?: number
    ) {}
  }
  