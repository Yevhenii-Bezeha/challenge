import { HttpStatusCode } from './http-status-code.enum';

export interface GenericResponseModel<T> {
  status: HttpStatusCode;
  data: T;
}
