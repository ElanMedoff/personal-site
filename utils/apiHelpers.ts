type SuccessResponse<T> = {
  type: "success";
  payload: T;
};

interface ErrorResponse {
  type: "error";
  errorMessage: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
