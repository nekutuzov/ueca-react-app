interface IApiService {
  authorize(params: AuthorizeParams): Promise<AuthorizeResult>;
}

type AuthorizeParams = { user: string, password: string };

type AuthorizeResult = { apiToken: string };

export { IApiService, AuthorizeParams, AuthorizeResult };