import * as UECA from "ueca-react";
import { AbortExecutionException, Application, appMessageBus, runApplication } from "@core";

// Enable detailed UECA trace logging as needed
// UECA-React API Documentation https://nekutuzov.github.io/ueca-react-doc/docs/tracing
UECA.globalSettings.traceLog = false;

// Initialize API mocks for testing and development
 import { initMocks } from "@api";
 initMocks();
 //

// Application starting point
runApplication(
    () => <Application id={"app"} applicationName={"UECA-React Application"} appVersion={"1.0.0"} />,
    "root",
    (e) => {
        if (e && !(e instanceof AbortExecutionException)) {
            appMessageBus.unicast("App.UnhandledException", e);
        }
    }
);
