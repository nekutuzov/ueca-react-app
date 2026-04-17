import { Route } from "@components";
import { HomeScreen, ArchitectureScreen } from "@screens";


const screenRoutes = {
    "/": () => <HomeScreen id={"homeScreen"} />,
    "/home": () => <HomeScreen id={"homeScreen"} page={"welcome"} />,
    "/architecture": () => <ArchitectureScreen id={"architectureScreen"} />,
};


const otherRoutes = {
    // Add routes without the app layout like document viewers and external links
};

type OtherRoutes = typeof otherRoutes;
type OtherRoute = Route<OtherRoutes>;

type ScreenRoutes = typeof screenRoutes;
type ScreenRoute = Route<ScreenRoutes>;

type AppRoute = ScreenRoute | OtherRoute;

type AppRouteParams<T extends AppRoute["path"]> = Extract<AppRoute, { path: T }>["params"];

export { otherRoutes, screenRoutes, OtherRoute, ScreenRoute, AppRoute, AppRouteParams };
