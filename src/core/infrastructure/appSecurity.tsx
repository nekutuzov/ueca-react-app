import * as UECA from "ueca-react";
import { UIBaseModel, UIBaseParams, UIBaseStruct, useUIBase } from "@components";
import { UserContext } from "@core";

type AppSecurityStruct = UIBaseStruct<{
    props: {
        _userContext: UserContext;
    },

    methods: {
        isAuthorized: () => boolean;
        authorize: (user: string, password: string, keepMeSignedIn: boolean) => Promise<void>;
        unauthorize: () => Promise<void>;
        getUserContext: () => UserContext;
    }
}>;

type AppSecurityParams = UIBaseParams<AppSecurityStruct>;
type AppSecurityModel = UIBaseModel<AppSecurityStruct>;

function useAppSecurity(params?: AppSecurityParams): AppSecurityModel {
    const struct: AppSecurityStruct = {
        props: {
            id: useAppSecurity.name,
            _userContext: undefined
        },

        methods: {
            isAuthorized: () => !!model._userContext?.apiToken,

            authorize: async (user, password, keepMeSignedIn) => {
                // Calling the API to authorize and get the user context (including apiToken)
                model._userContext = await model.bus.unicast("Api.Authorize", { user, password });
                
                if (keepMeSignedIn) {
                    await model.bus.unicast("App.LocalStorage.Write", { key: "user-context", value: JSON.stringify(model._userContext) });
                } else {
                    await model.bus.unicast("App.LocalStorage.Clear", "user-context");
                }
            },

            unauthorize: async () => {
                model._userContext = undefined;
                await model.bus.unicast("App.LocalStorage.Clear", "user-context");
            },

            getUserContext: () => ({ ...model._userContext })
        },

        messages: {
            "App.Security.IsAuthorized": async () => model.isAuthorized(),

            "App.Security.Authorize": async (p) => await model.authorize(p.user, p.password, p.keepMeSignedIn),

            "App.Security.Unauthorize": async () => await model.unauthorize(),

            "App.Security.GetSecurityInfo": async () => ({
                user: model._userContext?.user ?? "",
                securityRules: [] // Add security rules/permissions here if needed
            }),
        },

        init: async () => {
            const userContextStr = await model.bus.unicast("App.LocalStorage.Read", "user-context");
            if (userContextStr) {
                try {
                    model._userContext = JSON.parse(userContextStr);
                } catch {
                    model._userContext = undefined;
                }
            }
        }
    }

    const model = useUIBase(struct, params);
    return model;
}

const AppSecurity = UECA.getFC(useAppSecurity);

export { AppSecurityParams, AppSecurityModel, useAppSecurity, AppSecurity }
