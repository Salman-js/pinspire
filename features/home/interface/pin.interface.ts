export interface IPin {
  id?: string;
  url: string;
}

export interface IMG extends IPin {
  width: number;
  height: number;
}
