export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: string;
  name: string;
  phone: string;
  role: string;
  password: string;
  url: string;
};

export type SafeUser = Omit<User, 'password'>;

export type LoginResponse = ApiResponse<SafeUser | null>;

export type LoginRequest = {
  phone: string;
  password: string;
};

// ----------------------------

export type SalaryInfo = {
  EmployeeId: string;
  EmployeeName: string;
  Position: string;
  UrlSalary: string;
};

export type SalaryInfoRequest = {
  phone: string;
};

export type SalaryInfoResponse = ApiResponse<SalaryInfo | null>;

// ----------------------------

export type RestInfo = {
  EmployeeId: string;
  EmployeeName: string;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
  restUse: string;
  restNotUse: string;
};

export type RestInfoRequest = {
  name: string;
};

export type RestInfoResponse = ApiResponse<RestInfo | null>;

// ----------------------------

export type SendRequestRequest = {
  employeeId?: string;
  name?: string;
  TypeRequest: string;
  Request: string;
  Image: string;
  ReplyRequest?: string;
  Timestamp?: string;
};

export type ListSendRequestRequest = {
  employeeId: string;
};

export type SendRequestResponse = ApiResponse<[]>;
export type ListSendRequestResponse = ApiResponse<SendRequestRequest[]>;

// ----------------------------

export type SendImage = {
  image: string;
};

export type SendImageRequest = FormData;

export type SendImageResponse = ApiResponse<SendImage | null>;

// ----------------------------

export type Insert = {
  spreadsheetId: string;
  updatedRange: string;
  updatedRows: string;
  updatedColumns: string;
  updatedCells: string;
};

export type InsertRequest = {
  requestId: string;
  value: string;
};

export type InsertResponse = ApiResponse<Insert | null>;
