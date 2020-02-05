import { Moment } from 'moment';
import { IJobAngular } from 'app/shared/model/job-angular.model';

export interface IEmployeeAngular {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  salary?: number;
  commissionPct?: number;
  jobs?: IJobAngular[];
  managerId?: number;
  departmentId?: number;
}

export class EmployeeAngular implements IEmployeeAngular {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public salary?: number,
    public commissionPct?: number,
    public jobs?: IJobAngular[],
    public managerId?: number,
    public departmentId?: number
  ) {}
}
