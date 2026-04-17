import * as UECA from "ueca-react";
import { AuthorizeParams, AuthorizeResult, createRestAPIClient, IRestApiClient } from "@api";
import { BaseModel, BaseStruct } from "@components";

const apiBaseUrl = `${window.location.origin}/ueca-react-app/api`;

type ApiServiceStruct = BaseStruct<{
    props: {
        __apiClient: IRestApiClient;
    };
}>;

type ApiServiceModel = BaseModel<ApiServiceStruct>;

function useApiService(): ApiServiceModel {
    const struct: ApiServiceStruct = {
        props: {
            id: useApiService.name,
        },

        messages: {
            "Api.Authorize": async ({ user, password }) => {

                const result = await model.__apiClient.post<AuthorizeParams, AuthorizeResult>("/authorize", undefined, { user, password });
                return { user: user, apiToken: result.apiToken };
            },
        },

        constr: () => {
            model.__apiClient = createRestAPIClient(apiBaseUrl, _onUnauthorized);
        }
    }

    const model = UECA.useComponent(struct) as ApiServiceModel;
    return model;

    // Private methods
    async function _onUnauthorized() {
        // Handle unauthorized response from API
        // E.g., log out the user and redirect to login page, automatically reauthorize using refresh token, etc.        
        await model.bus.unicast("App.Security.Unauthorize", undefined);
    }
};

const ApiService = UECA.getFC(useApiService);

export { ApiServiceModel, useApiService, ApiService, apiBaseUrl };
