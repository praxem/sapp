export interface IRegionAngular {
  id?: number;
  regionName?: string;
}

export class RegionAngular implements IRegionAngular {
  constructor(public id?: number, public regionName?: string) {}
}
