export interface ICountryAngular {
  id?: number;
  countryName?: string;
  regionId?: number;
}

export class CountryAngular implements ICountryAngular {
  constructor(public id?: number, public countryName?: string, public regionId?: number) {}
}
