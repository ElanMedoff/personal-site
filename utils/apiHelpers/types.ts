type SuccessResponse<T> = {
  type: "success";
  payload: T;
};
interface ErrorResponse {
  type: "error";
  errorMessage: string;
}
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

type SucessReturn<T> = SuccessResponse<T>;
interface ErrorReturn {
  type: "error";
  status: number;
  json: ErrorResponse;
}
export type ApiHelperResponse<T> = SucessReturn<T> | ErrorReturn;
