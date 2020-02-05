import { Moment } from 'moment';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IJobHistoryAngular {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  language?: Language;
  jobId?: number;
  departmentId?: number;
  employeeId?: number;
}

export class JobHistoryAngular implements IJobHistoryAngular {
  constructor(
    public id?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public language?: Language,
    public jobId?: number,
    public departmentId?: number,
    public employeeId?: number
  ) {}
}
