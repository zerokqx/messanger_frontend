import "@mantine/notifications/styles.css";
import { StrictMode } from "react";
import "@styles/style.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@mantine/core/styles.css";
import { routeTree } from "./routeTree.gen";
import { MantineProvider } from "@mantine/core";
import theme from "./styles/mantine.style";
import { Notifications } from "@mantine/notifications";
export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <RouterProvider router={router} />
        <Notifications />
      </MantineProvider>
    </StrictMode>,
  );
}
