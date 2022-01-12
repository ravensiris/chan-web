export interface APIError {
  readonly domain: string;
  readonly reason: string;
  readonly message: string;
  readonly locationType?: string;
  readonly location?: string;
}

export interface APIErrorResponse {
  readonly error: {
    readonly errors: APIError[];
    readonly code: number;
    readonly message: string;
  };
}
