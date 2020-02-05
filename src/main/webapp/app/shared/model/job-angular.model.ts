import { ITaskAngular } from 'app/shared/model/task-angular.model';

export interface IJobAngular {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  tasks?: ITaskAngular[];
  employeeId?: number;
}

export class JobAngular implements IJobAngular {
  constructor(
    public id?: number,
    public jobTitle?: string,
    public minSalary?: number,
    public maxSalary?: number,
    public tasks?: ITaskAngular[],
    public employeeId?: number
  ) {}
}
