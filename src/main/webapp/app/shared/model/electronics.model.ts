export interface IElectronics {
  id?: number;
  imgContentType?: string;
  img?: any;
  modelname?: string;
  type?: string;
  price?: number;
}

export class Electronics implements IElectronics {
  constructor(
    public id?: number,
    public imgContentType?: string,
    public img?: any,
    public modelname?: string,
    public type?: string,
    public price?: number
  ) {}
}
