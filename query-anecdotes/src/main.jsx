import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";

const queryClient = new QueryClient();

import { NotificationContextProvider } from "./NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<NotificationContextProvider>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</NotificationContextProvider>,
);
