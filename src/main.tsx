import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
//     {
//   defaultOptions: {
//     queries: {
//       retry: 3,
//       cacheTime: 300_000,
//       staleTime: 10 * 1000, // how long the data is considered fresh
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//       refetchOnMount: false, // will be fetched when a component mounts for the first time
//     },
//   },
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
