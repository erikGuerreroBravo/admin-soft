export interface ResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
}
