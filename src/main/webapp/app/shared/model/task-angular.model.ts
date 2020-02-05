import { IJobAngular } from 'app/shared/model/job-angular.model';

export interface ITaskAngular {
  id?: number;
  title?: string;
  description?: string;
  jobs?: IJobAngular[];
}

export class TaskAngular implements ITaskAngular {
  constructor(public id?: number, public title?: string, public description?: string, public jobs?: IJobAngular[]) {}
}
