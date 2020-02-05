import { IEmployeeAngular } from 'app/shared/model/employee-angular.model';

export interface IDepartmentAngular {
  id?: number;
  departmentName?: string;
  locationId?: number;
  employees?: IEmployeeAngular[];
}

export class DepartmentAngular implements IDepartmentAngular {
  constructor(public id?: number, public departmentName?: string, public locationId?: number, public employees?: IEmployeeAngular[]) {}
}
