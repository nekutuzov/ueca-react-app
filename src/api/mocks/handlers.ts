import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser"
import { apiBaseUrl, AuthorizeParams } from "@api";

const handlers = [
    // Add your mock API handlers here
    http.post(`${apiBaseUrl}/authorize`, async (info) => {
        const params = await info.request.json() as AuthorizeParams;
        if (params.user === "admin" && params.password === "admin") {
            return HttpResponse.json({ apiToken: "MOCK_API_TOKEN" });
        } else {
            return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
    }),
];

export function initMocks() {
    // Initialize MSW worker by delaying the setup to avoid issues in the main thread during app startup
    setTimeout(async () => {
        const worker = setupWorker(...handlers);
        await worker.start({
            serviceWorker: {
                url: "/ueca-react-app/mockServiceWorker.js",
            },
            onUnhandledRequest: "bypass",
        })
    }, 10);
}

