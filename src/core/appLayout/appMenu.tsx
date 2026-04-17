import * as UECA from "ueca-react";
import { Col, UIBaseModel, UIBaseParams, UIBaseStruct, useUIBase, NavItemModel, useNavItem } from "@components";
import { AppRoute, HomeIcon, LayoutIcon, LogoutIcon } from "@core";

type AppMenuStruct = UIBaseStruct<{
    props: {
        iconsOnly: boolean;
        _activeRoute: AppRoute;
    };

    children: {
        homeMenuItem: NavItemModel;
        architectureMenuItem: NavItemModel;
        logoutMenuItem: NavItemModel;
    }
}>;

type AppMenuParams = UIBaseParams<AppMenuStruct>;
type AppMenuModel = UIBaseModel<AppMenuStruct>;

function useAppMenu(params?: AppMenuParams): AppMenuModel {
    const struct: AppMenuStruct = {
        props: {
            id: useAppMenu.name,
            iconsOnly: false,
            _activeRoute: undefined
        },

        children: {
            homeMenuItem: useMenuItem({
                text: "Home",
                route: { path: "/home" },
                icon: <HomeIcon />
            }),

            architectureMenuItem: useMenuItem({
                text: "Architecture",
                route: { path: "/architecture" },
                icon: <LayoutIcon />
            }),

            logoutMenuItem: useLogoutMenuItem()
        },

        messages: {
            "App.Router.AfterRouteChange": async (route) => {
                model._activeRoute = route;
            },
        },

        init: async () => {
            model._activeRoute = await model.getRoute();
        },

        View: () =>
            <Col id={model.htmlId()} fill overflow={"auto"} padding={{ top: "small" }} spacing={"none"}>
                <model.homeMenuItem.View />
                <model.architectureMenuItem.View />
                <Col fill verticalAlign="bottom">
                    <model.logoutMenuItem.View />
                </Col>
            </Col>
    };

    const model = useUIBase(struct, params);
    return model;

    function useMenuItem(params: { text: string; route: AppRoute; icon?: React.ReactNode }): NavItemModel {
        return useNavItem({
            text: params.text,
            route: params.route,
            icon: params.icon,
            active: () => model._activeRoute?.path === params.route.path || params.route.path === "/home" && model._activeRoute?.path === "/",
            mode: () => model.iconsOnly ? "icon-only" : "icon-text"
        });
    }

    function useLogoutMenuItem(): NavItemModel {
        return useNavItem({
            text: "Logout",
            icon: <LogoutIcon />,
            mode: () => model.iconsOnly ? "icon-only" : "icon-text",
            onClick: async () => {
                await model.bus.unicast("App.Security.Unauthorize", undefined);
            }
        });
    }
}

const AppMenu = UECA.getFC(useAppMenu);

export { AppMenuParams, AppMenuModel, useAppMenu, AppMenu };
