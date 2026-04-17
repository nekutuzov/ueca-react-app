import * as UECA from "ueca-react";
import { Row, Block, UIBaseModel, UIBaseParams, UIBaseStruct, useUIBase, IconButtonModel, useIconButton } from "@components";
import { LogoutIcon, UserContext } from "@core";

type AppTopBarStruct = UIBaseStruct<{
    props: {
        _appInfo: { appName: string, appVersion: string };
        _userContext: UserContext;
    };

    children: {
        logoutButton: IconButtonModel;
    };

    methods: {
        handleLogout: () => Promise<void>;
    };
}>;

type AppBarParams = UIBaseParams<AppTopBarStruct>;
type AppTopBarModel = UIBaseModel<AppTopBarStruct>;

function useAppTopBar(params?: AppBarParams): AppTopBarModel {
    const struct: AppTopBarStruct = {
        props: {
            id: useAppTopBar.name,
        },

        children: {
            logoutButton: useIconButton({
                iconView: <LogoutIcon />,
                title: "Sign out",
                size: "small",
                onClick: async () => await model.handleLogout()
            })
        },

        methods: {
            handleLogout: async () => {
                await model.bus.unicast("App.Security.Unauthorize", undefined);
            }
        },

        init: async () => {
            model._appInfo = await model.bus.unicast("App.GetInfo", undefined);
            const isAuthorized = await model.bus.unicast("App.Security.IsAuthorized", undefined);
            if (isAuthorized) {
                const securityInfo = await model.bus.unicast("App.Security.GetSecurityInfo", undefined);
                model._userContext = { user: securityInfo.user };
            }
        },

        View: () =>
            <Row id={model.htmlId()}
                verticalAlign="center"
                horizontalAlign="spaceBetween"
                padding={"small"}
                backgroundColor={"primary.main"}
                sx={{
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    minHeight: "56px"
                }}
            >
                <Row verticalAlign="center" spacing="small">
                    <img 
                        src="logo.png" 
                        alt="Logo" 
                        style={{ height: "32px", width: "32px" }} 
                    />
                    <Block sx={{ 
                        fontSize: "1.25rem", 
                        fontWeight: 500,
                        color: "white"
                    }}>
                        {model._appInfo?.appName}
                    </Block>
                    <Block sx={{ 
                        fontSize: "0.875rem", 
                        opacity: 0.8,
                        color: "white"
                    }}>
                        v{model._appInfo?.appVersion}
                    </Block>
                </Row>

                {model._userContext?.user && (
                    <Row verticalAlign="center" spacing="medium">
                        <Block sx={{ 
                            fontSize: "0.875rem",
                            color: "white",
                            opacity: 0.9
                        }}>
                            {model._userContext.user}
                        </Block>
                        <model.logoutButton.View />
                    </Row>
                )}
            </Row>
    }

    const model = useUIBase(struct, params);
    return model;
}

const AppTopBar = UECA.getFC(useAppTopBar);

export { AppBarParams, AppTopBarModel, useAppTopBar, AppTopBar }
