export interface Login {
  statusCode: number;
  message: string;
  errorMessage: any;
  data: Data;
}

export interface Data {
  token: string;
}
